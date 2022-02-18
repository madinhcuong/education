import React from "react";
import { Button, Row, Col, Form, Icon, Input, Select } from "antd";
import { connect } from "react-redux";
import CKEditor from "ckeditor4-react";
import { Array_ItemEditRole } from "../../helpers/validate";
import img from "../../assets/img/img.jpg";
import Upload_Image from "../../utils/upload_Image";
import Loading from "../../pages/loading/loading";
import { actRequestListTopicByNews } from "../../actions/topic.action";
import { actRequestCreateNews } from "../../actions/news.action";

// import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import * as url from "../../utils/url_api";

const { Option } = Select;

class AddNews extends React.Component {
  state = {
    file: img,
    content: "",
    image: "",
  };

  componentDidMount() {
    this.props.onListTopicByNews();
  }

  onEditorChange = (evt) => {
    this.setState({
      content: evt.editor.getData(),
    });
  };

  // onEditorChange = (event, editor) => {
  //   const data = editor.getData();

  //   console.log(data);

  //   this.setState({
  //     content: data,
  //   });
  // };

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

  onCreateNews = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, body) => {
      if (!err) {
        let data = {
          id_topic: body.id_topic,
          name_news: body.name_news,
          content: this.state.content,
          image: this.state.image,
        };
        this.props.onCreateNews(data, this.props.history);
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { topics, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    let list_Topic = null;
    if (topics.listTopicByNews.length > 0) {
      list_Topic = topics.listTopicByNews.map((item, key) => {
        return (
          <Option value={`${item._id}`} key={key}>
            {item.name_topic}
          </Option>
        );
      });
    }
    // ClassicEditor.defaultConfig = {
    //   image: {
    //     toolbar: [Image],
    //   },
    //   // This value must be kept in sync with the language defined in webpack.config.js.
    //   language: "en",
    // };
    return (
      <div>
        {topics.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("CREATE_NEWS") ? null : (
              <div>
                <Row className="main-content">
                  <Form onSubmit={this.onCreateNews}>
                    <Row>
                      <Col span={11}>
                        <h4 className="teacher-title-addT">Chủ đề tin tức:</h4>
                        <Form.Item className="teacher-list-role">
                          {getFieldDecorator(
                            "id_topic",
                            Array_ItemEditRole("Chủ đề không được để trống")
                          )(<Select>{list_Topic ? list_Topic : null}</Select>)}
                        </Form.Item>
                      </Col>
                      <Col span={11} offset={2}>
                        <h4 className="teacher-title-addT">Tiêu đề:</h4>
                        <Form.Item>
                          {getFieldDecorator(
                            "name_news",
                            Array_ItemEditRole("Tiêu đề không được để trống")
                          )(
                            <Input
                              prefix={
                                <Icon
                                  type="user"
                                  style={{ color: "rgba(0,0,0,.25)" }}
                                />
                              }
                              placeholder="Nhập tiêu đề tin tức ..."
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
                              Chọn ảnh bìa
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
                    <Form.Item>
                      {getFieldDecorator(
                        "username",
                        Array_ItemEditRole(
                          "Nội dung tin tức không được để trống"
                        )
                      )(
                        // <CKEditor
                        //   editor={ClassicEditor}
                        //   // data={content}
                        //   onChange={this.onEditorChange}
                        //   config={{
                        //     ckfinder: {
                        //       // Upload the images to the server using the CKFinder QuickUpload command.
                        //       uploadUrl: `${url.api_url}/cms/api/upload-image-editor`,
                        //       headers: {
                        //         // "content-type": "multipart/form-data",
                        //         // "Content-Type": "application/json"
                        //         "x-access-token": "",
                        //       },
                        //     },
                        //   }}
                        // />

                        // -------------------

                        <CKEditor
                          config={{
                            // filebrowserBrowseUrl: "/ckfinder/ckfinder.html",
                            filebrowserUploadUrl: `${url.api_url}/cms/api/upload-image-editor`,
                            // filebrowserWindowWidth: "2000",
                            // filebrowserWindowHeight: "1000",
                            extraPlugins: "font,colorbutton",

                          }}
                          onBeforeLoad={(CKEDITOR) =>
                            (CKEDITOR.disableAutoInline = true)
                          }
                          data={this.state.content}
                          onChange={this.onEditorChange}
                        />
                      )}
                    </Form.Item>
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
    topics: state.topics,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListTopicByNews: () => {
      dispatch(actRequestListTopicByNews());
    },
    onCreateNews: (data, history) => {
      dispatch(actRequestCreateNews(data, history));
    },
  };
};

const Add_News = Form.create({ name: "normal_login" })(AddNews);
export default connect(mapStateToProps, mapDispatchToProps)(Add_News);
