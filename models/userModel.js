const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 100,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    format: "email",
    required: [true, "A user must have a email"],
    validate: validator.isEmail,
    message: "Invalid email address",
  },
  password: {
    type: String,
    minLength: 6,
    required: [true, "A user must have a password"],
  },
  role: {
    type: String,
    enum: ["admin", "participant"],
    default: "participant",
  },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  score: { type: String, minlength: 0, maxlength: 3 },
});

// Hashing the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// to check password is correct (login)
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
