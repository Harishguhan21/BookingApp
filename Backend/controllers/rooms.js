import Hotel from "../models/Hotel.js";
import room from "../models/room.js";

export const getRoom = async (req, res, next) => {
  try {
    const individualRoom = await room.findById(req.params.id);
    res.status(200).json(individualRoom);
  } catch (error) {
    next(error);
  }
};

// CREATE ROOM

export const createRoom = async (req, res, next) => {
  const hotelid = req.params.hotelid;
  const newRoom = new room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelid, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

// UPDATE ROOM

export const updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (error) {
    next(error);
  }
};

// UPDATE ROOMNUMBER

export const updateRoomAvailabity = async (req, res, next) => {
  console.log(req.body.dates);
  try {
    const updateRoom = await room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      },
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (error) {
    next(error);
  }
};

// DELETE ROOM

export const deleteRoom = async (req, res, next) => {
  const hotelid = req.params.hotelid;
  try {
    await room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelid, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Room Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((item) => {
        return room.findById(item);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
