import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

// Register
export const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  try {
    const user = await User.create(req.body);
    res.status(201).json({ mag: "user created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find(filter);
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};
