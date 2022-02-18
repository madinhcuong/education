const introductionContact_model = require("../models/IntroductionContactWeb.model");

let data = [
  {
    key: "INTRO",
    des: "giới thiệu",
  },
  {
    key: "CONTACT",
    des: "liên hệ",
  },
];

introductionContact_model.countDocuments(async (err, cnt) => {
  if (cnt < 1) {
    for (let item of data) {
      await new introductionContact_model(item).save();
    }
  }
});
