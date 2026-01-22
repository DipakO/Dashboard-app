import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asynch-handler.js";

/**
 * @description register
 * @route POST /auth/register
 */

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
});

/**
 * @description login
 * @route POST /auth/login
 */

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
console.log('check body', email, password)
  //validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res.status(400).json({ msg: "User does not exists" });
  }

  const isMatch = await bcrypt.compare(password, userExists.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: userExists._id },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1d" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: userExists._id,
      name: userExists.name,
      email: userExists.email,
    },
  });
});


