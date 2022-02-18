import React from "react";
import { Table, Button, Icon, Modal, Form } from "antd";
import Moment from "react-moment";
import { connect } from "react-redux";
import {
  actRequestDelteCarousrl,
  actRequestUpDateCarousel,
} from "../../actions/carousel.action";
import * as url from "../../utils/url_api";
import Upload_Image from "../../utils/upload_Image";

const { confirm } = Modal;
class ListCarousel extends React.Component {
  state = {
    visible: false,
    status: "",
    id_Carousel: "",
    file: "",
    image: "",
  };

  showModal = (data, status) => {
    if (status === "EDIT") {
      this.setState({
        file: "",
        visible: true,
        id_Carousel: data._id,
        image: data.image,
        status: status,
      });
    } else {
      this.setState({
        file: "",
        visible: true,
        id_Carousel: data._id,
        image: data.image,
        status: status,
      });
    }
  };

  _Update_Carousel = (e) => {
    let id = this.state.id_Carousel;
    let data = {
      url: this.state.image,
    };

    this.props.onUpDateCarousel(id, data);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  //--- upload Image
  _onChange_image = (event) => {
    event.persist();

    let target = event.target.files[0];
    const formData = new FormData();
    formData.append("file", target);

    //-- resize image main news
    formData.append("width", 2000);
    formData.append("height", 600);

    Upload_Image("cms/api/upload-image-carousel", formData).then((res) => {
      if (res.data && res.status === 200) {
        this.setState({
          file: URL.createObjectURL(target),
          image: res.data,
        });
      }
    });
  };

  onDelete = (id) => {
    confirm({
      title: "Bạn có muốn xóa không ?",
      content: "",
      okText: "Xóa",
      onOk: () => {
        this.props.onDeleteCarousel(id);
      },
      cancelText: "Hủy bỏ",
      onCancel() {},
      className: "modal-error",
      okButtonProps: { type: "danger", ghost: true },
      centered: true,
      maskClosable: true,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { dataCarousel } = this.props;

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        render: (text, record) =>
          dataCarousel && dataCarousel.docs.indexOf(record) + 1,
      },

      {
        title: "Tên",
        dataIndex: "name_topic",
        render: (text, record) =>
          dataCarousel && "Hình ảnh " + (dataCarousel.docs.indexOf(record) + 1),
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text) => <Moment format="HH:mm-DD/MM/YYYY">{text}</Moment>,
      },
      {
        title: "Ngày sửa",
        dataIndex: "updatedAt",
        key: "updatedAt",
        render: (text) => <Moment format="HH:mm-DD/MM/YYYY">{text}</Moment>,
      },
      {
        title: "",
        key: "action",
        render: (text, record) => (
          <span>
            <Button
              onClick={() => this.showModal(text, "INFOR")}
              className="role-bnt-viewRole btn-button"
            >
              <Icon type="eye" />
            </Button>
            <Button
              onClick={() => this.showModal(text, "EDIT")}
              className="news-btn-edit btn-button"
            >
              <Icon type="edit" />
            </Button>
            <Button
              className="topic-btn-delete btn-button"
              onClick={() => this.onDelete(text._id)}
            >
              <Icon type="delete" className="topic-delete-item" />
            </Button>
          </span>
        ),
      },
    ];

    const switchView = () => {
      switch (this.state.status) {
        case "INFOR":
          return (
            <Modal
              title="Thông tin"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              cancelText="Đóng"
              okButtonProps={{ style: { display: "none" } }}
            >
              <div className="infoCarousel-img-view">
                {
                  <img
                    src={`${url.api_url}/${this.state.image}`}
                    alt={this.state.file}
                  ></img>
                }
              </div>
            </Modal>
          );

        case "EDIT":
          return (
            <Modal
              title="Chỉnh sửa hình ảnh"
              okText="Lưu lại"
              visible={this.state.visible}
              onOk={this._Update_Carousel}
              onCancel={this.handleCancel}
            >
              <p className="img-carourel-title">
                Bạn vui lòng chọn hình ảnh có kích thước 2000x600 pixel
              </p>
              <Form layout="vertical">
                <Form.Item className="img-carourel-label">
                  {getFieldDecorator("name_topic", {
                    rules: [
                      { required: true, message: "Ảnh không được để trống !" },
                    ],
                  })(
                    <label className="staff-custom-file-upload">
                      <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={this._onChange_image}
                      />
                      Chọn ảnh
                    </label>
                  )}
                  <div className="img-carourel">
                    <img
                      src={
                        this.state.file
                          ? `${this.state.file}`
                          : `${url.api_url}/${this.state.image}`
                      }
                      alt={
                        this.state.file
                          ? `${this.state.file}`
                          : `${url.api_url}/${this.state.image}`
                      }
                      className="news-file-image"
                    />
                  </div>
                </Form.Item>
              </Form>
            </Modal>
          );

        default:
          return null;
      }
    };

    return (
      <div>
        <Table
          className="topic-table"
          rowKey="_id"
          columns={columns}
          dataSource={dataCarousel && dataCarousel.docs}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        />
        {switchView()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforAdmin: state.inforAdmin,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpDateCarousel: (id, data) => {
      dispatch(actRequestUpDateCarousel(id, data));
    },

    onDeleteCarousel: (id) => {
      dispatch(actRequestDelteCarousrl(id));
    },
  };
};

const ListCarouselCreateForm = Form.create({ name: "form_in_modal" })(
  ListCarousel
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCarouselCreateForm);
