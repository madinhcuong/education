import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Icon, Input, Button, Select, Collapse } from "antd";
import { Array_ItemEditRole } from "../../helpers/validate";
import Upload_Image from "../../utils/upload_Image";
import CKEditor from "ckeditor4-react";
import * as url from "../../utils/url_api";
import Loading from "../../pages/loading/loading";
import { withRouter } from "react-router-dom";
import { actRequestListTraiNingByTeacher } from "../../actions/training.action";
import {
  actRequestInforTrainingById,
  actRequestUpDateInforTraining,
} from "../../actions/inforTraining";
const { Option } = Select;
const { Panel } = Collapse;

class EditInforTraining extends React.Component {
  state = {
    isMapArray_CK: false,
    id_training: "",
    name_inforTraining: "",
    file: "",
    image: "",
    introduction: "",
    proviso: "",
    target: "",
    product: "",
    certification: "",
    schedule: "",
  };

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onGetInforTrainingById(id);
      this.props.onListTrainingByTeacher();
    }
  }

  _onChange_image = (event) => {
    event.persist();

    let target = event.target.files[0];
    const formData = new FormData();
    formData.append("file", target);

    //-- resize image main news
    formData.append("width", 268);
    formData.append("height", 178);

    Upload_Image("cms/api/upload-image", formData).then((res) => {
      if (res.data && res.status === 200) {
        this.setState({
          file: URL.createObjectURL(target),
          image: res.data,
        });
      }
    });
  };

  onChange_introduction = (evt) => {
    // giới thiệu
    this.setState({
      introduction: evt.editor.getData(),
    });
  };

  onChange_proviso = (evt) => {
    // điều kiện
    this.setState({
      proviso: evt.editor.getData(),
    });
  };

  onChange_target = (evt) => {
    // điều kiện
    this.setState({
      target: evt.editor.getData(),
    });
  };

  onChanget_product = (evt) => {
    this.setState({
      product: evt.editor.getData(),
    });
  };

  onChange_certification = (evt) => {
    // chứng nhận
    this.setState({
      certification: evt.editor.getData(),
    });
  };

  onChange_schedule = (evt) => {
    this.setState({
      schedule: evt.editor.getData(),
    });
  };

  _Edit_InforTraining_handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      let { match } = this.props;
      if (match) {
        let id = match.params.id;
        if (!err) {
          let data = {
            id_training: body.training,
            image: this.state.image ? this.state.image : body.image,
            name: body.name,
            introduction: this.state.introduction
              ? this.state.introduction
              : body.introduction,
            proviso: this.state.proviso ? this.state.proviso : body.proviso,
            target: this.state.target ? this.state.target : body.target,
            product: this.state.product ? this.state.product : body.product,
            certification: this.state.certification
              ? this.state.certification
              : body.certification,
            schedule: this.state.schedule,
            // schedule: this.state.schedule ? this.state.schedule : body.schedule
          };

          this.props.onUpdateInforTraining(id, data, this.props.history);
        }
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { training, inforAdmin, inforTraining } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    let content_inforTraining = [
      {
        name: "GIỚI THIỆU",
        name_onChange: "introduction",
        onChange: this.onChange_introduction,
        data:
          inforTraining.infoTraining.introduction &&
          inforTraining.infoTraining.introduction,
      },
      {
        name: "ĐIỀU KIỆN THEO HỌC",
        name_onChange: "proviso",
        onChange: this.onChange_proviso,
        data:
          inforTraining.infoTraining.proviso &&
          inforTraining.infoTraining.proviso,
      },
      {
        name: "MỤC TIÊU KHOÁ HỌC", // mục tiêu
        name_onChange: "target",
        onChange: this.onChange_target,
        data:
          inforTraining.infoTraining.target &&
          inforTraining.infoTraining.target,
      },
      {
        name: "SẢN PHẨM KHOÁ HỌC",
        name_onChange: "product",
        onChange: this.onChanget_product,
        data:
          inforTraining.infoTraining.product &&
          inforTraining.infoTraining.product,
      },

      {
        name: "CHỨNG NHẬN",
        name_onChange: "certification",
        onChange: this.onChange_certification,
        data:
          inforTraining.infoTraining.certification &&
          inforTraining.infoTraining.certification,
      },
      // {
      //   name: "LỊCH KHAI GIẢNG",
      //   name_onChange: "schedule",
      //   onChange: this.onChange_schedule,
      //   data:
      //     inforTraining.infoTraining.schedule &&
      //     inforTraining.infoTraining.schedule
      // }
    ];

    let list_training = null;
    if (training.listTrainingByTeacher.length > 0) {
      list_training = training.listTrainingByTeacher.map((item, key) => {
        return (
          <Option value={`${item._id}`} key={key}>
            {item.name}
          </Option>
        );
      });
    }

    let array_content_inforTraining = content_inforTraining.map((item, key) => {
      if (inforTraining.infoTraining) {
        return getFieldDecorator(item.name_onChange, {
          initialValue: item.data,
        })(
          <Panel header={`${item.name}`} key={`${key}`}>
            {/* <CKEditor
              onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
              data={item.data ? item.data : ""}
              onChange={item.onChange}
            /> */}
            <CKEditor
              config={{
                filebrowserUploadUrl: `${url.api_url}/cms/api/upload-image-editor`,
                extraPlugins: "font,colorbutton",
              }}
              onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
              data={item.data ? item.data : ""}
              onChange={item.onChange}
            />
          </Panel>
        );
      } else {
        return null;
      }
    });

    return (
      <div>
        {training.success && inforTraining.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("UPDATE_INFORTRAINING") ? null : (
              <div>
                <Row className="main-content">
                  <Form
                    onSubmit={this._Edit_InforTraining_handleSubmit}
                    className=""
                  >
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Hệ đào tạo:</h4>
                        <Form.Item>
                          {getFieldDecorator("training", {
                            initialValue:
                              inforTraining.infoTraining.id_training &&
                              inforTraining.infoTraining.id_training._id,
                            rules: Array_ItemEditRole(
                              "Đào tạo không được để trống"
                            ).rules,
                          })(
                            <Select>
                              {!list_training ? null : list_training}
                            </Select>
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">
                          Tên thông tin khóa học:
                        </h4>
                        <Form.Item>
                          {getFieldDecorator("name", {
                            initialValue:
                              inforTraining.infoTraining.name &&
                              inforTraining.infoTraining.name,
                            rules: Array_ItemEditRole("Tên không được để trống")
                              .rules,
                          })(
                            <Input
                              style={{ width: "100%" }}
                              prefix={
                                <Icon
                                  type="container"
                                  style={{ color: "rgba(0,0,0,.25)" }}
                                />
                              }
                              placeholder="Nhập tên ..."
                            />
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={11} offset={0}>
                        <Form.Item>
                          <h4 className="teacher-title-addT">Ảnh:</h4>
                          {getFieldDecorator("image", {
                            initialValue:
                              inforTraining.infoTraining.image &&
                              inforTraining.infoTraining.image,
                          })(
                            <label className="staff-custom-file-upload">
                              <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                onChange={this._onChange_image}
                              />
                              Chọn ảnh bìa
                            </label>
                          )}
                          <div className="inforTraining-img">
                            <img
                              src={
                                this.state.file
                                  ? this.state.file
                                  : `${url.api_url}/${
                                      inforTraining.infoTraining.image &&
                                      inforTraining.infoTraining.image
                                    }`
                              }
                              alt={`${
                                this.state.file
                                  ? this.state.file
                                  : inforTraining.infoTraining.image &&
                                    inforTraining.infoTraining.image
                              }`}
                            />
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <h4 className="teacher-title-addT">Nội dung:</h4>
                        <Collapse defaultActiveKey={["0"]}>
                          {array_content_inforTraining}
                        </Collapse>
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
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforAdmin: state.inforAdmin,
    training: state.training,
    inforTraining: state.inforTraining,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetInforTrainingById: (id) => {
      dispatch(actRequestInforTrainingById(id));
    },
    onListTrainingByTeacher: () => {
      dispatch(actRequestListTraiNingByTeacher());
    },
    onUpdateInforTraining: (id, body, history) => {
      dispatch(actRequestUpDateInforTraining(id, body, history));
    },
  };
};

const Edit_InforTraining = Form.create({ name: "normal_login" })(
  EditInforTraining
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Edit_InforTraining));
