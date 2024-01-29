import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotel,
  getByCity,
  getByType,
  getHotel,
  updateHotel,
} from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin, verifyUser } from "../Utils/verifyToken.js";

const router = express.Router();

// GET

router.get("/find/:id", verifyUser, getHotel);

// GET ALL

router.get("/", verifyUser, getAllHotel);

//  CREATE

router.post("/", createHotel);

// UPDATE

router.put("/:id", verifyAdmin, updateHotel);

// DELETE

router.delete("/:id", verifyAdmin, deleteHotel);

// GET BY CITY

router.get("/getByCity", getByCity);

router.get("/getByType", getByType);

export default router;
