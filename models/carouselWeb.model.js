const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carouselWebSchema = mongoose.Schema(
  {
    image: {
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

module.exports = mongoose.model("carouselWeb", carouselWebSchema);
