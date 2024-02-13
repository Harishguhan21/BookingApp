import * as React from "react";
import { FaBed, FaTaxi } from "react-icons/fa";
import { FaCarRear } from "react-icons/fa6";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import useFetch from "../../Hooks/useFetch";
import { SearchContext } from "../../Context/SearchContext";
import { convertNights, getUserDetails } from "../../Utils/ConvertNights";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { clearAll, getToken, isAuthenticated } from "../../Utils/auth";
import LoginModal from "../../Components/LoginModal/LoginModal";
import ConfirmLogoutModal from "../../Components/LogoutModal/LogoutModal";
import { sucessNotify } from "../../Components/Toast/ToastMessage";
import notFound from "../../assets/notFound.svg";
import Footer from "../../Components/Footer/Footer";

const HotelAvailability = () => {
  const [userData, setUserData] = React.useState<any>(null);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [roomsDetails, setRoomDetails] = React.useState<any>([]);
  const [selectedRooms, setSelectedRooms] = React.useState<any>([]);
  const [loginModal, setLoginModal] = React.useState(false);
  const [logoutModal, setLogoutModal] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const url = location.pathname.split("/") || [];
  const { data, loading, error }: any = useFetch(
    `${import.meta.env.VITE_API_KEY}/api/hotels/find/${url[2] || undefined}`
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

  const handleBookRoom = async () => {
    if (getToken()) {
      setVisible(true);
      console.log(value.date);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_KEY}/api/hotels/getRooms/${data._id}`
        );
        setRoomDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setLoginModal(true);
    }
  };

  const hidePopup = () => {
    console.log("im called!");
    setLoginModal(false);
  };

  const showLoginPopup = () => {
    setLoginModal(true);
  };

  const handleSelect = (e: any) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item: any) => item !== value)
    );
  };

  const handleClosePopup = () => {
    setVisible(false);
    setSelectedRooms([]);
  };

  const bookedDates: any =
    value?.date && Array.isArray(value.date) && value.date.length > 0
      ? getDatesInRange(value.date[0])
      : [];
  function getDatesInRange(date: any) {
    const start = new Date(date[0]);
    const end = new Date(date[1]);
    console.log(start, "start", end);
    // const dateValue = new Date(start);
    const dates = [];
    while (start <= new Date(end)) {
      dates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    console.log(dates, "rangeDates");
    return dates;
  }

  const handleBooking = async () => {
    if (getToken()) {
      try {
        await Promise.all(
          selectedRooms.map((roomId: any) => {
            const res: any = axios.put(
              `${
                import.meta.env.VITE_API_KEY
              }/api/rooms/availability/${roomId}`,
              { dates: value.date.flat(1) }
            );
          })
        );
        navigate("/");
        sucessNotify("Your Room Booked successfully");
      } catch (error) {}
    } else {
      setLoginModal(true);
    }
  };

  const isAvailable = (roomNumber: any) => {
    const isFoundDate = roomNumber.unavailableDates.some((dateToCheck: any) => {
      return bookedDates.some((date: any) => {
        const isEqual =
          date.toDateString() === new Date(dateToCheck).toDateString();
        return isEqual; // Return the result of the comparison
      });
    });
    return !isFoundDate;
  };

  const handleLogout = () => {
    clearAll();
    setLogoutModal(false);
    sucessNotify("Logout successfull!");
  };

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
                onClick={showLoginPopup}
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
          <div className="flex items-center border py-2 rounded-xl px-2 mx-8 my-2">
            <FaBed className="text-2xl text-white " />
            <h1 className="mx-2 text-xl text-white">Stays</h1>
          </div>
          <div className="flex items-center border py-2 rounded-xl px-2 mx-8 my-2">
            <RiFlightTakeoffLine className="text-2xl text-white" />
            <h1 className="mx-2 text-xl text-white">Flights</h1>
          </div>
          <div className="flex items-center border py-2 rounded-xl px-2 mx-8 my-2">
            <FaCarRear className="text-2xl text-white" />
            <h1 className="mx-2 text-xl text-white">Car rentals</h1>
          </div>
          <div className="flex items-center border py-2 rounded-xl px-2 mx-8 my-2">
            <FaBed className="text-2xl text-white" />
            <h1 className="mx-2 text-xl text-white">Attractions</h1>
          </div>
          <div className="flex items-center border py-2 rounded-xl px-2 mx-8 my-2">
            <FaTaxi className="text-2xl text-white" />
            <h1 className="mx-2 text-xl text-white">Airport Taxis</h1>
          </div>
        </div>
      </div>

      <div className="mx-10 my-6">
        <div className="flex justify-between w-100">
          <div className="">
            <h1 className="font-bold text-4xl ">{data?.title}</h1>
            <div className="flex place-items-baseline">
              <FaLocationDot className="mt-5" />
              <h1 className="mt-5 mx-2">{data?.address}</h1>
            </div>
          </div>
          <div className="">
            <div className="px-4 py-3 cursor-pointer rounded-lg font-bold text-white bg-blue-900">
              Reserve Or book Now!
            </div>
          </div>
        </div>
        <p className="mt-5 text-blue-500">
          Excelent location - {data?.distence}m from center
        </p>
        <p className="mt-5 text-green-500">
          Book a stay over $114 at this property and get a free airport taxi
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mx-10 my-6 mt-10">
        <div className="md:col-span-9">
          <div className="">
            <h1 className="text-4xl font-bold ">{data?.name}</h1>
            <p className="mt-6">{data?.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data?.photos?.map((item: any) => {
                return <img src={item} />;
              })}
            </div>
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
                {/* Rs: {convertNights(value?.date[0]) * data && data?.cheapPrice} */}
              </span>{" "}
              {value?.date && value?.date.length > 0 ? (
                <>{convertNights(value?.date[0])}</>
              ) : (
                1
              )}{" "}
              Nights
            </h1>
            <button
              className="bg-blue-700 w-full py-3 text-white font-bold rounded mt-8"
              onClick={handleBookRoom}
            >
              Reserve or Book Now!
            </button>
          </div>
        </div>
      </div>

      <div className="card flex justify-content-center">
        <Dialog
          header="Book Rooms"
          visible={visible}
          onHide={handleClosePopup}
          style={{ width: "50vw" }}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        >
          {roomsDetails.length > 0 && (
            <p className="m-0">Select Your Rooms: </p>
          )}

          {roomsDetails.length > 0 ? (
            roomsDetails.map((item: any) => {
              return (
                <div className="flex justify-between border m-4 p-5">
                  <div className="">
                    <h1 className="font-bold text-xl">{item.title}</h1>
                    <p>{item.description}</p>
                    <p>Max People: {item.maxPeople}</p>
                  </div>
                  <div className="">
                    {item?.roomNumbers?.map((item: any) => {
                      return (
                        <div className="flex justify-center items-center">
                          <p className="mx-2">{item.number}</p>
                          <input
                            type="checkbox"
                            value={item?._id}
                            className=""
                            onChange={handleSelect}
                            disabled={!isAvailable(item)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div className="flex justify-center items-center">
                <img src={notFound} className="w-20" />
              </div>
              <p className="text-center mt-5">
                No Rooms Available in this Hotel
              </p>
            </>
          )}
          {roomsDetails.length > 0 && (
            <button
              className="px-20 bg-blue-700 py-3 mx-auto flex justify-center items-center text-white font-bold rounded"
              onClick={handleBooking}
            >
              Book Now
            </button>
          )}
        </Dialog>
      </div>
      {loginModal && <LoginModal visible={loginModal} hidePopup={hidePopup} />}
      {logoutModal && (
        <ConfirmLogoutModal
          visible={logoutModal}
          handleLogout={handleLogout}
          hidePopup={hideLogoutModal}
        />
      )}
      <Footer />
    </>
  );
};

export default HotelAvailability;
