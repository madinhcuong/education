import React from "react";
import { Table, Button, Icon, Row, Col, Tag } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../pages/loading/loading";
import { Modal } from "antd";
import SeachStudentByClass from "./seachStudentByClass.component";
import {
  actRequestListStudentByIdClass,
  actRequestImportScoreStudent,
  actRequestGetExportScoreStudent,
  actRequestUpDateScoreStudent,
  actRequestSendNotiClass,
  actRequestInforStudentClass,
  actRequestCloseClassByid,
} from "../../actions/class.action";
import { distribution_student, switch_sex } from "../../helpers/base.helper";
import * as url from "../../utils/url_api";

import EditScore from "./editScore.component";
import SendNoti from "./sendNoti.component";

const { confirm } = Modal;
class ListStudentByClass extends React.Component {
  state = {
    id_class: "",
    id_student: "",
    type_model: "",
    visible_modal: false,
    visible_modalNoti: false,
    inforStudent: {},
    view_show_model: "NOTI",
  };

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onListStudentByIdClass(id);
    }
  }

  showModal_edit_Score = (data) => {
    const { form } = this.formRef.props;
    form.resetFields();
    this.setState({
      visible_modal: true,
      inforStudent: data,
      view_show_model: "EDIT_SCORE",
    });
  };

  //-- modal Noti
  showModal_Noti = (type_model, id) => {
    if (type_model === "NOTI_CLASS") {
      let { match } = this.props;
      if (match) {
        let id_class = match.params.id;
        this.setState({
          id_class: id_class,
          type_model: type_model,
          visible_modalNoti: true,
          view_show_model: "NOTI",
        });
      }
    }
    if (type_model === "NOTI_STUDENT") {
      let { match } = this.props;
      if (match) {
        let id_class = match.params.id;
        this.setState({
          id_class: id_class,
          id_student: id,
          type_model: type_model,
          visible_modalNoti: true,
          view_show_model: "NOTI",
        });
      }
    }
  };

  handleCancel_Noti = (e) => {
    this.setState({
      visible_modalNoti: false,
    });
  };

  // submit sen noti
  handleSubmit_SendNoti = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, body) => {
      if (!err) {
        let data = {
          type_model: this.state.type_model,
          id_class: this.state.id_class,
          id_student: this.state.id_student,
          title: body.title,
          description: body.description,
        };
        this.props.onSendNotiClass(data);
        form.resetFields();
        this.setState({ visible_modalNoti: false });
      }
    });
  };
  //-- end modal noti

  handleCancel_edit_Score = (e) => {
    this.setState({
      visible_modal: false,
    });
  };

  // submit edit ??i???m
  handleSubmit_EditScore = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, body) => {
      if (!err) {
        let data = {
          score_30: +body.score_30,
          score_70: +body.score_70,
        };
        let id_student = this.state.inforStudent
          ? this.state.inforStudent._id
          : "";

        let { match } = this.props;
        let id_class = match.params.id;
        if (id_class && id_student) {
          this.props.onUpDateScoreStudent(id_student, id_class, data);
          form.resetFields();
          this.setState({ visible_modal: false });
        }
      }
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  onChange_file_Import = async (event) => {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      let target = event.target.files[0];
      const formData = new FormData();
      await formData.append("file", target);

      await this.props.onImportScoreStudent(id, formData);
    }
  };

  onCloseByIDClass = () => {
    confirm({
      title: "B???n c?? mu???n k???t th??c l???p h???c ?",
      content: "",
      okText: "?????ng ??",
      onOk: () => {
        let { match } = this.props;
        if (match) {
          let id = match.params.id;
          this.props.onCloseClassByid(id);
        }
      },
      cancelText: "H???y b???",
      onCancel() {},
      className: "modal-error",
      okButtonProps: { type: "danger", ghost: true },
      centered: true,
      maskClosable: true,
    });
  };

  // get infor student class
  onInforStudentClass = (id_student) => {
    let { match } = this.props;
    if (match) {
      let id_class = match.params.id;
      this.props.onInforStudentClass(id_class, id_student, true);
    }
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    let { _class, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    let { match } = this.props;
    let id = match.params.id;
    let data_class =
      _class && _class.listStudentByIdClass.length > 0
        ? _class.listStudentByIdClass
        : [];

    let data_student =
      _class &&
      _class.listStudentByIdClass.length > 0 &&
      _class.listStudentByIdClass[0].data.length > 0
        ? _class.listStudentByIdClass[0].data
        : [];

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) => data_student.indexOf(record) + 1,
        width: 90,
      },
      {
        title: "H??? v?? t??n",
        dataIndex: "name",
        width: "13%",
      },
      {
        title: "Ng??y sinh",
        dataIndex: "date",
      },
      {
        title: "Gi???i t??nh",
        render: (text, record) => <span>{switch_sex(text.sex)}</span>,
      },

      {
        title: "??i???m 1 (30%)",
        dataIndex: "score_30",
      },
      {
        title: "??i???m 2 (70%)",
        dataIndex: "score_70",
      },
      {
        title: "??i???m Trung B??nh",
        dataIndex: "total_score",
      },
      {
        title: "X???p lo???i",
        render: (text, record) => (
          <Tag color={distribution_student(text.total_score).color}>
            {distribution_student(text.total_score).name}
          </Tag>
        ),
        width: "13%",
      },
      {
        title: "",
        render: (text, record) => (
          <span>
            {!permissions.includes("READ_CLASSALL") ? null : (
              <Link to={`/admin/thong-tin-hoc-vien-lop-hoc/${text._id}`}>
                <Button
                  onClick={() => this.onInforStudentClass(text._id)}
                  className="btn-view"
                >
                  <Icon type="eye" />
                </Button>
              </Link>
            )}
            {!permissions.includes("EDIT_SCORE_STUDENT") ||
            data_class[0].status === "CLOSE" ? null : (
              <Button
                onClick={() => this.showModal_edit_Score(text)}
                className="news-btn-edit"
              >
                <Icon type="edit" />
              </Button>
            )}
            {!permissions.includes("SEND_NOTI_CLASS") ||
            data_class[0].status === "CLOSE" ? null : (
              <Button
                onClick={() => this.showModal_Noti("NOTI_STUDENT", text._id)}
                className="ant-btn btn-sort"
              >
                <Icon type="notification" />
              </Button>
            )}
          </span>
        ),
        width: "14%",
      },
    ];

    return (
      <div>
        {_class.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_CLASSALL") ? null : (
              <div className="main-content">
                <Row style={{ marginBottom: "10px" }}>
                  <Col span={24}>
                    <h2>Danh s??ch h???c vi??n</h2>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "10px" }}>
                  <Col span={24}>
                    <h3>L???p: {data_class[0] && data_class[0]._id}</h3>
                    <h3>
                      T???ng s???:{" "}
                      {data_class[0] && data_class[0].count
                        ? data_class[0].count
                        : 0}{" "}
                      h???c vi??n
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="staff-addStaff">
                    <span>
                      {!permissions.includes("IMPORT_CLASSALL") ||
                      data_class.length === 0 ||
                      data_class[0].status === "CLOSE" ? null : (
                        <label className="btn-import">
                          <input
                            type="file"
                            onChange={this.onChange_file_Import}
                            accept=".xlsx"
                            className="btn-import-listStudent"
                            onClick={(e) => (e.target.value = null)}
                          />
                          <Icon type="import" /> Import file
                        </label>
                      )}

                      {!permissions.includes("EXPORT_CLASSALL") ||
                      data_class.length === 0 ? null : (
                        <a
                          href={`${url.api_url}/cms/api/export-score-student/${id}`}
                          download
                        >
                          <Button className="btn-export">
                            <Icon type="export" />
                            Xu???t file
                          </Button>
                        </a>
                      )}

                      {!permissions.includes("SEND_NOTI_CLASS") ||
                      data_class.length === 0 ||
                      data_class[0].status === "CLOSE" ? null : (
                        <Button
                          onClick={() => this.showModal_Noti("NOTI_CLASS", "")}
                          className="btn-notification "
                        >
                          <Icon type="notification" />
                          Th??ng b??o
                        </Button>
                      )}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <SeachStudentByClass />
                  </Col>
                </Row>
                <Row>
                  <Table
                    rowKey="_id"
                    columns={columns}
                    dataSource={data_student}
                    pagination={{
                      defaultPageSize: 10,
                      showSizeChanger: true,
                      pageSizeOptions: ["10", "20", "30"],
                    }}
                    className="news-table"
                    scroll={{ x: 650 }}
                  />
                </Row>
                <Row>
                  {
                    // data_class.length < 1 ||
                    !permissions.includes("CLOSE_CLASS") ||
                    (data_class.length > 0 &&
                      data_class[0].status === "CLOSE") ? null : (
                      <Button
                        onClick={this.onCloseByIDClass}
                        className="btn-edit"
                      >
                        K???t th??c l???p h???c
                      </Button>
                    )
                  }

                  <Button onClick={this.onClose} className="btn-close">
                    Ho??n t??c
                  </Button>
                </Row>

                {this.state.view_show_model === "NOTI" ? (
                  /* -- send noti -- */
                  <SendNoti
                    wrappedComponentRef={this.saveFormRef}
                    handleSubmit_SendNoti={this.handleSubmit_SendNoti}
                    visible_modalNoti={this.state.visible_modalNoti}
                    handleCancel_Noti={this.handleCancel_Noti}
                  />
                ) : (
                  <EditScore
                    wrappedComponentRef={this.saveFormRef}
                    inforStudent={this.state.inforStudent}
                    visible_modal={this.state.visible_modal}
                    handleSubmit_EditScore={this.handleSubmit_EditScore}
                    handleCancel_edit_Score={this.handleCancel_edit_Score}
                  />
                )}
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
    _class: state._class,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListStudentByIdClass: (id) => {
      dispatch(actRequestListStudentByIdClass(id, "", true));
    },

    onImportScoreStudent: (id, formdata) => {
      dispatch(actRequestImportScoreStudent(id, formdata));
    },

    onExportScoreStudent: (id) => {
      dispatch(actRequestGetExportScoreStudent(id));
    },

    onUpDateScoreStudent: (id_student, id_class, body) => {
      dispatch(actRequestUpDateScoreStudent(id_student, id_class, body));
    },

    onSendNotiClass: (body) => {
      dispatch(actRequestSendNotiClass(body));
    },

    onInforStudentClass: (id_class, id_student, loading) => {
      dispatch(actRequestInforStudentClass(id_class, id_student, loading));
    },

    onCloseClassByid: (id_class) => {
      dispatch(actRequestCloseClassByid(id_class));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListStudentByClass));
