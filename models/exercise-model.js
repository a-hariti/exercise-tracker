const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;
module.exports = mongoose.model(
  "Exercice",
  new Schema({
    userId: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "User"
    },
    description: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: new Date()
    }
  })
);
