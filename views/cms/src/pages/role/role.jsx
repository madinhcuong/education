import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";
import Loading from "../loading/loading";
import { actRequestListRole } from "../../actions/role.action";

import SeachRole from "../../components/role/seachRole.component";
import ListRole from "../../components/role/listRole.component";
class Role extends React.Component {
  componentDidMount() {
    this.props.onListRole("");
  }
  render() {
    let { inforAdmin, role } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    return (
      <div>
        {role.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_ADMINROLE") ? null : (
              <div>
                <Row>
                  <Col span={24} className="seach-main-content">
                    <SeachRole />
                  </Col>
                </Row>
                <Row className="staff-table main-content">
                  <Row className="title-main-content">
                    <Col span={12}>
                      <h2>Danh sách bộ quyền</h2>
                    </Col>
                    <Col span={12} className="staff-addStaff">
                      {!permissions.includes("CREATE_ADMINROLE") ? null : (
                        <Button className="btn-add-new">
                          <Link to="/admin/them-phan-quyen">Tạo mới</Link>
                        </Button>
                      )}
                    </Col>
                  </Row>
                  <ListRole
                    ListRole={role.list_role.length > 0 ? role.list_role : []}
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
    role: state.role,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListRole: (seach_name) => {
      dispatch(actRequestListRole(seach_name, true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Role);
