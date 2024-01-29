import "./App.css";
import * as React from "react";
import useFetch from "./Hooks/useFetch";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Hotel from "./Pages/Hotels/Hotel";

function App() {
  const { data, loading, error }: any = useFetch(
    "http://localhost:8080/api/hotels"
  );

  console.log(data, loading, error, "data, loading, error");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LandingPage />} />
        <Route path="hotel" element={<Hotel />} />
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
