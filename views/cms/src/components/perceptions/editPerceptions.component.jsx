import React from "react";
import { Row, Col, Form, Icon, Input, Button } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Upload_Image from "../../utils/upload_Image";
import * as url from "../../utils/url_api";
import Loading from "../../pages/loading/loading";

import {
  actRequestPerceptionsById,
  actRequestUpDatePerceptions,
} from "../../actions/perceptions";
const { TextArea } = Input;

class EditPerceptions extends React.Component {
  state = {
    file: "",
  };

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onPerceptionsById(id);
    }
  }

  _Update_PerceptionsById = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      let { match } = this.props;
      if (!err) {
        let id = match.params.id;
        if (id) {
          this.props.onUpDatePerceptions(id, this.state, this.props.history);
        }
      }
    });
  };

  onChange_Depict = (value) => {
    this.setState({
      [value.target.name]: value.target.value,
    });
  };

  onChange_input = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _onChange_image = (event) => {
    event.persist();

    let target = event.target.files[0];
    const formData = new FormData();
    formData.append("file", target);

    Upload_Image("cms/api/upload-image", formData).then((res) => {
      if (res.data && res.status === 200) {
        this.setState({
          ...this.state,
          file: URL.createObjectURL(target),
          image: res.data,
        });
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { perceptions } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        {perceptions.success ? (
          <Loading />
        ) : (
          <div>
            <div>
              <Row className="main-content">
                <Form onSubmit={this._Update_PerceptionsById} className="">
                  <Row>
                    <Col span={10}>
                      <h4 className="teacher-title-addT">Họ và tên:</h4>
                      <Form.Item>
                        {getFieldDecorator("name", {
                          initialValue:
                            perceptions.perceptionsById &&
                            perceptions.perceptionsById.name,
                          rules: [
                            {
                              required: true,
                              message: "Tên không được để trống",
                            },
                          ],
                        })(
                          <Input
                            name="name"
                            onChange={this.onChange_input}
                            prefix={
                              <Icon
                                type="user"
                                style={{ color: "rgba(0,0,0,.25)" }}
                              />
                            }
                            placeholder="Username"
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={10} offset={2}>
                      <h4 className="teacher-title-addT">Cảm nhận</h4>
                      <Form.Item>
                        {getFieldDecorator("perceptions", {
                          initialValue:
                            perceptions.perceptionsById &&
                            perceptions.perceptionsById.description,
                          rules: [
                            {
                              required: true,
                              message: "Cảm nhận không được để trống",
                            },
                          ],
                        })(
                          <TextArea
                            name="description"
                            placeholder="Nhập mô tả ..."
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            onChange={this.onChange_Depict}
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}></Col>
                    <Col span={10} offset={2}>
                      <Form.Item>
                        <h4 className="teacher-title-addT">Ảnh:</h4>
                        {getFieldDecorator("avatar", {
                          initialValue:
                            perceptions.perceptionsById &&
                            perceptions.perceptionsById.image,
                        })(
                          <label className="staff-custom-file-upload">
                            <input
                              type="file"
                              accept=".png, .jpg, .jpeg"
                              onChange={this._onChange_image}
                            />
                            Chọn ảnh đại diện
                          </label>
                        )}
                        <div className="img-perceptions">
                          <img
                            src={
                              this.state.file
                                ? this.state.file
                                : `${url.api_url}/${
                                    perceptions.perceptionsById.image &&
                                    perceptions.perceptionsById.image
                                  }`
                            }
                            alt={`${
                              this.state.file
                                ? this.state.file
                                : perceptions.perceptionsById.image &&
                                  perceptions.perceptionsById.image
                            }`}
                          />
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item className="btn-component">
                    <Button htmlType="submit" className="btn-create-new">
                      Lưu lại
                    </Button>
                    <Button onClick={this.onClose} className="btn-close">
                      Hoàn tác
                    </Button>
                  </Form.Item>
                </Form>
              </Row>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    inforAdmin: state.inforAdmin,
    perceptions: state.perceptions,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onPerceptionsById: (id) => {
      dispatch(actRequestPerceptionsById(id));
    },
    onUpDatePerceptions: (id, data, history) => {
      dispatch(actRequestUpDatePerceptions(id, data, history));
    },
  };
};

const Edit_Perceptions = Form.create()(withRouter(EditPerceptions));
export default connect(mapStateToProps, mapDispatchToProps)(Edit_Perceptions);
