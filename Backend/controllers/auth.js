import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../Utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(201).json("user has been created successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "User Not Found"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Invalid Username or password"));
    }
    const { password, isAdmin, ...otherDetails } = user._doc;
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ token: token });
  } catch (error) {
    next(error);
  }
};

export const userDetails = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  try {
    const decodeToken = jwt.verify(token, process.env.JWT);
    const userData = await User.findById(decodeToken.id);
    const { password, isAdmin, ...otherData } = userData._doc;
    res.status(200).json(otherData);
  } catch (error) {
    next();
  }
};
