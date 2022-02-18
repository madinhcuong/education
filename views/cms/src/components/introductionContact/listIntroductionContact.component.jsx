import React from "react";
import { Table, Button, Icon } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { truncate } from "../../helpers/base.helper";
import Moment from "react-moment";

import { actRequestDeletePerceptions } from "../../actions/perceptions";

class ListIntroContact extends React.Component {
  render() {
    let { dataIntroContact } = this.props;

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) =>
          dataIntroContact && dataIntroContact.indexOf(record) + 1,
        width: 90,
      },
      {
        title: "Tên",
        render: (text, record) => (
          <span> {text.key === "CONTACT" ? "Liên hệ" : "Giới thiệu"}</span>
        ),
      },
      {
        title: "Mô tả",
        render: (text, record) => (
          <span>
            <div
              dangerouslySetInnerHTML={{
                __html: truncate(text.des, 50),
              }}
            />
          </span>
        ),
        width: "30%",
      },
      {
        title: "Ngày chỉnh sửa",
        dataIndex: "updatedAt",
        render: (text) => (
          <Moment format="HH:mm:ss-DD/MM/YYYY">{text.updatedAt}</Moment>
        ),
      },
      {
        title: "",
        render: (text, record) => (
          <span>
            <Link to={`/admin/thong-tin-gioi-thieu-lien-he/${text._id}`}>
              <Button className="role-bnt-viewRole btn-button">
                <Icon type="eye" />
              </Button>
            </Link>

            <Link
              to={`/admin/chinh-sua-thong-tin-gioi-thieu-lien-he/${text._id}`}
            >
              <Button className="news-btn-edit btn-button">
                <Icon type="edit" />
              </Button>
            </Link>
          </span>
        ),
      },
    ];

    return (
      <div>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={dataIntroContact && dataIntroContact}
          scroll={{ x: 790 }}
          // onChange={onChange_pagination}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onDeletePerceptions: (id) => {
      dispatch(actRequestDeletePerceptions(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListIntroContact);
