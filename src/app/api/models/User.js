const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    storePasswords: [
      {
        labelPassword: { type: String },
        password: { type: String }
      }
    ]
  },
  { timestamps: true }
);

const modelName = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = modelName;