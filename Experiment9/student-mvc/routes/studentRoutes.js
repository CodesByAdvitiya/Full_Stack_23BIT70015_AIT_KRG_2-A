const express = require("express");
const router = express.Router();
const controller = require("../controllers/studentController");

router.get("/", controller.getStudents);
router.post("/create", controller.createStudent);
router.get("/delete/:id", controller.deleteStudent);

module.exports = router;
