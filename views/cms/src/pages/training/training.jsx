import React from "react";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";
import Upload_Image from "../../utils/upload_Image";

import {
  actRequestListTraiNing,
  actRequestCreateTraining,
} from "../../actions/training.action";

import Loading from "../loading/loading";
import SeachTraining from "../../components/trainings/seachTraining.component";
import ListTraining from "../../components/trainings/listTraining.component";
import AddTraining from "../../components/trainings/addTraining.component";

class TraiNing extends React.Component {
  state = {
    visible: false,
    imageUrl: "",
  };

  componentDidMount() {
    this.props.onListTraining("");
  }

  showModal = () => {
    this.setState({ visible: true, imageUrl: "" });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  //--- upload image
  _onChange_image = (event) => {
    event.persist();

    let target = event.target.files[0];
    const formData = new FormData();
    formData.append("file", target);

    //-- resize image main news
    formData.append("width", 512);
    formData.append("height", 512);

    Upload_Image("cms/api/upload-image", formData).then((res) => {
      if (res.data && res.status === 200) {
        this.setState({
          imageUrl: URL.createObjectURL(target),
          image: res.data,
        });
      }
    });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      let data = {
        image: this.state.image,
        name: values.name,
      };

      this.props.onCreateTraining(data);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render() {
    let { inforAdmin, training } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    return (
      <div>
        {training.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_TRAINING") ? null : (
              <div>
                <Row>
                  <Col span={24} className="seach-main-content">
                    <SeachTraining />
                  </Col>
                </Row>
                <Row className="staff-table main-content">
                  <Row className="title-main-content">
                    <Col span={12}>
                      <h2>Danh sách đào tạo</h2>
                    </Col>
                    <Col span={12} className="staff-addStaff">
                      <Button onClick={this.showModal} className="btn-add-new">
                        Tạo mới
                      </Button>

                      <AddTraining
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        _onChange_image={this._onChange_image}
                        imageUrl={this.state.imageUrl}
                      />
                    </Col>
                  </Row>
                  <ListTraining
                    onListTraing={
                      training.list_training.length > 0
                        ? training.list_training
                        : []
                    }
                  />
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
    training: state.training,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListTraining: (seach) => {
      dispatch(actRequestListTraiNing(seach, true));
    },
    onCreateTraining: (data) => {
      dispatch(actRequestCreateTraining(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TraiNing);
