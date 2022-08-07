const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

// create schema
const schema = new mongoose.Schema({
  firstName: { type: String, required: [true, "Please enter first name"] },
  lastName: { type: String, required: [true, "Please enter last name"] },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: 8,
  },
  address: String,
  phone: String,
  onlineStatus: Boolean,
});

// use pre to hash password before save
schema.pre("save", async function (next) {
  // add salt to password
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// create static method to login user
schema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      let online = { onlineStatus: true };
      let setOnline = await this.findOneAndUpdate({ email }, online);
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email / Is not Buyer Email");
};

const Buyer = mongoose.model("Buyer", schema);
module.exports = Buyer;
