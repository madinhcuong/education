const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const perceptionsWebSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("perceptionsWeb", perceptionsWebSchema);
