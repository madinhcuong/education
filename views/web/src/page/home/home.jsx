import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import Loading from "../loading/loading";
import { actRequestListTraining } from "../../actions/training.action";
import {
  actRequestGetListNewsHome,
  actRequestGetListSliderNewsHome,
} from "../../actions/news.action";
import { actRequestGetListTeacherHome } from "../../actions/teacher.action";
import { actRequestGetListCarousel } from "../../actions/carousel.action";
import { actRequestGetListPerceptions } from "../../actions/perceptions.action";

import Training from "../../components/home/training.component";
import CarouselImage from "../../components/home/carousel.component";
import News from "../../components/home/news.component";
import Teacher from "../../components/home/teacher.component";
import Student from "../../components/home/student.component";
import Report from "../../components/reports/report.component";
//import Covid19 from "../../components/home/covid19.component";

class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.onListTraining();
    this.props.onGetListNewsHome();
    this.props.onGetListTeacherHome();
    this.props.onGetListSliderNewsHome();
    this.props.onGetListCarousel();
    this.props.onGetListPerceptions();
  }

  render() {
    let { training, news, teacher, carousel, perceptions } = this.props;

    return (
      <div>
        {training.loading &&
        news.loading &&
        teacher.loading &&
        carousel.loading &&
        perceptions.loading ? (
          <Row>
            <Col span={24}>
              <Loading />
            </Col>
          </Row>
        ) : (
          <div>
            <CarouselImage
              carousel={
                carousel.listCarousel.length > 0 ? carousel.listCarousel : []
              }
            />
            <Training training={training} />
            <News news={news.dataNews.length > 0 ? news.dataNews : []} />
            <Teacher
              data_teacher={
                teacher.dataTeacher.length > 0 ? teacher.dataTeacher : []
              }
            />
            <Student
              listPerceptions={
                perceptions.listPerceptions.length > 0
                  ? perceptions.listPerceptions
                  : []
              }
            />
            <Report />
          </div>
        )}
        {/* <Covid19 /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    training: state.training,
    news: state.news,
    teacher: state.teacher,
    carousel: state.carousel,
    perceptions: state.perceptions,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListTraining: () => {
      dispatch(actRequestListTraining(true));
    },
    onGetListNewsHome: () => {
      dispatch(actRequestGetListNewsHome(true));
    },
    onGetListTeacherHome: () => {
      dispatch(actRequestGetListTeacherHome(true));
    },
    onGetListSliderNewsHome: () => {
      dispatch(actRequestGetListSliderNewsHome(true));
    },
    onGetListCarousel: () => {
      dispatch(actRequestGetListCarousel(true));
    },
    onGetListPerceptions: () => {
      dispatch(actRequestGetListPerceptions(true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
