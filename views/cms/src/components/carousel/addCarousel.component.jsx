import React from "react";
import { Modal, Form } from "antd";
import Upload_Image from "../../utils/upload_Image";

class AddCarousel extends React.Component {
  state = {};

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
        this.props.dataFrom(res.data, URL.createObjectURL(target));
      }
    });
  };

  render() {
    const { visible, onCancel, onCreate, form, file } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Thêm hình ảnh"
        okText="Thêm mới"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <p className="img-carourel-title">
          Bạn vui lòng chọn hình ảnh có kích thước 2000x600 pixel
        </p>
        <Form layout="vertical">
          <Form.Item className="img-carourel-label">
            {getFieldDecorator("name_topic", {
              rules: [{ required: true, message: "Ảnh không được để trống !" }],
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
              <img src={file} alt={`${file}`} className="news-file-image" />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const AddCarouselCreateForm = Form.create({ name: "form_in_modal" })(
  AddCarousel
);
export default AddCarouselCreateForm;
