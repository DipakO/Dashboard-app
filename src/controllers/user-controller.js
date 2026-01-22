import User from "../models/User.js";

export const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exits...!" });
    }
    const user = await User.create({ name, email });

    res.status(200).json(user);
  } catch (error) {
    res.json({ message: "Failed to  create user!!" })
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const user = await User.find();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
