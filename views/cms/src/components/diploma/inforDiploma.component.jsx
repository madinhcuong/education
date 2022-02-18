import React from "react";
import { Row, Col, Button, Modal, Icon } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../pages/loading/loading";
import * as url from "../../utils/url_api";
import Upload_Image from "../../utils/upload_Image";
import { distribution_student, switch_sex } from "../../helpers/base.helper";
import {
  actRequestDiplomaById,
  actRequestUploadImageDiploma,
} from "../../actions/diploma.action";

class InforDiploma extends React.Component {
  state = {
    visible: false,
    image_list: [],
    confirmLoading: false,
  };

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onInforDiplomaById(id, true);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.diploma && nextProps.diploma.diploma_ByID) {
      let data_diploma = nextProps.diploma.diploma_ByID;
      this.setState({
        image_list: data_diploma.image_diploma,
      });
    }
  }

  //--- Model
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  callback_UpdateImage = (res) => {
    window.location.reload();
  };

  handleOk = (e) => {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;

      this.setState({
        confirmLoading: true,
      });

      this.props.onUploadImageDiploma(
        id,
        {
          image_list: this.state.image_list,
        },
        this.callback_UpdateImage
      );
    }
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };
  //-- end model

  //-- Upload
  _onChange_image = async (event) => {
    let target = event.target.files[0];
    const formData = new FormData();
    formData.append("file", target);

    Upload_Image("cms/api/upload-image", formData).then(async (res) => {
      if (res.data && res.status === 200) {
        this.state.image_list.push({ image: res.data });
        this.setState({
          file: URL.createObjectURL(target),
          image_list: [...this.state.image_list],
        });
      }
    });
  };
  //-- End upload

  onhandleDelete_image = (key) => {
    this.state.image_list.splice(key, 1);
    this.setState({
      ...this.state,
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    let { inforAdmin, diploma } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    let imageList = null;
    let list_iamge_diploma = this.state.image_list;

    if (list_iamge_diploma && list_iamge_diploma.length > 0) {
      imageList = list_iamge_diploma.map((item, key) => {
        return (
          <div key={key}>
            <span>
              <Icon
                onClick={() => this.onhandleDelete_image(key)}
                type="delete"
              />
            </span>
            <span>{item.image}</span>
          </div>
        );
      });
    }

    let list_view_image = null;
    if (
      diploma.diploma_ByID.image_diploma &&
      diploma.diploma_ByID.image_diploma.length > 0
    ) {
      list_view_image = diploma.diploma_ByID.image_diploma.map((item, key) => {
        return (
          <div key={key} className="diploma-view-image-key">
            <span>
              <img src={`${url.api_url}/${item.image}`} alt={item.image}></img>
            </span>
          </div>
        );
      });
    }

    return (
      <div>
        {diploma.success ? (
          <Loading />
        ) : (
          <div className="main-content">
            {!permissions.includes("READ_DIPLOMA") ? null : (
              <div>
                <Row>
                  <Col span={24} className="infor-people-col-image">
                    {diploma.diploma_ByID.id_student &&
                    diploma.diploma_ByID.id_student.image ? (
                      <img
                        src={`${url.api_url}/${
                          diploma.diploma_ByID.id_student &&
                          diploma.diploma_ByID.id_student.image
                        }`}
                        alt={`${
                          diploma.diploma_ByID.id_student &&
                          diploma.diploma_ByID.id_student.image
                        }`}
                        className="infor-people-image"
                      ></img>
                    ) : null}
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Tên học viên</h3>
                    <p>
                      {diploma.diploma_ByID.id_student &&
                        diploma.diploma_ByID.id_student.name}
                    </p>
                  </Col>
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Giới tính</h3>
                    <p>
                      {diploma.diploma_ByID.id_student &&
                        switch_sex(diploma.diploma_ByID.id_student.sex)}
                    </p>
                  </Col>
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Ngày sinh</h3>
                    <p>
                      {diploma.diploma_ByID.id_student &&
                        diploma.diploma_ByID.id_student.date}
                    </p>
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Địa chỉ</h3>
                    <p>
                      {diploma.diploma_ByID.id_student &&
                        diploma.diploma_ByID.id_student.address}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Email</h3>
                    <p>
                      {diploma.diploma_ByID.id_student &&
                        diploma.diploma_ByID.id_student.email}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Số điện thoại</h3>
                    <p>
                      {diploma.diploma_ByID.id_student &&
                        diploma.diploma_ByID.id_student.phone}
                    </p>
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Khóa học</h3>
                    <p>
                      {diploma.diploma_ByID.id_Class &&
                        diploma.diploma_ByID.id_Class.id_Courses.name}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Lớp học</h3>
                    <p>
                      {diploma.diploma_ByID.id_Class &&
                        diploma.diploma_ByID.id_Class.name}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Xếp loại</h3>
                    <p>
                      {diploma.diploma_ByID.total_score &&
                        distribution_student(diploma.diploma_ByID.total_score)
                          .name}
                    </p>
                  </Col>
                </Row>

                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Điểm 1 (30%)</h3>
                    <p>
                      {diploma.diploma_ByID && diploma.diploma_ByID.score_30}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Điểm 2 (70%)</h3>
                    <p>
                      {diploma.diploma_ByID && diploma.diploma_ByID.score_70}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Điểm trung bình</h3>
                    <p>
                      {diploma.diploma_ByID && diploma.diploma_ByID.total_score}
                    </p>
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Mã chứng chỉ</h3>
                    <p>
                      {diploma.diploma_ByID &&
                        diploma.diploma_ByID.diploma_code}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <div className="diploma-view-image">
                      <div className="diploma-view-image-title">
                        Ảnh chứng chỉ
                      </div>
                      <div>{list_view_image}</div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col span={24} className="btn-component">
                    <Button onClick={this.showModal} className="btn-edit">
                      Tải ảnh chứng chỉ
                    </Button>
                    <Button onClick={this.onClose} className="btn-close">
                      Hoàn tác
                    </Button>
                  </Col>
                </Row>
                {/* -- Model upload -- */}
                <Modal
                  title="Tải ảnh chứng chỉ"
                  visible={this.state.visible}
                  okText="Lưu lại"
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  confirmLoading={this.state.confirmLoading}
                >
                  <div>
                    <label className="staff-custom-file-upload">
                      <input
                        onChange={this._onChange_image}
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="name"
                      ></input>
                      Chọn ảnh
                    </label>
                  </div>
                  <div className="diploma-upload-image">{imageList}</div>
                </Modal>
                {/* -- End Model upload -- */}
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
    diploma: state.diploma,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInforDiplomaById: (id, loading) => {
      dispatch(actRequestDiplomaById(id, loading));
    },
    onUploadImageDiploma: (id, data, cb) => {
      dispatch(actRequestUploadImageDiploma(id, data, cb));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforDiploma));
