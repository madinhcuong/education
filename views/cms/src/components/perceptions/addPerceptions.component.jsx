import React from "react";
import { Row, Col, Form, Icon, Input, Button } from "antd";
import { connect } from "react-redux";
import { Array_ItemEditRole } from "../../helpers/validate";
import Upload_Image from "../../utils/upload_Image";
import { actRequestCreatePerceptions } from "../../actions/perceptions";
const { TextArea } = Input;

class AddPerceptions extends React.Component {
  state = {
    name: "",
  };

  _Create_Perceptions = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      if (!err) {
        let data = {
          name: this.state.name,
          image: this.state.image,
          description: this.state.description,
        };
        this.props.onCreatePerceptions(data, this.props.history);
      }
    });
  };

  _onChange_image = (event) => {
    event.persist();

    let target = event.target.files[0];
    const formData = new FormData();
    formData.append("file", target);

    Upload_Image("cms/api/upload-image", formData).then((res) => {
      if (res.data && res.status === 200) {
        this.setState({
          file: URL.createObjectURL(target),
          image: res.data,
        });
      }
    });
  };

  onChange_input = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChange_Depict = ({ target: { value } }) => {
    this.setState({ description: value });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <div>
          <Row className="main-content">
            <Form onSubmit={this._Create_Perceptions} className="">
              <Row>
                <Col span={10}>
                  <h4 className="teacher-title-addT">Họ và tên:</h4>
                  <Form.Item>
                    {getFieldDecorator("name", {
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
                  <h4 className="teacher-title-addT">Cảm nhận:</h4>
                  {getFieldDecorator("perceptions", {
                    rules: [
                      {
                        required: true,
                        message: "Cảm nhận không được để trống",
                      },
                    ],
                  })(
                    <TextArea
                      placeholder="Nhập mô tả ..."
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      onChange={this.onChange_Depict}
                    />
                  )}
                </Col>
              </Row>
              <Row>
                <Col span={10}></Col>
                <Col span={10} offset={2}>
                  <Form.Item>
                    {getFieldDecorator(
                      "image",
                      Array_ItemEditRole("Ảnh không được để trống")
                    )(
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
                        src={this.state.file ? this.state.file : null}
                        alt={this.state.file ? this.state.file : null}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onCreatePerceptions: (data, history) => {
      dispatch(actRequestCreatePerceptions(data, history));
    },
  };
};

const Add_Perceptions = Form.create({ name: "" })(AddPerceptions);
export default connect(mapStateToProps, mapDispatchToProps)(Add_Perceptions);
