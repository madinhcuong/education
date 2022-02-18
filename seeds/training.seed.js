const Training_model = require("../models/training.model");

let data_training = [
  {
    name: "Thiết kế website",
    status: "ACTIVATE",
  },
  {
    name: "Mạng máy tính",
    status: "ACTIVATE",
  },
  {
    name: "Kiểm thử phần mềm",
    status: "ACTIVATE",
  },
  {
    name: "Lập trình di động",
    status: "ACTIVATE",
  },
  {
    name: "Internet Marketing",
    status: "ACTIVATE",
  },
  {
    name: "Tin học văn phòng",
    status: "ACTIVATE",
  },
  {
    name: "Lập tình và CSDL",
    status: "ACTIVATE",
  },
  {
    name: "Đồ họa cho trẻ em",
    status: "ACTIVATE",
  },
];

Training_model.countDocuments(async (err, cnt) => {
  if (cnt < 1) {
    for (let item of data_training) {
      await new Training_model(item).save();
    }
  }
});
