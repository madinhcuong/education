const { _extend } = require("util");
const bcrypt = require("bcrypt");
const moment = require("moment");
const nodemailer = require("nodemailer");
const {
  teamplate_send_mailCourses,
} = require("../../helpers/template_sendMailCourses");
const { transporter_config } = require("../../config/nodemailer.config");
const {
  responseOk,
  responseError,
  savelogs,
} = require("../../helpers/_base_helpers");
const { createNotification } = require("../../helpers/notification.helpers");
const { check_time_discount } = require("../../helpers/check_time.helpers");
const setting = require("../../helpers/setting.helpers");

const registeredLearn_model = require("../../models/registeredLearn.model");
const student_model = require("../../models/student.model");
const debit_model = require("../../models/debit.model");
const statistic_model = require("../../models/statistic.model");
const courses_model = require("../../models/courses.model");
const class_model = require("../../models/class.model");
const paymentHistory_model = require("../../models/paymentHistory.model");

let transporter = nodemailer.createTransport(transporter_config);
class registeredLearn {
  async GetListStudentsRegisterLear(req, res) {
    try {
      let seach_name_student = req.query.name;
      let seach_name_email = req.query.email;
      let seach_name_class = req.query.class;
      let timeStart = req.query.timeStart;
      let timeEnd = req.query.timeEnd;
      if (
        !seach_name_student ||
        seach_name_student == null ||
        seach_name_student == undefined ||
        seach_name_student == ""
      )
        seach_name_student = "";

      if (
        !seach_name_email ||
        seach_name_email == null ||
        seach_name_email == undefined ||
        seach_name_email == ""
      )
        seach_name_email = "";

      if (
        !seach_name_class ||
        seach_name_class == null ||
        seach_name_class == undefined ||
        seach_name_class == ""
      )
        seach_name_class = "";

      if (
        !timeStart ||
        timeStart == null ||
        timeStart == undefined ||
        timeStart == ""
      )
        timeStart = "";

      if (!timeEnd || timeEnd == null || timeEnd == undefined || timeEnd == "")
        timeEnd = "";

      let query_data = [
        {
          $lookup: {
            from: "students",
            let: { id_student: "$id_student" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$id_student"] },
                  name: {
                    $regex: seach_name_student,
                    $options: "$i",
                  },
                  email: {
                    $regex: seach_name_email,
                    $options: "$i",
                  },
                },
              },
              { $project: { name: 1, date: 1, sex: 1, email: 1, phone: 1 } },
            ],
            as: "id_student",
          },
        },
        {
          $unwind: "$id_student",
        },
        {
          $lookup: {
            from: "classes",
            let: { id_Class: "$id_Class" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$id_Class"] },
                  name: {
                    $regex: seach_name_class,
                    $options: "$i",
                  },
                },
              },
              { $project: { name: 1, id_Courses: 1 } },
            ],
            as: "id_Class",
          },
        },
        {
          $unwind: "$id_Class",
        },
        {
          $project: {
            id_Class: 1,
            id_student: 1,
            tuition_Fees_discount: 1,
            payment_status: 1,
            check_invoice: 1,
            payment_method: 1,
            createdAt: 1,
          },
        },
        {
          $unwind: "$id_student",
        },
        {
          $unwind: { path: "$id_student", preserveNullAndEmptyArrays: true },
        },
        {
          $unwind: "$id_Class",
        },
        {
          $unwind: { path: "$id_Class", preserveNullAndEmptyArrays: true },
        },
        { $sort: { createdAt: -1 } },
      ];

      if (timeStart && timeEnd) {
        query_data.unshift({
          $match: {
            payment_date: {
              $gte: new Date(`${timeStart}T00:00:00`),
              $lt: new Date(`${timeEnd}T23:59:59`),
            },
          },
        });
      }

      let data_student = [];
      data_student = await registeredLearn_model.aggregate(query_data);

      return responseOk(res, data_student);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async GetStudentRegisterById(req, res) {
    try {
      let id_register = req.params.id;

      let data_register = await registeredLearn_model
        .findById(id_register)
        .populate([
          {
            path: "id_Class id_student",
            select:
              "name name image date phone sex address email agent_code your_agent",
          },
        ])
        .select(
          " id_Class id_student payment_status payment_date createdAt sale_percent tuition_Fees tuition_Fees_discount"
        );
      if (!data_register)
        return responseError(res, 400, 48, "REGISTER_LEARN_NOT_FOUND");

      return responseOk(res, data_register);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async UpdatePaymentStatus(req, res) {
    try {
      let body = _extend({}, req.body);
      let id_register = req.params.id;

      if (body.payment_status != "APPROVED")
        return responseError(res, 400, 48, "REGISTER_LEARN_NOT_FOUND");

      // thay ?????i status
      let data_register = await registeredLearn_model
        .findByIdAndUpdate(
          id_register,
          {
            payment_status: body.payment_status,
            payment_date: new Date(),
          },
          { new: true }
        )
        .populate([
          {
            path: "id_student id_Class",
            populate: {
              path: "id_debit",
              select: "wallet tuition_Fees",
            },
            select: "id_debit agent_code date email your_agent name",
          },
        ])
        .select(
          "id_student payment_date payment_status tuition_Fees_discount tuition_Fees new_regis"
        );
      if (!data_register)
        return responseError(res, 400, 48, "REGISTER_LEARN_NOT_FOUND");

      // C???ng ti???n t???ng doanh thu ????ng k?? H???c
      let data_statistic = await statistic_model
        .findOne()
        .select("total_money total_money_cost");

      // thu
      let total_money_statistics = 0;
      // chi
      let total_money_cost = 0;
      if (data_statistic) {
        total_money_statistics =
          data_statistic.total_money + data_register.tuition_Fees_discount;
        // total_money_cost = data_statistic.total_money_cost;
      }

      let data_student = await student_model.findByIdAndUpdate(
        data_register.id_student._id,
        {
          check_learn: true,
        }
      );
      if (!data_student)
        return responseError(res, 400, 44, "STUDENT_NOT_FOUND");

      // G???i noti cho user v???a n???p ti???n
      let idUser = data_register.id_student._id;
      let title = "N???p ti???n h???c";
      let description = `B???n ???? n???p ti???n h???c l???p ${data_register.id_Class.name} th??nh c??ng`;
      let data = data_register;
      let type = "CLIENT";
      let type_noti = "MONEY_LEARN";
      let result = await createNotification(
        idUser,
        title,
        description,
        data,
        type,
        type_noti
      );
      if (result) {
        io.sockets.in(idUser).emit("GET_LIST_NOTI", description);
      }

      // C???ng ??i???m v?? hoa h???ng ng?????i gi???i thi???u F1
      let data_F1 = {};
      if (
        data_register.id_student.agent_code &&
        data_register.id_student.agent_code != ""
      ) {
        data_F1 = await student_model
          .findOne({
            your_agent: data_register.id_student.agent_code,
          })
          .populate([
            {
              path: "id_debit",
              select: "wallet money level",
            },
          ])
          .select("id_debit agent_code");

        if (data_F1 && data_F1.id_debit) {
          // t??nh ??i???m F1 v?? l???y ph???n nguy??n
          let total_scores_F1 = 0;
          // check ng?????i mk gi???i thi???u ????ng k?? m???i or ???? c?? account
          if (data_register.new_regis == "NOACCOUNT") {
            total_scores_F1 = Math.floor(
              data_register.tuition_Fees * setting.score_F1
            );
          }

          // t??nh hoa h???ng F1
          let total_rose_F1 = data_register.tuition_Fees * setting.rose_F1;

          // t???ng ??i???m sau khi ???????c c???ng
          let wallet_after_F1 = data_F1.id_debit.wallet + total_scores_F1;

          // Check th??ng h???ng
          let check_addition_score_level = await setting.addition_score_level_wallet(
            data_F1.id_debit.level,
            wallet_after_F1
          );

          // n???u ????? ??i??m th?? c???ng, ch??? c???ng 1 l???n ?????u
          if (check_addition_score_level.addition) {
            wallet_after_F1 =
              wallet_after_F1 + check_addition_score_level.score_addition;
          }

          // data update debit F1
          let updateDebit_F1 = {
            wallet: wallet_after_F1,
            money: data_F1.id_debit.money + total_rose_F1,
          };

          // check tr??n 500 ??i???m ???????c ?????i ti???n
          //  if (wallet_after_F1 >= setting.on_Score) check_money_F1 = true;
          if (wallet_after_F1 >= setting.on_Score) {
            updateDebit_F1 = {
              ...updateDebit_F1,
              check_money: true,
              level: check_addition_score_level.level,
            };
          }

          // C???ng ti???n v?? ??i???m F1
          let debit_F1 = await debit_model.findByIdAndUpdate(
            data_F1.id_debit._id,
            updateDebit_F1
          );

          // L??u log tinh chi ti??u
          let data_paymentHistory_rose = await new paymentHistory_model({
            id_student: data_F1._id,
            type: "ROSE_MONEY",
            money: total_rose_F1,
            money_before: data_F1.id_debit.money,
            money_after: data_F1.id_debit.money + total_rose_F1,
          }).save();

          // T???ng chi
          //   total_money_cost = total_money_cost + total_rose_F1;

          // G???i noti cho user ???????c c???ng ??i???m v?? ti???n hoa h???ng F1
          let idUser = data_F1._id;
          let title =
            data_register.new_regis == "NOACCOUNT"
              ? "C???ng ??i???m v?? ti???n hoa h???ng"
              : "Ti???n hoa h???ng";
          let description =
            data_register.new_regis == "NOACCOUNT"
              ? `${data_register.id_student.name} v???a n???p ti???n h???c. B???n ???????c c???ng ${total_scores_F1} ??i???m v?? ???????c c???ng ${total_rose_F1} vn?? ti???n hoa h???ng`
              : `${data_register.id_student.name} v???a n???p ti???n h???c. B???n ???????c c???ng ${total_rose_F1} vn?? ti???n hoa h???ng`;
          let data = { ...{ data_register }, agent: "F1" };
          let type = "CLIENT";
          let type_noti =
            data_register.new_regis == "NOACCOUNT"
              ? "ROSE_AND_SCORE"
              : "ROSE_LEARN";
          let result = await createNotification(
            idUser,
            title,
            description,
            data,
            type,
            type_noti
          );
          if (result) {
            io.sockets.in(idUser).emit("GET_LIST_NOTI", description);
          }

          // send noti th??ng h???ng
          if (check_addition_score_level.addition) {
            let idUser = data_F1._id;
            let title = `Th??ng h???ng`;
            let description = `Ch??c m???ng b???n ???? ???????c th??ng h???ng ${check_addition_score_level.title}. B???n ???????c c???ng ${check_addition_score_level.score_addition} ??i???m`;
            let data = { ...{ data_register }, agent: "F1" };
            let type = "CLIENT";
            let type_noti = "ADDITION_SCORE_LEVEL";
            let result = await createNotification(
              idUser,
              title,
              description,
              data,
              type,
              type_noti
            );
            if (result) {
              io.sockets.in(idUser).emit("GET_LIST_NOTI", description);
            }
          }
        }
      }

      if (data_F1 && data_F1.agent_code) {
        let data_F2 = await student_model
          .findOne({
            your_agent: data_F1.agent_code,
          })
          .populate([
            {
              path: "id_debit",
              select: "wallet money level",
            },
          ])
          .select("id_debit");

        if (data_F2 && data_F2.id_debit) {
          // t??nh ??i???m F2 v?? l???y ph???n nguy??n

          let total_scores_F2 = 0;
          if (data_register.new_regis == "NOACCOUNT") {
            total_scores_F2 = Math.floor(
              data_register.tuition_Fees * setting.score_F2
            );
          }

          // t??nh hoa h???ng F2
          let total_rose_F2 = data_register.tuition_Fees * setting.rose_F2;

          // t???ng ??i???m sau khi ???????c c???ng
          let wallet_after_F2 = data_F2.id_debit.wallet + total_scores_F2;

          // Check th??ng h???ng
          let check_addition_score_level_F2 = await setting.addition_score_level_wallet(
            data_F2.id_debit.level,
            wallet_after_F2
          );

          // n???u ????? ??i??m th?? c???ng, ch??? c???ng 1 l???n ?????u
          if (check_addition_score_level_F2.addition) {
            wallet_after_F2 =
              wallet_after_F2 + check_addition_score_level_F2.score_addition;
          }

          // data update debit F2
          let updateDebit_F2 = {
            wallet: wallet_after_F2,
            money: data_F2.id_debit.money + total_rose_F2,
          };

          // check tr??n 500 ??i???m ???????c ?????i ti???n
          if (wallet_after_F2 >= setting.on_Score) {
            updateDebit_F2 = {
              ...updateDebit_F2,
              check_money: true,
              level: check_addition_score_level_F2.level,
            };
          }

          // C???ng ti???n v?? ??i???m F2
          let debit_F2 = await debit_model.findByIdAndUpdate(
            data_F2.id_debit._id,
            updateDebit_F2
          );

          // L??u log tinh chi ti??u
          let data_paymentHistory_rose = await new paymentHistory_model({
            id_student: data_F2._id,
            type: "ROSE_MONEY",
            money: total_rose_F2,
            money_before: data_F2.id_debit.money,
            money_after: data_F2.id_debit.money + total_rose_F2,
          }).save();

          // T???ng chi
          //  total_money_cost = total_money_cost + total_rose_F2;

          // G???i noti cho user ???????c c???ng ??i???m v?? ti???n hoa h???ng F2
          let idUser = data_F2._id;
          let title =
            data_register.new_regis == "NOACCOUNT"
              ? "C???ng ??i???m v?? ti???n hoa h???ng"
              : "Ti???n hoa h???ng";
          let description =
            data_register.new_regis == "NOACCOUNT"
              ? `${data_register.id_student.name} v???a n???p ti???n h???c. B???n ???????c c???ng ${total_scores_F2} ??i???m v?? ???????c c???ng ${total_rose_F2} vn?? ti???n hoa h???ng`
              : `${data_register.id_student.name} v???a n???p ti???n h???c. B???n ???????c c???ng ${total_rose_F2} vn?? ti???n hoa h???ng`;
          let data = { ...{ data_register }, agent: "F2" };
          let type = "CLIENT";
          let type_noti =
            data_register.new_regis == "NOACCOUNT"
              ? "ROSE_AND_SCORE"
              : "ROSE_LEARN";
          let result = await createNotification(
            idUser,
            title,
            description,
            data,
            type,
            type_noti
          );
          if (result) {
            io.sockets.in(idUser).emit("GET_LIST_NOTI", description);
          }

          // send noti th??ng h???ng
          if (check_addition_score_level_F2.addition) {
            let idUser = data_F2._id;
            let title = `Th??ng h???ng`;
            let description = `Ch??c m???ng b???n ???? ???????c th??ng h???ng ${check_addition_score_level_F2.title}. B???n ???????c c???ng ${check_addition_score_level_F2.score_addition} ??i???m`;
            let data = { ...{ data_register }, agent: "F2" };
            let type = "CLIENT";
            let type_noti = "ADDITION_SCORE_LEVEL";
            let result = await createNotification(
              idUser,
              title,
              description,
              data,
              type,
              type_noti
            );
            if (result) {
              io.sockets.in(idUser).emit("GET_LIST_NOTI", description);
            }
          }
        }
      }

      // l??u th???ng k??
      if (data_statistic) {
        let update_total_money = await statistic_model.findByIdAndUpdate(
          data_statistic._id,
          {
            total_money: total_money_statistics,
            // total_money_cost: total_money_cost,
          },
          { new: true }
        );
      }

      savelogs(req.authenticatedAdmin._id, "UPDATE", "H???c vi??n n???p ti???n h???c");

      // --- send mail dk success
      let name_class = data_register.id_Class.name;
      let money_class = data_register.tuition_Fees_discount;

      let desc = `L???p: ${name_class} - H???c ph??: ${money_class}vn?? - Th???i gian: ${moment(
        data_register.payment_date
      ).format("HH:mm-DD/MM/YYYY")}`;

      let url_backend = "http://localhost:9000";
      if (process.env.NODE_ENV == "production") {
        url_backend = "http://tringuyeneducation.xyz";
      }

      let hostName = ` ${url_backend}/client`;
      let emial_send = data_register.id_student.email;
      let pass_send = data_register.id_student.date;
      let account = `T??i kho???n: ${emial_send} - M???t kh???u: ${pass_send}`;

      await transporter.verify((error, success) => {
        if (!error) {
          let html = teamplate_send_mailCourses(
            desc,
            hostName,
            account,
            emial_send
          );
          transporter.sendMail(html, async (error, body) => {
            if (error) {
              console.log("error", error);
            }
          });
        }
      });
      // --- End send mail dk success

      return responseOk(res, "UPDATE_SUCCESS");
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async UpdateStudentRegister(req, res) {
    try {
      let body = _extend({}, req.body);
      let id_register = req.params.id;

      let data_register = await registeredLearn_model
        .findById(id_register)
        .populate([{ path: "id_student", select: "email" }])
        .select("id_student id_Class");
      if (!data_register)
        return responseError(res, 400, 48, "REGISTER_LEARN_NOT_FOUND");

      if (body.email || body.id_Class) {
        let check_email = await student_model
          .findOne({ email: body.email })
          .select("name");

        let body_class = "";
        let body_student = data_register.id_student._id;
        if (body.email) {
          body_class = data_register.id_Class;
          body_student = check_email
            ? check_email._id
            : data_register.id_student._id;
        }
        if ((body.email && body.id_Class) || body.id_Class)
          body_class = body.id_Class;

        let check_class = await registeredLearn_model.findOne({
          id_student: body_student,
          id_Class: body_class,
        });
        if (check_class) return responseError(res, 400, 46, "CLASS_DUPLICATE");

        if (check_email) {
          let body_id_Class = data_register.id_Class;
          if (body.id_Class) body_id_Class = body.id_Class;
          await registeredLearn_model.findByIdAndUpdate(data_register._id, {
            id_Class: body_id_Class,
            id_student: check_email._id,
          });

          savelogs(
            req.authenticatedAdmin._id,
            "UPDATE",
            "S???a th??ng tin h???c vi??n"
          );
          return responseOk(res, "UPDATE_SUCCESS");
        }
      }

      if (body.id_Class) {
        await registeredLearn_model.findByIdAndUpdate(id_register, {
          id_Class: body.id_Class,
        });
      }

      let data_student = await student_model.findByIdAndUpdate(
        data_register.id_student,
        body
      );
      if (!data_student)
        return responseError(res, 400, 50, "STUDENT_NOT_FOUND");

      savelogs(req.authenticatedAdmin._id, "UPDATE", "S???a th??ng tin h???c vi??n");

      return responseOk(res, "UPDATE_SUCCESS");
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async GetInforTuitionByIdClasse(req, res) {
    try {
      let id_class = req.params.id;
      let discount_code = req.query.discount_code;
      let email = req.query.email;

      let data_class = await class_model
        .findById(id_class)
        .populate([{ path: "id_Courses", select: "tuition_Fees" }])
        .select("id_Courses");
      if (!data_class) return responseError(res, 400, 30, "CLASSALL_NOT_FOUND");

      let tuition_Fees = data_class.id_Courses.tuition_Fees
        ? data_class.id_Courses.tuition_Fees
        : 0;
      let sale = 0;
      let tuition_Fees_discount = data_class.id_Courses.tuition_Fees
        ? data_class.id_Courses.tuition_Fees
        : 0;

      // Check hoc phi neu co ma giam gia
      if (discount_code && discount_code != "" && email && email != "") {
        let data_student = await student_model
          .findOne({ email: email })
          .populate([{ path: "id_debit", select: "discount" }])
          .select("id_debit");

        if (data_student && data_student.id_debit) {
          let obj_discount = data_student.id_debit.discount.find(
            (key) => key.discount_code === discount_code
          );

          if (obj_discount && check_time_discount(obj_discount.expiry_date)) {
            tuition_Fees_discount =
              tuition_Fees * ((100 - obj_discount.sale) / 100);
          }
        }
      }

      let data = {
        tuition_Fees: tuition_Fees,
        sale: sale,
        tuition_Fees_discount: tuition_Fees_discount,
      };

      return responseOk(res, data);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async UpdateCheckInvoice(req, res) {
    try {
      let id_register = req.params.id;

      let update_register = await registeredLearn_model.findByIdAndUpdate(
        id_register,
        {
          check_invoice: "EXPORT",
        }
      );
      if (!update_register)
        return responseError(res, 400, 48, "REGISTER_LEARN_NOT_FOUND");

      savelogs(req.authenticatedAdmin._id, "EXPORT_INVOICE", "In h??a ????n");

      return responseOk(res, "UPDATE_SUCCESS");
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  // statistic regis
  async StatisticRegis(req, res) {
    try {
      let time = req.query.time;

      let month = time.split("/").slice(0, 1).join("/");
      let year = time.split("/").slice(1, 2).join("/");
      month = +month - 1;
      year = +year;

      let timeStart = new Date(year, month, 1, 0, 0, 0, 0).toISOString();
      let timeEnd = new Date(year, month, 31, 0, 0, 0, 0).toISOString();

      let data_regis = await registeredLearn_model.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(timeStart), $lt: new Date(timeEnd) },
          },
        },
        {
          $group: {
            _id: "$payment_status",
            count: { $sum: 1 },
          },
        },
      ]);

      return responseOk(res, data_regis);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async StatisticRegis_Payment(req, res) {
    try {
      let time = req.query.time;

      let month = time.split("/").slice(0, 1).join("/");
      let year = time.split("/").slice(1, 2).join("/");
      month = +month - 1;
      year = +year;

      let timeStart = new Date(year, month, 1, 0, 0, 0, 0).toISOString();
      let timeEnd = new Date(year, month, 31, 0, 0, 0, 0).toISOString();

      let payment_method = await registeredLearn_model.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(timeStart), $lt: new Date(timeEnd) },
          },
        },
        {
          $group: {
            _id: "$payment_method",
            count: { $sum: 1 },
          },
        },
      ]);

      return responseOk(res, payment_method);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }
}

module.exports = registeredLearn;
