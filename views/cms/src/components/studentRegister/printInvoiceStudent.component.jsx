import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../assets/img/logo.png";
import { Row, Col } from "antd";
import Loading from "../../pages/loading/loading";
import { formatNumber } from "../../helpers/base.helper";
import Moment from "react-moment";

class InvoiceStudent extends React.Component {
  render() {
    let { studentRegister } = this.props;

    const date = new Date();

    return (
      <div className="invoice-box">
        <Row>
          <Col span={14}>
            <div className="invoice-logo">
              <img src={logo} alt="logo" />
              <span>Trí Nguyễn</span>
            </div>
            <div className="invoice-address">
              <span className="invoice-address-tt">Địa chỉ: </span>
              <span>A16/23 Lê Văn Sỹ, P.Tây Thạnh, Q.Phú Nhuận, TPHCM </span>
            </div>
            <div className="invoice-address">
              <span className="invoice-address-tt"> Tel: </span>
              <span>0832-668-668</span>
            </div>
          </Col>
          <Col span={10} className="invoice-TT">
            <p className="invoice-address-tt">Mẫu số 02-TT</p>
            <p>Ban hành theo Thông tư số 133/2017-TT</p>
            <p>Ngày 12/02/2017 của Bộ Tài Chính</p>
          </Col>
        </Row>
        <Row style={{ textAlign: "center" }}>
          <Col span={24} className="invoice-title">
            <div>
              <p>PHIẾU THU</p>
            </div>
            <span>
              (<Moment format="HH:mm - DD/MM/YYYY">{date}</Moment>)
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="invoice-infor">
            <div>
              <span>Họ và tên: </span>{" "}
              <span className="invoice-infor-tt">
                {studentRegister.studentRegisterById.id_student &&
                  studentRegister.studentRegisterById.id_student.name}
              </span>
            </div>
            <div>
              <span>Ngày sinh: </span>{" "}
              <span className="invoice-infor-tt">
                {studentRegister.studentRegisterById.id_student &&
                  studentRegister.studentRegisterById.id_student.date}
              </span>
            </div>
            <div>
              <span>Địa chỉ: </span>{" "}
              <span className="invoice-infor-tt">
                {studentRegister.studentRegisterById.id_student &&
                  studentRegister.studentRegisterById.id_student.address}
              </span>
            </div>
            <div>
              <span>Nội dung: </span>{" "}
              <span className="invoice-infor-tt">
                {studentRegister.studentRegisterById.id_Class &&
                  studentRegister.studentRegisterById.id_Class.name}
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="invoice-table">
            <table>
              <thead>
                <tr className="heading">
                  <td>Lớp học</td>
                  <td>Học phí</td>
                </tr>
              </thead>
              <tbody>
                <tr className="item">
                  <td>
                    {studentRegister.studentRegisterById.id_Class &&
                      studentRegister.studentRegisterById.id_Class.name}
                  </td>
                  <td>
                    {formatNumber(
                      studentRegister.studentRegisterById.tuition_Fees &&
                        studentRegister.studentRegisterById.tuition_Fees
                        ? studentRegister.studentRegisterById.tuition_Fees
                        : 0
                    )}
                    vnđ
                  </td>
                </tr>
                <tr className="total">
                  <td></td>
                  <td>
                    Giảm giá:{" "}
                    {formatNumber(
                      studentRegister.studentRegisterById &&
                        studentRegister.studentRegisterById.sale_percent
                        ? studentRegister.studentRegisterById.sale_percent
                        : 0
                    )}
                    %
                  </td>
                </tr>
                <tr className="total">
                  <td></td>
                  <td>
                    Tổng số tiền:{" "}
                    {formatNumber(
                      studentRegister.studentRegisterById &&
                        studentRegister.studentRegisterById
                          .tuition_Fees_discount
                        ? studentRegister.studentRegisterById
                            .tuition_Fees_discount
                        : 0
                    )}{" "}
                    vnđ
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="invoice-sign">
          <Col span={12} className="invoice-user-payment">
            <div>Người nộp tiền</div>
            <span>(Ký, họ tên)</span>
          </Col>
          <Col span={12} className="invoice-user-payment">
            <div>Người thu tiền</div>
            <span>(Ký, họ tên)</span>
          </Col>
        </Row>
      </div>
    );
  }
}

class PrintInvoiceStudent extends React.Component {
  render() {
    let { studentRegister } = this.props;

    return (
      <div>
        {studentRegister.success ? (
          <Loading />
        ) : (
          <div>
            <InvoiceStudent studentRegister={studentRegister} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforAdmin: state.inforAdmin,
    studentRegister: state.studentRegister,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PrintInvoiceStudent));
