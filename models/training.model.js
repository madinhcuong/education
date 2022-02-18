const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Training = mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    // đóng mở dao tạo
    status: {
      type: String,
      enum: ["ACTIVATE", "INACTIVE"],
      default: "ACTIVATE",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret.id;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Training", Training);
