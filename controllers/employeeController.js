const Employee = require("../models/employeeModel");

const asyncHandler = require("express-async-handler");

const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find();
  // console.log(Employee);
  res.status(200).json(employees);
});

const getEmployeeById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  Employee.id = id;
  console.log(Employee.id);
  const employee = await Employee.findById(id);
  if (!employee) {
    res.status(404);
    throw new Error("employee not found");
    return;
  } else {
    res.status(200).json({ message: "success", data: employee });
  }
});

const createEmployee = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    gender,
    jobTitle,
    city,
    contact,
    email,
    experience,
    package,
  } = req.body;
  if (!firstName || !lastName) {
    res.status(400);
    throw new Error("Fields are mandatory.");
  }
  const newEmployee = await Employee.create({
    firstName,
    lastName,
    gender,
    jobTitle,
    city,
    contact,
    email,
    experience,
    package,
  });
  res.status(201).json(newEmployee);
});

const updateEmployee = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const {
    firstName,
    lastName,
    gender,
    jobTitle,
    city,
    contact,
    email,
    experience,
    package,
  } = req.body;
  const employeeToUpdate = await Employee.findById(id);
  if (!employeeToUpdate) {
    res.status(404);
    throw new Error("Employee not found");
  }
  const updatedEmployee = await Employee.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      gender,
      jobTitle,
      city,
      contact,
      email,
      experience,
      package,
    },
    { new: true }
  );
  res.status(200).json({ message: `Updated Employee`, data: updatedEmployee });
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const employeeToDelete = await Employee.findById(id);
  if (!employeeToDelete) {
    res.status(404);
    throw new Error("Employee not found");
  }
  await Employee.findByIdAndDelete(id);
  res
    .status(200)
    .json({ message: `Deleted Employee with ${id}`, data: employeeToDelete });
});

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
