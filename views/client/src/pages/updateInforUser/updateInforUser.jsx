import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loading from "../loading/loading";
import { Row, Col, Button, Form, Input, DatePicker, Select } from "antd";
import moment from "moment";
import * as url from "../../utils/url_api";
import Upload_Image from "../../utils/upload_Image";

import {
  actRequestInforClient,
  actRequestUpDateInfoClient,
} from "../../actions/inforClient.action";

class UpdateInforUser extends React.Component {
  state = {};

  componentDidMount() {
    this.props.onInforClient();
  }

  onChange_input = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChange_date = (date, dateString) => {
    this.setState({
      date: dateString,
    });
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

    //-- resize image main news
    formData.append("width", 354);
    formData.append("height", 472);

    Upload_Image("client/api/upload-image", formData).then((res) => {
      if (res.data && res.status === 200) {
        this.setState({
          file: URL.createObjectURL(target),
          image: res.data,
        });
      }
    });
  };

  handleSubmit_Update = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.state && JSON.stringify(this.state) !== "{}") {
          this.props.onUpDateInfoClient(this.state, this.props.history);
        }
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };
  render() {
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
    let { inforClient } = this.props;
    return (
      <div>
        {inforClient.loading ? (
          <Loading />
        ) : (
          <div>
            <Row>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 24, offset: 0 }}
                md={{ span: 20, offset: 2 }}
                lg={{ span: 20, offset: 2 }}
                xl={{ span: 20, offset: 2 }}
                className="update-infor"
                span={24}
              >
                <div className="update-infor-tt">Ch???nh s???a th??ng tin</div>
                <Row>
                  <Form onSubmit={this.handleSubmit_Update}>
                    <Row>
                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 12, offset: 0 }}
                        lg={{ span: 12, offset: 0 }}
                        xl={{ span: 12, offset: 0 }}
                        className="update-infor-col"
                      >
                        <h5 className="update-infor-title">H??? v?? t??n</h5>
                        <Form.Item>
                          {getFieldDecorator("name", {
                            initialValue:
                              inforClient.infoClient &&
                              inforClient.infoClient.name,
                            rules: [
                              {
                                required: true,
                                message: "H??? v??o kh??ng ???????c ????? tr???ng",
                              },
                            ],
                          })(
                            <Input
                              name="name"
                              onChange={this.onChange_input}
                              placeholder="Nh???p h??? v?? t??n"
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 12, offset: 0 }}
                        lg={{ span: 12, offset: 0 }}
                        xl={{ span: 12, offset: 0 }}
                        className="update-infor-col"
                      >
                        <h5 className="update-infor-title">Ng??y sinh</h5>
                        <Form.Item>
                          {getFieldDecorator("date", {
                            initialValue:
                              inforClient.infoClient &&
                              inforClient.infoClient.date &&
                              moment(inforClient.infoClient.date, "DD/MM/YYYY"),
                            rules: [
                              {
                                required: true,
                                message: "Ng??y sinh kh??ng ???????c ????? tr???ng!",
                              },
                            ],
                          })(
                            <DatePicker
                              onChange={this.onChange_date}
                              format={"DD/MM/YYYY"}
                              style={{ width: "100%" }}
                            />
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 12, offset: 0 }}
                        lg={{ span: 12, offset: 0 }}
                        xl={{ span: 12, offset: 0 }}
                        className="update-infor-col"
                      >
                        <h5 className="update-infor-title">Gi???i t??nh</h5>
                        <Form.Item>
                          {getFieldDecorator("sex", {
                            initialValue:
                              inforClient.infoClient &&
                              inforClient.infoClient.sex,
                            rules: [
                              {
                                required: true,
                                message: "Ng??y sinh kh??ng ???????c ????? tr???ng!",
                              },
                            ],
                          })(
                            <Select
                              onSelect={this.onChange_Select_Sex}
                              name="sex"
                            >
                              <Option value="MALE">Nam</Option>
                              <Option value="FEMALE">N???</Option>
                            </Select>
                          )}
                        </Form.Item>
                      </Col>
                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 12, offset: 0 }}
                        lg={{ span: 12, offset: 0 }}
                        xl={{ span: 12, offset: 0 }}
                        className="update-infor-col"
                      >
                        <h5 className="update-infor-title">?????a ch???</h5>
                        <Form.Item>
                          {getFieldDecorator("address", {
                            initialValue:
                              inforClient.infoClient &&
                              inforClient.infoClient.address,
                            rules: [
                              {
                                required: true,
                                message: "?????a ch??? kh??ng ???????c ????? tr???ng",
                              },
                            ],
                          })(
                            <Input
                              name="address"
                              onChange={this.onChange_input}
                              placeholder="Nh???p ?????a ch???"
                            />
                          )}
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 12, offset: 0 }}
                        lg={{ span: 12, offset: 0 }}
                        xl={{ span: 12, offset: 0 }}
                        className="update-infor-col"
                      >
                        <h5 className="update-infor-title">S??? ??i???n tho???i</h5>
                        <Form.Item>
                          {getFieldDecorator("phone", {
                            initialValue:
                              inforClient.infoClient &&
                              inforClient.infoClient.phone,
                            rules: [
                              {
                                required: true,
                                message: "S??? ??i???n tho???i kh??ng ???????c ????? tr???ng",
                              },
                            ],
                          })(
                            <Input
                              name="phone"
                              onChange={this.onChange_input}
                              placeholder="Nh???p s??? ??i???n tho???i"
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 12, offset: 0 }}
                        lg={{ span: 12, offset: 0 }}
                        xl={{ span: 12, offset: 0 }}
                        className="update-infor-col"
                      >
                        <Row>
                          <Col span={12}>
                            {getFieldDecorator("image", {
                              initialValue:
                                inforClient.infoClient &&
                                inforClient.infoClient.image,
                              rules: [
                                {
                                  required: true,
                                  message: "???nh kh??ng ???????c ????? tr???ng",
                                },
                              ],
                            })(
                              <div className="update-inforClient-inputfile">
                                <label className="staff-custom-file-upload">
                                  <input
                                    type="file"
                                    onChange={this._onChange_image}
                                    accept=".png, .jpg, .jpeg"
                                  />
                                  Ch???n ???nh ?????i di???n
                                </label>
                              </div>
                            )}
                          </Col>
                          <Col span={12}>
                            <div className="img-people">
                              <img
                                src={
                                  this.state.file
                                    ? this.state.file
                                    : `${url.api_url_image}/${
                                        inforClient.infoClient &&
                                        inforClient.infoClient.image
                                      }`
                                }
                                alt={`${
                                  this.state.file
                                    ? this.state.file
                                    : inforClient.infoClient &&
                                      inforClient.infoClient.image
                                }`}
                                className="news-file-image"
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={24} className="update-infor-submit">
                        <Form.Item>
                          <Button
                            className="changeScore-btn-10"
                            htmlType="submit"
                          >
                            S???a ?????i
                          </Button>
                          <Button
                            onClick={this.onClose}
                            className="changeScore-btn-1000"
                            style={{ marginLeft: "10px" }}
                          >
                            Quay l???i
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforClient: state.inforClient,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInforClient: () => {
      dispatch(actRequestInforClient(true));
    },
    onUpDateInfoClient: (body, history) => {
      dispatch(actRequestUpDateInfoClient(body, history));
    },
  };
};

const Update_InforUser = Form.create()(withRouter(UpdateInforUser));
export default connect(mapStateToProps, mapDispatchToProps)(Update_InforUser);
