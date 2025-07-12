import { Router } from "express";
import { login, register, addToHistory, getUserHistory, deleteFromHistory } from "../controllers/userController.js"; // ✅ FIXED

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/add_history").post(addToHistory); 
router.route("/get_history").get(getUserHistory);   
router.route("/delete_history_item").delete(deleteFromHistory);

export default router;