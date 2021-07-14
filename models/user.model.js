const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, rerquired: true },
    firstName: { type: String, rerquired: true },
    lastName: { type: String, rerquired: true },
    username: { type: String, rerquired: true },
    hash: { type: String, rerquired: true },
    salt: { type: String, rerquired: true },
  },
  {
    timestamps: true,
  },
  { collection: "users" }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
