import { User } from "../models/userModel.js";

export const isAdmin = async (req, res, next) => {
 
  const userId =
    (req.body && req.body.userId) ||
    (req.headers && req.headers["x-user-id"]) ||
    (req.query && req.query.userId);

  console.log("🛡 userId received:", userId); // debug log

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

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
