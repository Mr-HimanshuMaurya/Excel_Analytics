import { Router } from "express";
import { getAllUsers, deleteUser } from "../controllers/adminController.js";
import { isAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/users", isAdmin, getAllUsers);
router.delete("/user/:id", isAdmin, deleteUser);

export default router;