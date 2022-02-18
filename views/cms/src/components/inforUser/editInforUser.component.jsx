import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Icon, Input, Button, DatePicker, Select } from "antd";

import { withRouter } from "react-router-dom";
import moment from "moment";
import Upload_Image from "../../utils/upload_Image";
import * as url from "../../utils/url_api";
import { actRequestUpdateInfor } from "../../actions/inforUser.action";
import {
  vali_name,
  vali_phone,
  vali_address,
  vali_sex,
} from "../../helpers/validate";
const { Option } = Select;

class UpdateInfor extends React.Component {
  state = {};

  onChange_input = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChange_Select_Sex = async (value, event) => {
    await this.setState({
      sex: value,
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
          avatar: res.data,
        });
      }
    });
  };

  onChange_Date = (date, dateString) => {
    this.setState({
      ...this.state,
      date: dateString,
    });
  };

  _Update_Staff_handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      if (!err) {
        this.props.onUpdateInfor(this.state, this.props.history);
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { inforAdmin } = this.props;
    const dateFormatList = "DD/MM/YYYY";

    return (
      <div>
        <Row className="main-content">
          <Form onSubmit={this._Update_Staff_handleSubmit} className="">
            <Row>
              <Col span={10}>
                <h4 className="teacher-title-addT">Họ và tên:</h4>
                <Form.Item>
                  {getFieldDecorator("fullName", {
                    initialValue: inforAdmin.fullName && inforAdmin.fullName,
                    rules: vali_name.rules,
                  })(
                    <Input
                      name="fullName"
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
                <h4 className="teacher-title-addT">Số điện thoại:</h4>
                <Form.Item>
                  {getFieldDecorator("phone", {
                    initialValue: inforAdmin.phone && inforAdmin.phone,
                    rules: vali_phone.rules,
                  })(
                    <Input
                      name="phone"
                      onChange={this.onChange_input}
                      style={{ width: "100%" }}
                      type="number"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <h4 className="teacher-title-addT">Địa chỉ:</h4>
                <Form.Item>
                  {getFieldDecorator("address", {
                    initialValue: inforAdmin.address && inforAdmin.address,
                    rules: vali_address.rules,
                  })(
                    <Input
                      name="address"
                      onChange={this.onChange_input}
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Nhập địa chỉ ..."
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={10} offset={2}>
                <Row>
                  <Col span={11}>
                    <h4 className="teacher-title-addT">Ngày sinh:</h4>
                    <Form.Item className="teacher-add-datepicker">
                      {getFieldDecorator("date", {
                        initialValue:
                          inforAdmin.date &&
                          moment(inforAdmin.date, "DD/MM/YYYY"),
                      })(
                        <DatePicker
                          onChange={this.onChange_Date}
                          format={dateFormatList}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={11} offset={2}>
                    <h4 className="teacher-title-addT">Giới tính:</h4>
                    <Form.Item className="teacher-list-role">
                      {getFieldDecorator("sex", {
                        initialValue: inforAdmin.sex && inforAdmin.sex,
                        rules: vali_sex.rules,
                      })(
                        <Select onSelect={this.onChange_Select_Sex} name="sex">
                          <Option value="MALE">Nam</Option>
                          <Option value="FEMALE">Nữ</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col span={10}></Col>
              <Col span={10} offset={2}>
                <Form.Item>
                  <h4 className="teacher-title-addT">Ảnh:</h4>

                  <label className="staff-custom-file-upload">
                    <input type="file" onChange={this._onChange_image} />
                    Chọn ảnh đại diện
                  </label>

                  <div className="img-people">
                    <img
                      src={
                        this.state.file
                          ? this.state.file
                          : `${url.api_url}/${
                              inforAdmin.avatar && inforAdmin.avatar
                            }`
                      }
                      alt={`${inforAdmin.avatar && inforAdmin.avatar}`}
                      className="news-file-image"
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Col span={24} className="btn-component">
                <Button htmlType="submit" className="btn-create-new">
                  Lưu lại
                </Button>
                <Button onClick={this.onClose} className="btn-close">
                  Hoàn tác
                </Button>
              </Col>
            </Form.Item>
          </Form>
        </Row>
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
    onUpdateInfor: (data, history) => {
      dispatch(actRequestUpdateInfor(data, history));
    },
  };
};

const Update_Infor = Form.create()(withRouter(UpdateInfor));
export default connect(mapStateToProps, mapDispatchToProps)(Update_Infor);
