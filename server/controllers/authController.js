import User from "../models/UserModel.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";

// Register
export const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
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
    const user = await User.findOne({ email: req.body.email });
    const isValidUser =
      user && (await comparePassword(req.body.password, user.password));

    if (!isValidUser)
      return res.status(401).json({ msg: "invalid credentials" });

    res.send("login route");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};
