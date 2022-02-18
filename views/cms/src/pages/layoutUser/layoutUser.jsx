import React from "react";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";
import Loading from "../loading/loading";
import {
  actRequestListCarousel,
  actRequestCreateCarousel,
} from "../../actions/carousel.action";

import ListCarousel from "../../components/carousel/listCarousel.component";
import AddCarousel from "../../components/carousel/addCarousel.component";

class LayoutUser extends React.Component {
  state = {
    visible: false,
    seach_topic: "",
    image: "",
    file: "",
  };

  componentDidMount() {
    this.props.onListCarousel(true);
  }

  showModal = () => {
    this.setState({ visible: true, file: "" });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  dataFrom = (values, file) => {
    this.setState({ file: file, image: values });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.onCreateCarousel({ url: this.state.image });
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  onChangeSeach = (event) => {
    let target = event.target;
    this.setState({
      seach_topic: target.value,
    });
  };

  onSeachTopic = (e) => {
    e.preventDefault();
    this.props.onListTopic(this.state.seach_topic);
  };

  render() {
    let { carousel } = this.props;

    return (
      <div>
        {carousel.success ? (
          <Loading />
        ) : (
          <div>
            <Row className="staff-table main-content">
              <Row className="title-main-content">
                <Col span={12}>
                  <h2>Quảng cáo</h2>
                </Col>
                <Col span={12} className="staff-addStaff">
                  <Button onClick={this.showModal} className="btn-add-new">
                    Tạo mới
                  </Button>

                  <AddCarousel
                    file={this.state.file}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    dataFrom={this.dataFrom}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                  />
                </Col>
              </Row>
              <ListCarousel
                dataCarousel={
                  carousel.dataCarousel ? carousel.dataCarousel : []
                }
              />
            </Row>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforAdmin: state.inforAdmin,
    carousel: state.carousel,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onCreateCarousel: (body) => {
      dispatch(actRequestCreateCarousel(body));
    },

    onListCarousel: (seach) => {
      dispatch(actRequestListCarousel(seach));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutUser);
