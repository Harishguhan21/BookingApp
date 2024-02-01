import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  updateRoom,
} from "../controllers/rooms.js";
import { verifyAdmin } from "../Utils/verifyToken.js";

const router = express.Router();

// CREATE ROOM

router.post("/:hotelid", verifyAdmin, createRoom);

// GET ROOM

router.get("/:id", verifyAdmin, getRoom);

// UPDATE ROOM

router.put("/:id", updateRoom);

// DELETE ROOM

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

export default router;
