const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IntroductionContactWebSchema = mongoose.Schema(
  {
    key: {
      require: true,
      type: String,
      enum: ["INTRO", "CONTACT"],
    },

    des: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model(
  "IntroductionContactWeb",
  IntroductionContactWebSchema
);
