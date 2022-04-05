const mongoose = require("mongoose");

const emp = new mongoose.Schema(
  {
    name: { type: String },
    age: { type: String },
    email: { type: String, unique: true },
    skill: { type: String },
    city: { type: String }
  },
  { timestamps: true }
);


module.exports = mongoose.model("employee", emp);