const Student = require("../models/Student");

// Create
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.redirect("/students");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

// Read all
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.render("list", { students });
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};

// Delete
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/students");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};
