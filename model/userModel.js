const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the username"],
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the password"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"], // Optional: restrict allowed roles
      default: "user", // 👈 Default role
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
