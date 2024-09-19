const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    id:{type: String},
    firstName: { type: String, required: [true, "first name is required"] },
    lastName: { type: String, required: [true, "last name is required"] },
    gender: { type: String },
    jobTitle: { type: String },
    city: { type: String },
    contact: { type: Number },
    email: { type: String },
    experience: { type: Number },
    package: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
