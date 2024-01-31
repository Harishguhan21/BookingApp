import Hotel from "../models/Hotel.js";

// GET HOTEL

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL HOTELS

export const getAllHotel = async (req, res, next) => {
  try {
    const allHotel = await Hotel.find();
    res.status(200).json(allHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// CREATE HOTEL

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
    // res.status(500).json(error);
  }
};

// UPDATE HOTEL

export const updateHotel = async (req, res, next) => {
  try {
    const newHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(newHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE HOTEL

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel Deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const hotels = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const getBySearch = async (req, res, next) => {
  const { city, min, max } = req.query;
  const minPrice = parseInt(min, 10) || 0;
  const maxPrice = parseInt(max, 10) || Number.MAX_SAFE_INTEGER;
  try {
    const hotelList = await Hotel.find({
      city: { $regex: new RegExp(city, "i") },
      cheapPrice: { $gte: minPrice, $lte: maxPrice },
    });

    res.status(200).json(hotelList);
  } catch (error) {
    next(error);
  }
};

export const getByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartment = await Hotel.countDocuments({ type: "apartment" });
    const resorts = await Hotel.countDocuments({ type: "resorts" });
    const vilas = await Hotel.countDocuments({ type: "vilas" });
    const cabins = await Hotel.countDocuments({ type: "cabins" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartment },
      { type: "resorts", count: resorts },
      { type: "vilas", count: vilas },
      { type: "cabins", count: cabins },
    ]);
  } catch (error) {
    next(error);
  }
};
