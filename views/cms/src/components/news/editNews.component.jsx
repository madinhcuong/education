import React from "react";
import { Button, Row, Col, Form, Icon, Input, Select } from "antd";
import CKEditor from "ckeditor4-react";
import { withRouter } from "react-router-dom";
import Loading from "../../pages/loading/loading";
import { Array_ItemEditRole } from "../../helpers/validate";
import { connect } from "react-redux";
import { actRequestListTopicByNews } from "../../actions/topic.action";
import {
  actRequestNewsById,
  actRequestUpDateNews,
} from "../../actions/news.action";
import * as url from "../../utils/url_api";
import Upload_Image from "../../utils/upload_Image";
const { Option } = Select;

class EditNews extends React.Component {
  state = {
    id_topic: "",
    name_news: "",
    content: "",
    file: "",
    image: "",
  };

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onInforNews(id);
      this.props.onListTopicByNews();
    }
  }

  onEditorChange = (evt) => {
    this.setState({
      content: evt.editor.getData(),
    });
  };

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

  onUpdateNews = (e) => {
    e.preventDefault();
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.form.validateFields((err, body) => {
        if (!err) {
          let data = {
            id_topic: body.id_topic,
            name_news: body.name_news,
            content: this.state.content ? this.state.content : body.content,
            image: this.state.image ? this.state.image : body.image,
          };
          this.props.onUpdateNews(id, data, this.props.history);
        }
      });
    }
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { topics, news, inforAdmin } = this.props;
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

    return (
      <div>
        {news.success && topics.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("UPDATE_NEWS") ? null : (
              <div className="main-content">
                <Row>
                  <Form onSubmit={this.onUpdateNews}>
                    <Row>
                      <Col span={11}>
                        <h4 className="teacher-title-addT">Chủ đề tin tức:</h4>
                        <Form.Item className="teacher-list-role">
                          {getFieldDecorator("id_topic", {
                            initialValue:
                              news.newById.id_topic &&
                              news.newById.id_topic._id,
                            rules: Array_ItemEditRole(
                              "Chủ đề không được để trống"
                            ).rules,
                          })(<Select>{list_Topic ? list_Topic : null}</Select>)}
                        </Form.Item>
                      </Col>
                      <Col span={11} offset={2}>
                        <h4 className="teacher-title-addT">Tiêu đề:</h4>
                        <Form.Item>
                          {getFieldDecorator("name_news", {
                            initialValue:
                              news.newById && news.newById.name_news,
                            rules: Array_ItemEditRole(
                              "Tiêu đề không được để trống"
                            ).rules,
                          })(
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
                          {getFieldDecorator("image", {
                            initialValue: news.newById && news.newById.image,
                            rules: Array_ItemEditRole(
                              "Ảnh bìa không được để trống"
                            ).rules,
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
                                      news.newById && news.newById.image
                                    }`
                              }
                              alt={`${
                                this.state.file
                                  ? this.state.file
                                  : news.newById && news.newById.image
                              }`}
                            />
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item>
                      {getFieldDecorator("content", {
                        initialValue: news.newById && news.newById.content,
                      })(
                        <CKEditor
                          config={{
                            filebrowserUploadUrl: `${url.api_url}/cms/api/upload-image-editor`,
                            extraPlugins: "font,colorbutton",
                          }}
                          onBeforeLoad={(CKEDITOR) =>
                            (CKEDITOR.disableAutoInline = true)
                          }
                          data={news.newById && news.newById.content}
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
    news: state.news,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInforNews: (id) => {
      dispatch(actRequestNewsById(id));
    },
    onListTopicByNews: () => {
      dispatch(actRequestListTopicByNews());
    },
    onUpdateNews: (id, data, history) => {
      dispatch(actRequestUpDateNews(id, data, history));
    },
  };
};

const Edit_News = Form.create({ name: "normal_login" })(withRouter(EditNews));
export default connect(mapStateToProps, mapDispatchToProps)(Edit_News);
