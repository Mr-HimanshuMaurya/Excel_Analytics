import { User } from "../models/userModel.js";

export const isAdmin = async (req, res, next) => {
  const userId =
  req.body.userId || req.headers["x-user-id"] || req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID not provided" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next(); //  Admin verified
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};