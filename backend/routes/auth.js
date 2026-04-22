const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const auth = require("../middleware/auth");
const { model } = require("mongoose");

const router = express.Router();


// 🔹 REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, course } = req.body;

  const existing = await Student.findOne({ email });
  if (existing) return res.status(400).json({ msg: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const student = new Student({
    name,
    email,
    password: hashed,
    course
  });

  await student.save();
  res.json({ msg: "Registered successfully" });
});


// 🔹 LOGIN (JWT)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Student.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
});


// 🔹 UPDATE PASSWORD
router.put("/update-password", auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await Student.findById(req.user.id);

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ msg: "Password updated" });
});


// 🔹 UPDATE COURSE
router.put("/update-course", auth, async (req, res) => {
  const { course } = req.body;

  await Student.findByIdAndUpdate(req.user.id, { course });

  res.json({ msg: "Course updated" });
});

module.exports = router;