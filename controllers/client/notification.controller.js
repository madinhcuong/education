const { _extend } = require("util");
const {
  responseOk,
  responseError,
  paginateAggregate,
} = require("../../helpers/_base_helpers");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const notification_model = require("../../models/notification.model");
const register_model = require("../../models/registeredLearn.model");

class Notification {
  async GetListNotiById(req, res) {
    try {
      let id_student = req.authenticatedClient._id;
      let { page, limit } = req.query;

      page = page > 0 ? +page : 1;
      limit = limit > 0 ? +limit : 10;

      let count_noti_new = await notification_model.aggregate([
        {
          $match: {
            $and: [
              { user_id: ObjectId(id_student) },
              { check_Click_Noti: false },
            ],
          },
        },
        { $count: "total" },
      ]);

      let data_noti = await notification_model.aggregate([
        {
          $match: {
            $and: [{ type: "CLIENT" }, { user_id: ObjectId(id_student) }],
          },
        },
        {
          $project: {
            title: 1,
            description: 1,
            type: 1,
            status: 1,
            check_Click_Noti: 1,
            createdAt: 1,
            type_noti: 1,
            status_score_transfer: 1,
          },
        },
        { $sort: { createdAt: -1 } },
        {
          $facet: {
            count: [
              {
                $count: "count",
              },
            ],
            docs: [
              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit,
              },
            ],
          },
        },
        {
          $project: {
            docs: 1,
            count: { $arrayElemAt: ["$count", 0] },
          },
        },
        {
          $project: {
            docs: 1,
            totalDocs: "$count.count",
          },
        },
        {
          $addFields: {
            totalPages: { $ceil: { $divide: ["$totalDocs", limit] } },
            page,
            limit,
            countNotiNew: count_noti_new[0] ? count_noti_new[0].total : 0,
          },
        },
      ]);

      return responseOk(res, data_noti[0]);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  // ?????m sl noti
  async CountCheckClickNoti(req, res) {
    try {
      let id_student = req.authenticatedClient._id;

      let data = await notification_model.aggregate([
        {
          $match: {
            $and: [{ user_id: id_student }, { check_Click_Noti: false }],
          },
        },
        { $count: "total" },
      ]);

      return responseOk(res, data[0]);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  // ckeck click xem noti
  async CheckClickNoti(req, res) {
    try {
      let id_student = req.authenticatedClient._id;

      let data = await notification_model.updateMany(
        { user_id: id_student, check_Click_Noti: false },
        { $set: { check_Click_Noti: true } }
      );

      return responseOk(res, "UPDATE_SUCCESS");
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  // status xem noti
  async ChangeStatusNoti(req, res) {
    try {
      let id_noti = req.params.id;
      let data = await notification_model.findByIdAndUpdate(id_noti, {
        status: "ACTIVE",
      });

      return responseOk(res, "UPDATE_SUCCESS");
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  // infor noti
  async InforNoti(req, res) {
    try {
      let id_noti = req.params.id;
      let type_noti = await notification_model
        .findById(id_noti)
        .select("type_noti");

      let data_noti = null;
      let detailed_des = "";
      let type_infor = false;
      let agent = "";
      let name_agent = "";
      let date_agent = "";
      let sex_agent = "";
      let email_agent = "";
      let address_agent = "";
      let phone_agent = "";
      let description = "";

      // n???p ti???n h???c ch??nh m??nh
      if (type_noti.type_noti == "MONEY_LEARN") {
        data_noti = await notification_model
          .findById(id_noti)
          .populate([{ path: "id_Class", select: "name time_start time_end" }]);

        detailed_des = `<p>L???p h???c<strong>: ${data_noti.id_Class.name}</strong>, h???c ph&iacute;: <strong>${data_noti.data.tuition_Fees}, </strong>th???i gian h???c<strong>:&nbsp;${data_noti.id_Class.time_start} -&nbsp;${data_noti.id_Class.time_end}</strong></p>\n`;
      }

      // hoa h???ng ?????i ??i???m
      if (type_noti.type_noti == "ROSE") {
        data_noti = await notification_model
          .findById(id_noti)
          .select("title description type_noti data createdAt");

        type_infor = true;
        agent = data_noti.data.agent ? data_noti.data.agent : "";
        name_agent = data_noti.data.data_register
          ? data_noti.data.data_register.name
          : "";
        date_agent = data_noti.data.data_register
          ? data_noti.data.data_register.date
          : "";
        sex_agent = data_noti.data.data_register
          ? data_noti.data.data_register.sex
          : "";
        email_agent = data_noti.data.data_register
          ? data_noti.data.data_register.email
          : "";
        address_agent = data_noti.data.data_register
          ? data_noti.data.data_register.address
          : "";
        phone_agent = data_noti.data.data_register
          ? data_noti.data.data_register.phone
          : "";
      }

      // hoa h???ng khi n???p ti???n h???c F1 F2
      if (
        type_noti.type_noti == "ROSE_AND_SCORE" ||
        type_noti.type_noti == "ROSE_LEARN"
      ) {
        data_noti = await notification_model
          .findById(id_noti)
          .populate([
            { path: "id_student", select: "name sex date address phone email" },
          ])
          .select("title description type_noti data id_student createdAt");

        type_infor = true;
        agent = data_noti.data.agent ? data_noti.data.agent : "";
        name_agent = data_noti.id_student ? data_noti.id_student.name : "";
        date_agent = data_noti.id_student ? data_noti.id_student.date : "";
        sex_agent = data_noti.id_student ? data_noti.id_student.sex : "";
        email_agent = data_noti.id_student ? data_noti.id_student.email : "";
        address_agent = data_noti.id_student
          ? data_noti.id_student.address
          : "";
        phone_agent = data_noti.id_student ? data_noti.id_student.phone : "";
      }

      // noti th??ng b??o l???p h???c
      if (type_noti.type_noti == "CLASS") {
        data_noti = await notification_model
          .findById(id_noti)
          .select("title description type_noti data createdAt");

        detailed_des = `<p><strong>Ng?????i g???i: </strong>${
          data_noti.data.user_send ? data_noti.data.user_send.fullName : ""
        }</p>\n`;
      }

      // noti thang h???ng v??  noti nh???n ti???n khi y??u c???u
      if (
        type_noti.type_noti == "ADDITION_SCORE_LEVEL" ||
        type_noti.type_noti == "PAY_STUDENT" ||
        type_noti.type_noti == "SCORE_SEND" ||
        type_noti.type_noti == "SCORE_BORROW" ||
        type_noti.type_noti == "VERI_TRANSFER_SCORE"
      ) {
        data_noti = await notification_model
          .findById(id_noti)
          .select("title description type_noti createdAt");

        detailed_des = ``;
      }

      let data = {
        type_infor: type_infor,
        time: data_noti ? data_noti.createdAt : "",
        title: data_noti ? data_noti.title : "",
        description: data_noti ? data_noti.description : "",
        detailed_des: detailed_des,
        agent: agent,
        name_agent: name_agent,
        date_agent: date_agent,
        sex_agent: sex_agent,
        email_agent: email_agent,
        address_agent: address_agent,
        phone_agent: phone_agent,
      };

      return responseOk(res, data);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }
}

module.exports = Notification;
