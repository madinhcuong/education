import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Icon, Input, Button, Select, Collapse } from "antd";
import { Array_ItemEditRole } from "../../helpers/validate";
import Upload_Image from "../../utils/upload_Image";
import CKEditor from "ckeditor4-react";
import Loading from "../../pages/loading/loading";
import { actRequestListTraiNingByTeacher } from "../../actions/training.action";
import { actRequestCreateInforTraining } from "../../actions/inforTraining";
import * as url from "../../utils/url_api";
const { Option } = Select;
const { Panel } = Collapse;
class AddInforTraining extends React.Component {
  state = {
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
    this.props.onListTrainingByTeacher();
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

  _Create_InforTraining_handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      if (!err) {
        let data = {
          id_training: body.training,
          image: this.state.image,
          name: body.name,
          introduction: this.state.introduction,
          proviso: this.state.proviso,
          target: this.state.target,
          product: this.state.product,
          certification: this.state.certification,
          schedule: this.state.schedule,
        };
        this.props.onCreateInforTraining(data, this.props.history);
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { training, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    let content_inforTraining = [
      {
        name: "GIỚI THIỆU",
        onChange: this.onChange_introduction,
      },
      {
        name: "ĐIỀU KIỆN THEO HỌC",
        onChange: this.onChange_proviso,
      },
      {
        name: "MỤC TIÊU KHOÁ HỌC", // mục tiêu
        onChange: this.onChange_target,
      },
      {
        name: "SẢN PHẨM KHOÁ HỌC",
        onChange: this.onChanget_product,
      },

      {
        name: "CHỨNG NHẬN",
        onChange: this.onChange_certification,
      },
      // {
      //   name: "LỊCH KHAI GIẢNG",
      //   onChange: this.onChange_schedule
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
      return (
        <Panel header={`${item.name}`} key={`${key}`}>
          {/* <CKEditor
            onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
            data={this.state.content}
            onChange={item.onChange}
          /> */}
          <CKEditor
            config={{
              filebrowserUploadUrl: `${url.api_url}/cms/api/upload-image-editor`,
              extraPlugins: "font,colorbutton",
            }}
            onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
            data={this.state.content}
            onChange={item.onChange}
          />
        </Panel>
      );
    });

    return (
      <div>
        {training.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("CREATE_INFORTRAINING") ? null : (
              <div className="main-content">
                <Row className="">
                  <Form
                    onSubmit={this._Create_InforTraining_handleSubmit}
                    className=""
                  >
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Hệ đào tạo:</h4>
                        <Form.Item>
                          {getFieldDecorator(
                            "training",
                            Array_ItemEditRole("Hệ đào tạo không được để trống")
                          )(
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
                          {getFieldDecorator(
                            "name",
                            Array_ItemEditRole("Tên không được để trống")
                          )(
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
                          {getFieldDecorator(
                            "image",
                            Array_ItemEditRole("Ảnh bìa không được để trống")
                          )(
                            <label className="staff-custom-file-upload">
                              <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                onChange={this._onChange_image}
                              />
                              Chọn ảnh
                            </label>
                          )}
                          <div className="inforTraining-img">
                            <img
                              src={this.state.file}
                              alt={`${this.state.file}`}
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
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListTrainingByTeacher: () => {
      dispatch(actRequestListTraiNingByTeacher());
    },
    onCreateInforTraining: (body, history) => {
      dispatch(actRequestCreateInforTraining(body, history));
    },
  };
};

const Add_InforTraining = Form.create({ name: "normal_login" })(
  AddInforTraining
);
export default connect(mapStateToProps, mapDispatchToProps)(Add_InforTraining);
