import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/users.js";
import { verifyAdmin, verifyToken, verifyUser } from "../Utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, nex) => {
  res.send("You are logged in");
});

router.get("/:id", verifyUser, getUser);

// GET ALL

router.get("/", verifyAdmin, getAllUsers);

// UPDATE

router.put("/:id", verifyUser, updateUser);

// DELETE

router.delete("/:id", verifyUser, deleteUser);

export default router;
