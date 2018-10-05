const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = mongoose.model(
  "User",
  new Schema({
    username: {
      type: String,
      unique: true,
      required: true
    }
  })
);
