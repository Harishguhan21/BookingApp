import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotel,
  getByCity,
  getBySearch,
  getByType,
  getHotel,
  updateHotel,
} from "../controllers/hotel.js";
import { getHotelRooms } from "../controllers/rooms.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin, verifyUser } from "../Utils/verifyToken.js";

const router = express.Router();

// GET

router.get("/find/:id", getHotel);

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

router.get("/getBySearch", getBySearch);

router.get("/getRooms/:id", getHotelRooms);

export default router;
