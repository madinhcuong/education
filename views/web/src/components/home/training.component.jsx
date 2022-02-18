import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as url from "../../utils/url_api";
import "../../assets/css/training.css";

class Training extends React.Component {
  render() {
    let { training } = this.props;

    let list_training = null;
    if (training.dataTraining.length > 0) {
      list_training = training.dataTraining.map((item, key) => {
        return (
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 outer_box"
            key={key}
          >
            <Link to={`/dao-tao/${item._id}`}>
              <div className="box">
                <span className="icon-cont">
                  <img
                    src={`${url.api_url}/${item.image}`}
                    alt={`${item.image}`}
                  />
                </span>
                <h2 className="title-training">{item.name}</h2>
              </div>
            </Link>
          </div>
        );
      });
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-training title-content">
              <h3 className="col-training-title">Chương trình đào tạo</h3>
              <p className="col-training-thanh"></p>
              <p className="sub-title">
                Chương trình học đa dạng và thường xuyên cập nhật công nghệ mới.
                <br></br>
                Hãy để chúng tôi đồng hành cùng bạn trên hành trình chinh phục
                tri thức - vững vàng bước vào thế giới công nghệ 4.0.
              </p>
            </div>
          </div>
        </div>
        {/* ---------- */}
        <div className="container-fluid intro_course">
          <div className="_training-content">{list_training}</div>
        </div>

        {/* ----------- */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // training: state.training
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    // onListTraining: () => {
    //   dispatch(actRequestListTraining(true));
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Training);

/* <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 outer_box">
<div className="box">
  <a href="true">
    <span className="icon-cont">
      <img src={tn2} alt="logo" />
    </span>
    <h2 className="title-training">Lập trình di động</h2>
  </a>
</div>
</div>
<div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 outer_box">
<div className="box">
  <a href="true">
    <span className="icon-cont">
      <img src={logo} alt="logo" />
    </span>
    <h2 className="title-training">Chuyên gia lập trình</h2>
  </a>
</div>
</div>
<div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 outer_box">
<div className="box">
  <a href="true">
    <span className="icon-cont">
      <img src={logo} alt="logo" />
    </span>
    <h2 className="title-training">Chuyên gia lập trình</h2>
  </a>
</div>
</div>
<div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 outer_box">
<div className="box">
  <a href="true">
    <span className="icon-cont">
      <img src={logo} alt="logo" />
    </span>
    <h2 className="title-training">Chuyên gia lập trình</h2>
  </a>
</div>
</div>
<div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 outer_box">
<div className="box">
  <a href="true">
    <span className="icon-cont">
      <img src={logo} alt="logo" />
    </span>
    <h2 className="title-training">Chuyên gia lập trình</h2>
  </a>
</div>
</div>
<div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 outer_box">
<div className="box">
  <a href="true">
    <span className="icon-cont">
      <img src={logo} alt="logo" />
    </span>
    <h2 className="title-training">Chuyên gia lập trình</h2>
  </a>
</div>
</div>
<div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 outer_box">
<div className="box">
  <a href="true">
    <span className="icon-cont">
      <img src={logo} alt="logo" />
    </span>
    <h2 className="title-training">Chuyên gia lập trình</h2>
  </a>
</div>
</div> */
