const { Schema, model } = require("../connection");
const bcrypt = require("bcrypt");
const myschema = new Schema({
  username: String,
  email: {type : String, unique : true},
  type : {type : String, default : "normal"},
  password: String,
  norPass: String,
  avatar: String,
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
});
myschema.pre("save", function (next) {
  // console.log("hi from inside");
  if (this.isModified("password")) {
    this.password = bcrypt.hash(this.password, 12);
  }
  next();
});
module.exports = model("usercollection", myschema);
