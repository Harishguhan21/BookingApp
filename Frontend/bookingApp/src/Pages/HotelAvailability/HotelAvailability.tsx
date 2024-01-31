import * as React from "react";
import { FaBed, FaTaxi } from "react-icons/fa";
import { FaCarRear } from "react-icons/fa6";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import useFetch from "../../Hooks/useFetch";
import { SearchContext } from "../../Context/SearchContext";
import { convertNights, getUserDetails } from "../../Utils/ConvertNights";

const HotelAvailability = () => {
  const [userData, setUserData] = React.useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const url = location.pathname.split("/") || [];
  const { data, loading, error }: any = useFetch(
    `http://localhost:8080/api/hotels/find/${url[2] || undefined}`
  );
  const { value, updateValue }: any = React.useContext(SearchContext);

  React.useEffect(() => {
    const fetchData = async () => {
      const storedUserString = localStorage.getItem("token");
      if (storedUserString) {
        const token = JSON.parse(storedUserString);
        if (token) {
          try {
            const userDetails = await getUserDetails();
            setUserData(userDetails);
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        }
      }
    };
    fetchData(); // Call the async function
  }, []);
  return (
    <>
      <div className="px-10 py-4 bg-blue-800 min-h-[30vh]">
        <div className="flex justify-between">
          <div className="">
            <h1
              className="text-white font-bold text-2xl"
              onClick={() => navigate("/")}
            >
              lamaBooking
            </h1>
          </div>
          {!userData ? (
            <div className="">
              <button className="border px-4 py-2 bg-white text-[#1e40af] rounded-lg">
                Register
              </button>
              <button
                className="mx-2 border px-4 py-2 bg-white text-[#1e40af] rounded-lg"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          ) : (
            <button
              className="mx-2 border px-4 py-2 bg-white text-[#1e40af] rounded-lg"
              onClick={() => navigate("/login")}
            >
              Logout
            </button>
          )}
        </div>
        <div className=" mt-8 flex flex-wrap">
          <div className="flex items-center border py-2 rounded-xl px-2 mx-8">
            <FaBed className="text-2xl text-white " />
            <h1 className="mx-2 text-xl text-white">Stays</h1>
          </div>
          <div className="flex items-center border py-2 rounded-xl px-2 mx-8">
            <RiFlightTakeoffLine className="text-2xl text-white" />
            <h1 className="mx-2 text-xl text-white">Flights</h1>
          </div>
          <div className="flex items-center border py-2 rounded-xl px-2 mx-8">
            <FaCarRear className="text-2xl text-white" />
            <h1 className="mx-2 text-xl text-white">Car rentals</h1>
          </div>
          <div className="flex items-center border py-2 rounded-xl px-2 mx-8">
            <FaBed className="text-2xl text-white" />
            <h1 className="mx-2 text-xl text-white">Attractions</h1>
          </div>
          <div className="flex items-center border py-2 rounded-xl px-2 mx-8">
            <FaTaxi className="text-2xl text-white" />
            <h1 className="mx-2 text-xl text-white">Airport Taxis</h1>
          </div>
        </div>
      </div>

      <div className="mx-10 my-6">
        <div className="flex justify-between w-100">
          <div className="">
            <h1 className="font-bold text-4xl ">Tower Street Apartment's</h1>
            <div className="flex place-items-baseline">
              <FaLocationDot className="mt-5" />
              <h1 className="mt-5 mx-2">Eltron Street, 125 New york</h1>
            </div>
          </div>

          <div className="">
            <div className="px-4 py-3 cursor-pointer rounded-lg font-bold text-white bg-blue-900">
              Reserve Or book Now!
            </div>
          </div>
        </div>

        <p className="mt-5 text-blue-500">
          Excelent location - 500m from center
        </p>
        <p className="mt-5 text-green-500">
          Book a stay over $114 at this property and get a free airport taxi
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mx-10 my-6 mt-10">
        <div className="md:col-span-9">
          <div className="">
            <h1 className="text-4xl font-bold ">Best Hotel in the City</h1>
            <p className="mt-6">Hotel Description</p>
          </div>
        </div>
        <div className="border md:col-span-3 rounded-2xl bg-blue-300">
          <div className=" p-10 ">
            <h1 className="font-bold text-2xl">
              Perfect for a 7305-night Stay!
            </h1>
            <p className="mt-4">
              Located in the real heart of Krekow, This property has and
              Excelent loaction score of 9.8
            </p>
            <h1 className="text-3xl py-2">
              <span className="font-bold text-3xl">
                Rs: {convertNights(value.date[0]) * data.cheapPrice}
              </span>{" "}
              {convertNights(value.date[0])} Nights
            </h1>
            <button className="bg-blue-700 w-full py-3 text-white font-bold rounded mt-8">
              Reserve or Book Now!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelAvailability;
