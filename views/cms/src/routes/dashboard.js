import React from "react";

import DashBoard from "../components/dashboard/dashboard";
import Topic from "../pages/topic/topic";
import NotFound from "../pages/notFound/notFound";
import Role from "../pages/role/role";
import InForUser from "../pages/inforUser/inforUser";
import AddRole from "../components/role/addRole.component";
import EditRole from "../components/role/editRole.component";
import TraiNing from "../pages/training/training";
import Staff from "../pages/staff/staff";
import Teacher from "../pages/teacher/teacher";
import InforTeacher from "../components/teachers/inforTeacher.component";
import AddTeacher from "../components/teachers/addTeacher.component";
import AddStaff from "../components/staffs/addStaff.component";
import EditStaff from "../components/staffs/editStaff.component";
import InforStaff from "../components/staffs/inforStaff.component";
import News from "../pages/news/new";
import AddNews from "../components/news/addNews.component";
import EditNews from "../components/news/editNews.component";
import InforNews from "../components/news/inforNews.component";
import InForTraining from "../pages/inforTraining/inforTraining";
import AddInforTraining from "../components/inforTraining/addInforTraining.component";
import InforTrainingComponent from "../components/inforTraining/inforTraining.component";
import EditInforTraining from "../components/inforTraining/editInforTraining.component";
import Courses from "../pages/courses/courses";
import AddCourses from "../components/courses/addCourses.component";
import InforCourses from "../components/courses/inforCourses.component";
import EditCourses from "../components/courses/editCourses.component";
import EditTeacher from "../components/teachers/editTeacher.component";
import Logs from "../pages/logs/logs";
import ClassAll from "../pages/class/classAll";
import AddClassAll from "../components/class/addClassAll.component";
import InforClassAll from "../components/class/inforClassAll.component";
import EditClassAll from "../components/class/editClassAll.component";
import StudentRegister from "../pages/studentRegister/studentRegister";
import InforStudentRegister from "../components/studentRegister/inforStudentRegister.component";
import AddStudentRegister from "../components/studentRegister/addStudentRegister.component";
import UpdateStudentRegister from "../components/studentRegister/editStudentRegister.component";
import Student from "../pages/student/student";
import InforStudentPage from "../pages/student/inforStudentPage";
import UpdateStudent from "../components/student/editStudent.component";
import ArrangeSchedule from "../components/class/arrangeSchedule.component";
import ListStudentByClass from "../components/class/listStudentByClass.component";
import ScoreCumulative from "../pages/scoreCumulative/scoreCumulative";
import InforScoreCumulative from "../components/scoreCumulative/inforScoreCumulative.component";
import PrintInvoiceStudent from "../components/studentRegister/printInvoiceStudent.component";
import UpdatePassword from "../components/inforUser/updatePass.component";
import UpdateInfor from "../components/inforUser/editInforUser.component";
import ListNotification from "../pages/notification/listNotification";
import InforStudentClass from "../components/class/inforStudentClass.component";
import Diploma from "../pages/diploma/diploma";
import InforDiploma from "../components/diploma/inforDiploma.component";
import Pay from "../pages/pay/pay";

//-- layout User
import LayoutUser from "../pages/layoutUser/layoutUser";
import Perceptions from "../pages/perceptions/perceptions";
import AddPerceptions from "../components/perceptions/addPerceptions.component";
import InforPerceptions from "../components/perceptions/inforPerceptions.component";
import EditPerceptions from "../components/perceptions/editPerceptions.component";
import IntroductionContact from "../pages/introductionContact/introductionContact";
import InforIntroContact from "../components/introductionContact/inforIntroContact.component";
import EditIntroContact from "../components/introductionContact/editIntroContact.component";

