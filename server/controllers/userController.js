import User from "../models/UserModel.js";
import Job from "../models/jobModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

// admin route
export const getApplicationStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(200).json({ users, jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;

  try {
    if (req.file) {
      // upload image to teh cloud
      const response = await cloudinary.v2.uploader.upload(req.file.path);

      // remove the local image if the cloud successful
      await fs.unlink(req.file.path);

      // add the avatar url to the user obj
      newUser.avatar = response.secure_url;
      newUser.avatarPublicId = response.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

    // remove the old image
    if (req.file && updatedUser.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }

    res.status(200).json({ msg: "user updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};
