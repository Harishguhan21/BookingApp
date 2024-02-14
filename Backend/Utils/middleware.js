// middlewares.js
import cors from "cors";

const setHeaders = (req, res, next) => {
  // Set common headers here
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://com-booking-app.onrender.com",
    "http://localhost:5173"
  ); // Set the allowed origin
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
};

export { setHeaders };