const Routes = [
  {
    path: "/admin",
    exact: true,
    main: () => <DashBoard />,
  },
  {
    path: "/admin/tin-tuc/chu-de",
    exact: false,
    main: () => <Topic />,
  },
  {
    path: "/admin/dao-tao",
    exact: false,
    main: () => <TraiNing />,
  },
  {
    path: "/admin/nhan-vien",
    exact: false,
    main: () => <Staff />,
  },
  {
    path: "/admin/them-nhan-vien",
    exact: false,
    main: ({ history }) => <AddStaff history={history} />,
  },
  {
    path: "/admin/sua-nhan-vien/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <EditStaff match={match} history={history} />
    ),
  },
  {
    path: "/admin/thong-tin-nhan-vien/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <InforStaff match={match} history={history} />
    ),
  },
  {
    path: "/admin/giao-vien",
    exact: false,
    main: () => <Teacher />,
  },
  {
    path: "/admin/thong-tin-giao-vien/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <InforTeacher match={match} history={history} />
    ),
  },
  {
    path: "/admin/them-giao-vien",
    exact: false,
    // main: () => <AddTeacher />
    main: ({ history }) => <AddTeacher history={history} />,
  },
  {
    path: "/admin/sua-giao-vien/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <EditTeacher match={match} history={history} />
    ),
  },
  {
    path: "/admin/tin-tuc/noi-dung-tin-tuc",
    exact: false,
    main: () => <News />,
  },
  {
    path: "/admin/tin-tuc/them-noi-dung-tin-tuc",
    exact: false,
    main: ({ history }) => <AddNews history={history} />,
  },
  {
    path: "/admin/tin-tuc/xem-noi-dung-tin-tuc/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <InforNews match={match} history={history} />
    ),
  },
  {
    path: "/admin/tin-tuc/sua-noi-dung-tin-tuc/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <EditNews match={match} history={history} />
    ),
  },
  {
    path: "/admin/thong-tin-nguoi-dung",
    exact: false,
    main: () => <InForUser />,
  },
  {
    path: "/admin/thay-doi-mat-khau",
    exact: false,
    main: ({ match }, { history }) => (
      <UpdatePassword match={match} history={history} />
    ),
  },
  {
    path: "/admin/sua-thong-tin-nguoi-dung",
    exact: false,
    main: ({ match }, { history }) => (
      <UpdateInfor match={match} history={history} />
    ),
  },
  {
    path: "/admin/khoa-hoc",
    exact: false,
    main: () => <Courses />,
  },
  {
    path: "/admin/them-khoa-hoc",
    exact: false,
    main: ({ history }) => <AddCourses history={history} />,
  },
  {
    path: "/admin/xem-khoa-hoc/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <InforCourses match={match} history={history} />
    ),
  },
  {
    path: "/admin/sua-khoa-hoc/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <EditCourses match={match} history={history} />
    ),
  },
  {
    path: "/admin/thong-tin-khoa-hoc",
    exact: false,
    main: () => <InForTraining />,
  },
  {
    path: "/admin/xem-thong-tin-khoa-hoc/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <InforTrainingComponent match={match} history={history} />
    ),
  },
  {
    path: "/admin/them-thong-tin-khoa-hoc",
    exact: false,
    main: ({ history }) => <AddInforTraining history={history} />,
  },
  {
    path: "/admin/sua-thong-tin-khoa-hoc/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <EditInforTraining match={match} history={history} />
    ),
  },
  {
    path: "/admin/phan-quyen",
    exact: false,
    main: () => <Role />,
  },
  {
    path: "/admin/them-phan-quyen",
    exact: false,
    main: ({ history }) => <AddRole history={history} />,
  },
  {
    path: "/admin/xem-phan-quyen/:id",
    exact: false,
    main: ({ match }) => <EditRole match={match} />,
  },
  {
    path: "/admin/lop-hoc",
    exact: false,
    main: () => <ClassAll />,
  },
  {
    path: "/admin/them-lop-hoc",
    exact: false,
    main: ({ history }) => <AddClassAll history={history} />,
  },
  {
    path: "/admin/xem-thong-tin-lop-hoc/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <InforClassAll match={match} history={history} />
    ),
  },
  {
    path: "/admin/sua-thong-tin-lop-hoc/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <EditClassAll match={match} history={history} />
    ),
  },
  {
    path: "/admin/sap-xep-lich-giang-day/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <ArrangeSchedule match={match} history={history} />
    ),
  },
  {
    path: "/admin/thong-tin-hoc-vien-lop-hoc/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <InforStudentClass match={match} history={history} />
    ),
  },
  {
    path: "/admin/danh-sach-hoc-vien/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <ListStudentByClass match={match} history={history} />
    ),
  },
  {
    path: "/admin/hoc-vien/hoc-vien-dang-ky-hoc",
    exact: false,
    main: () => <StudentRegister />,
  },
  {
    path: "/admin/hoc-vien/sua-hoc-vien/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <UpdateStudentRegister match={match} history={history} />
    ),
  },
  {
    path: "/admin/hoc-vien/hoa-don/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <PrintInvoiceStudent match={match} history={history} />
    ),
  },

  {
    path: "/admin/thong-tin-hoc-vien/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <InforStudentRegister match={match} history={history} />
    ),
  },
  {
    path: "/admin/them-hoc-vien",
    exact: false,
    main: ({ history }) => <AddStudentRegister history={history} />,
  },
  {
    path: "/admin/hoc-vien/danh-sach-hoc-vien",
    exact: false,
    main: () => <Student />,
  },
  {
    path: "/admin/xem-thong-tin-hoc-vien/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <InforStudentPage match={match} history={history} />
    ),
  },
  {
    path: "/admin/sua-thong-tin-hoc-vien/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <UpdateStudent match={match} history={history} />
    ),
  },
  {
    path: "/admin/danh-sach-diem",
    exact: false,
    main: () => <ScoreCumulative />,
  },
  {
    path: "/admin/thong-tin-diem-tich-luy/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <InforScoreCumulative match={match} history={history} />
    ),
  },
  {
    path: "/admin/chung-chi",
    exact: false,
    main: () => <Diploma />,
  },
  {
    path: "/admin/thong-tin-chung-chi/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <InforDiploma match={match} history={history} />
    ),
  },
  {
    path: "/admin/thanh-toan-tien",
    exact: false,
    main: () => <Pay />,
  },
  {
    path: "/admin/thong-bao",
    exact: false,
    main: ({ match }, { history }) => (
      <ListNotification match={match} history={history} />
    ),
  },

  //-- Layput User
  {
    path: "/admin/giao-dien-nguoi-dung/quang-cao",
    exact: false,
    main: () => <LayoutUser />,
  },
  {
    path: "/admin/giao-dien-nguoi-dung/cam-nhan-hoc-vien",
    exact: false,
    main: () => <Perceptions />,
  },
  {
    path: "/admin/them-cam-nhan-hoc-vien",
    exact: false,
    main: ({ history }) => <AddPerceptions history={history} />,
  },
  {
    path: "/admin/thong-tin-cam-nhan-hoc-vien/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <InforPerceptions match={match} history={history} />
    ),
  },
  {
    path: "/admin/sua-cam-nhan-hoc-vien/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <EditPerceptions match={match} history={history} />
    ),
  },
  {
    path: "/admin/giao-dien-nguoi-dung/gioi-thieu-va-lien-he",
    exact: false,
    main: () => <IntroductionContact />,
  },
  {
    path: "/admin/thong-tin-gioi-thieu-lien-he/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <InforIntroContact match={match} history={history} />
    ),
  },
  {
    path: "/admin/chinh-sua-thong-tin-gioi-thieu-lien-he/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <EditIntroContact match={match} history={history} />
    ),
  },

  //-- end Layput User
  {
    path: "/admin/lich-su",
    exact: false,
    main: () => <Logs />,
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />,
  },
];

export default Routes;
