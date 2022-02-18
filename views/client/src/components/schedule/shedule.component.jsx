import React from "react";
import { withRouter } from "react-router-dom";
import { Descriptions, Row, Col, Empty } from "antd";
import { switch_th } from "../../helpers/base.helper";

class ScheduleComponent extends React.Component {
  render() {
    let { _class } = this.props;

    function arr_timeWeek(data) {
      if (data.length > 0) {
        return data.map((item, key) => {
          return (
            <div key={key}>
              {`${switch_th(item.th)} (${item.hour_start} - ${item.hour_end}) `}
            </div>
          );
        });
      }
    }

    let arr_scheduleClass = null;
    if (_class.length > 0) {
      arr_scheduleClass = _class.map((item, key) => {
        return (
          <Col span={22} offset={1} className="schedule-col" key={key}>
            <div className="schedule-courses">
              Khóa học: {item.id_Courses && item.id_Courses.name}
            </div>
            <Descriptions
              column={{ xs: 1, sm: 4, md: 4, lg: 4 }}
              layout="vertical"
              bordered
            >
              <Descriptions.Item label="Lớp">
                {item.name && item.name}
              </Descriptions.Item>
              <Descriptions.Item label="Giáo viên">
                {item.id_teacher && item.id_teacher.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Thời gian">
                {arr_timeWeek(item.time_day)}
              </Descriptions.Item>
              <Descriptions.Item label="Thời lượng">
                {`${item.time_start && item.time_start} - ${item.time_end &&
                  item.time_end}`}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        );
      });
    }

    return (
      <div>
        <Row className="schedule-row">
          {arr_scheduleClass === null || arr_scheduleClass.length < 1 ? (
            <Empty style={{ margin: "20px 0px 20px 0px" }} />
          ) : (
            arr_scheduleClass
          )}
        </Row>
      </div>
    );
  }
}

export default withRouter(ScheduleComponent);
