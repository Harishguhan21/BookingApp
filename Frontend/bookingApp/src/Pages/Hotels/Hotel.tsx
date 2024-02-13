import * as React from "react";
import { FaBed, FaTaxi } from "react-icons/fa";
import { FaCarRear } from "react-icons/fa6";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import HotelCard from "../../Components/HotelCard/HotelCard";
import LoginModal from "../../Components/LoginModal/LoginModal";
import ConfirmLogoutModal from "../../Components/LogoutModal/LogoutModal";
import { sucessNotify } from "../../Components/Toast/ToastMessage";
import useFetch from "../../Hooks/useFetch";
import { clearAll, isAuthenticated } from "../../Utils/auth";
import { getUserDetails } from "../../Utils/ConvertNights";

const Hotel = () => {
  const [destination, setDestination] = React.useState<any>("");
  const [userData, setUserData] = React.useState<any>(null);
  const [min, setMin] = React.useState<any>(0);
  const [max, setMax] = React.useState<any>(15000);
  const [loginModal, setLoginModal] = React.useState(false);
  const [logoutModal, setLogoutModal] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    setDestination(location.state?.searchQuery?.destination);
  }, [location]);

  const { data, loading, error, refetch }: any = useFetch(
    `http://localhost:8080/api/hotels/getBySearch?city=${destination}&min=${min}&max=${max}`
  );

  const showLoginPopup = () => {
    setLoginModal(true);
  };

  const handleLogin = () => {
    showLoginPopup();
  };

  const handleLogout = () => {
    clearAll();
    setLogoutModal(false);
    sucessNotify("Logout successfull!");
  };

  const hidePopup = () => {
    setLoginModal(false);
  };

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

  const hideLogoutModal = () => {
    setLogoutModal(false);
  };

  const showLogoutModal = () => {
    setLogoutModal(true);
  };

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
          {!isAuthenticated() ? (
            <div className="">
              <button className="border px-4 py-2 bg-white text-[#1e40af] rounded-lg">
                Register
              </button>
              <button
                className="mx-2 border px-4 py-2 bg-white text-[#1e40af] rounded-lg"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          ) : (
            <button
              className="mx-2 border px-4 py-2 bg-white text-[#1e40af] rounded-lg"
              onClick={showLogoutModal}
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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-3 m-2 bg-red-200 pb-5 min-h-[68vh]">
          <div className=" rounded p-5 ">
            <h1 className="text-3xl font-bold ">Search</h1>
            <div className="flex flex-col mt-2">
              <label>Destination</label>
              <input
                type="text"
                className="py-2 px-2 rounded"
                onChange={(e: any) => setDestination(e.target.value)}
                value={destination}
              />
            </div>
            <div className=" mt-4 flex flex-col">
              <label>Check-in Date</label>
              <input type="text" className="py-2 px-2 rounded" />
            </div>
            <h1 className="font-bold text-xl mt-2">Options</h1>
            <div className="flex justify-between mt-3">
              <label>Min Price per night</label>
              <input
                type="number"
                className="w-24 rounded px-2"
                onChange={(e: any) => setMin(e.target.value)}
              />
            </div>
            <div className="flex justify-between mt-8">
              <label>Max Price per night</label>
              <input
                type="number"
                className="w-24 rounded px-2"
                onChange={(e: any) => setMax(e.target.value)}
              />
            </div>

            <div className="flex justify-between mt-8">
              <label>Adults</label>
              <input type="number" className="w-24 rounded px-2" />
            </div>

            <div className="flex justify-between mt-8">
              <label>Children</label>
              <input type="number" className="w-24 rounded px-2" />
            </div>

            <div className="flex justify-between mt-8">
              <label>Rooms</label>
              <input type="number" className="w-24 rounded px-2" />
            </div>
          </div>
          <button
            className="w-[400px] mx-4 my-2 rounded  py-2 bg-red-600"
            onClick={refetch}
          >
            Search
          </button>
        </div>
        {loginModal && (
          <LoginModal visible={loginModal} hidePopup={hidePopup} />
        )}

        {logoutModal && (
          <ConfirmLogoutModal
            visible={logoutModal}
            handleLogout={handleLogout}
            hidePopup={hideLogoutModal}
          />
        )}

        <div className="md:col-span-9 m-2 h-[68vh] overflow-y-scroll">
          {data &&
            data.map((item: any) => {
              return (
                <>
                  <HotelCard data={item} />
                </>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hotel;
