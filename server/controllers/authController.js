import User from "../models/UserModel.js";
import { hashPassword } from "../utils/passwordUtils.js";

// Register
export const register = async (req, res) => {
  const hashedPassword = hashPassword(req.body.password);
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
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};
