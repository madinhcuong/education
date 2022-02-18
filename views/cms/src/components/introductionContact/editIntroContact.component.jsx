import React from "react";
import { Button, Row, Col, Form } from "antd";
import CKEditor from "ckeditor4-react";
import { withRouter } from "react-router-dom";
import Loading from "../../pages/loading/loading";
import { connect } from "react-redux";
import * as url from "../../utils/url_api";
import Upload_Image from "../../utils/upload_Image";

import {
  actRequestIntroContactByID,
  actRequestUpDateIntroContact,
} from "../../actions/introductionContact.action";

class EditIntroContact extends React.Component {
  state = {};

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onIntroContactByID(id, true);
    }
  }

  onEditorChange = (evt) => {
    this.setState({
      des: evt.editor.getData(),
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

  onUpdateIntroContact = (e) => {
    e.preventDefault();
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.form.validateFields((err, body) => {
        if (!err) {
          this.props.onUpdateIntroContact(id, this.state, this.props.history);
        }
      });
    }
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { introductionContact } = this.props;

    return (
      <div>
        {introductionContact.success ? (
          <Loading />
        ) : (
          <div>
            <div className="main-content">
              <Row>
                <Form onSubmit={this.onUpdateIntroContact}>
                  <Row>
                    <Col span={24}>
                      <h2>
                        {introductionContact.introContactByID &&
                        introductionContact.introContactByID.key === "CONTACT"
                          ? "Liên hệ"
                          : "Giới thiệu"}
                      </h2>
                    </Col>
                  </Row>
                  <Form.Item>
                    {getFieldDecorator("des", {
                      initialValue:
                        introductionContact.introContactByID &&
                        introductionContact.introContactByID.des,
                    })(
                      <CKEditor
                        config={{
                          filebrowserUploadUrl: `${url.api_url}/cms/api/upload-image-editor`,
                          extraPlugins: "font,colorbutton",
                        }}
                        onBeforeLoad={(CKEDITOR) =>
                          (CKEDITOR.disableAutoInline = true)
                        }
                        data={
                          introductionContact.introContactByID &&
                          introductionContact.introContactByID.des
                        }
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
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    introductionContact: state.introductionContact,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onIntroContactByID: (id, loading) => {
      dispatch(actRequestIntroContactByID(id, loading));
    },
    onUpdateIntroContact: (id, data, history) => {
      dispatch(actRequestUpDateIntroContact(id, data, history));
    },
  };
};

const Edit_IntroContact = Form.create({ name: "normal_login" })(
  withRouter(EditIntroContact)
);
export default connect(mapStateToProps, mapDispatchToProps)(Edit_IntroContact);
