import "./App.css";
import * as React from "react";
import useFetch from "./Hooks/useFetch";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Hotel from "./Pages/Hotels/Hotel";
import LandingPage from "./Pages/LandingPage/LandingPage";
import HotelAvailability from "./Pages/HotelAvailability/HotelAvailability";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LandingPage />} />
        <Route path="hotel" element={<Hotel />} />
        <Route path="/hoteldetail/:id" element={<HotelAvailability />} />
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
