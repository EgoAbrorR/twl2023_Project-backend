import express from "express";
import {
  getUsers,
  getUserById,
  saveUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";
import { registerUser, loginUser } from "../controllers/authController.js";
import { authMiddleware } from "../authMiddleware.js";

const router = express.Router();

router.get("/users",authMiddleware, getUsers);
router.get("/users/:id",authMiddleware, getUserById);
router.post("/users",authMiddleware, saveUser);
router.patch("/users/:id",authMiddleware, updateUser);
router.delete("/users/:id",authMiddleware, deleteUser);

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
