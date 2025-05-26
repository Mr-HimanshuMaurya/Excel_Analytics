import { User } from "../models/userModel.js";

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // exclude passwords
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to get users", error });
    }
};

// Delete user by ID

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};

export { getAllUsers, deleteUser};
