import User from "../models/UserModel.js";
import Job from "../models/jobModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

export const getApplicationStats = async (req, res) => {
  try {
    res.status(200).json({ msg: "application stats" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.user.userId, req.body);
    res.status(200).json({ msg: "user updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};
