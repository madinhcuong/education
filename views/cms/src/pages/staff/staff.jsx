import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";
import { actRequestListStaff } from "../../actions/staff.action";
import Loading from "../loading/loading";

import SeachStaff from "../../components/staffs/seachStaff.component";
import ListStaff from "../../components/staffs/listStaff.component";

class Staff extends React.Component {
  componentDidMount() {
    this.props.onListStaff("", "", "", true);
  }

  render() {
    let { inforAdmin, staff } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    return (
      <div>
        {staff.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_ADMIN") ? null : (
              <div>
                <Row>
                  <Col span={24} className="seach-main-content">
                    <SeachStaff />
                  </Col>
                </Row>
                <Row className="staff-table main-content">
                  <Row className="title-main-content">
                    <Col span={12}>
                      <h2>Danh sách nhân viên</h2>
                    </Col>
                    <Col span={12} className="staff-addStaff">
                      {!permissions.includes("CREATE_ADMIN") ? null : (
                        <Link to="/admin/them-nhan-vien">
                          <Button className="btn-add-new">Tạo mới</Button>
                        </Link>
                      )}
                    </Col>
                  </Row>
                  <ListStaff onListStaff={staff.list_Staff} />
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
    staff: state.staff,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListStaff: (seach_name, seach_email, seach_status, loading) => {
      dispatch(
        actRequestListStaff(seach_name, seach_email, seach_status, loading)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Staff);
