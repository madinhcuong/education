import React from "react";
import { Button, Input, Form, Row, Col } from "antd";
import { connect } from "react-redux";
import { actRequestListNews } from "../../actions/news.action";

class SeachNews extends React.Component {
  state = {
    name_news: "",
    name_topic: "",
  };

  onChangeSeach = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSeachNews = (e) => {
    e.preventDefault();
    this.props.onSeachNews(this.state.name_news, this.state.name_topic);
  };

  render() {
    return (
      <div>
        <Form
          layout="inline"
          onSubmit={this.onSeachNews}
          className="trn-seachName"
        >
          <Row>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 7 }}
            >
              <Form.Item className="trn-seach">
                <Input
                  placeholder="Tên tin tức"
                  name="name_news"
                  value={this.state.name_news}
                  onChange={this.onChangeSeach}
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 7 }}
            >
              <Form.Item className="trn-seach">
                <Input
                  placeholder="Tên chủ đề"
                  name="name_topic"
                  value={this.state.name_topic}
                  onChange={this.onChangeSeach}
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 5 }}
            >
              <Form.Item>
                <Button htmlType="submit" className="trn-bnt-seach">
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSeachNews: (name_news, name_topic) => {
      dispatch(actRequestListNews(name_news, name_topic, false));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeachNews);
