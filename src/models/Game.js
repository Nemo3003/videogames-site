const mongoose= require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    engine:{
      type: String,
      required: true
    },
    platform:{
        type: String,
        required: true
    },
    classification:{
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", GameSchema);