import * as React from "react";
import { useNavigate } from "react-router-dom";
import { FaBed, FaMapMarkerAlt, FaTaxi } from "react-icons/fa";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { FaCarRear } from "react-icons/fa6";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import useFetch from "../../Hooks/useFetch";
import PropertyType from "../../Components/PropertyType/PropertyType";
import Footer from "../../Components/Footer/Footer";
import OptionSelector from "../../Components/OptionSelector/OptionSelector";
import { SearchContext } from "../../Context/SearchContext";
import { getUserDetails } from "../../Utils/ConvertNights";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginModal from "../../Components/LoginModal/LoginModal";
import { clearAll } from "../../Utils/auth";

const schema: any = yup
  .object({
    destination: yup.string().required(),
  })
  .required();

const LandingPage = () => {
  const [destination, setDestination] = React.useState("");
  const [date, setDate] = React.useState("");
  const [adults, setAdults] = React.useState<number>(0);
  const [children, setChildren] = React.useState<number>(0);
  const [rooms, setRooms] = React.useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [userData, setUserData] = React.useState<any>(null);
  const [dateError, setDateError] = React.useState("");
  const { value, updateValue }: any = React.useContext(SearchContext);
  const [loginModal, setLoginModal] = React.useState(false);

  const navigate = useNavigate();
  const handleDestinationChange = (e: any) => {
    setDestination(e.target.value);
  };

  const handleIncrement = (setter: any) => {
    setter((prevCount: number) => prevCount + 1);
  };

  const handleDecrement = (setter: any) => {
    setter((prevCount: number) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm<any>({
    resolver: yupResolver(schema),
  });

  const images = [
    "https://images.unsplash.com/photo-1617170220968-1ea3bceb3209?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1561784493-88b0a3ce0c76?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1595433306946-233f47e4af3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29pbWJhdG9yZXxlbnwwfHwwfHx8MA%3D%3D",
  ];

  const { data, loading, error }: any = useFetch(
    "http://localhost:8080/api/hotels/getByCity?cities=Chennai,Trichy,Coimbatore"
  );
  console.log(loginModal, "loginModal");
  const locationData = [
    {
      name: "Chennai",
      count: data && data[0],
    },
    {
      name: "Trichy",
      count: data && data[1],
    },
    {
      name: "Coimbatore",
      count: data && data[2],
    },
  ];

  console.log("formErrors:::", errors);
  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const hidePopup = () => {
    setLoginModal(false);
  };

  const showLoginPopup = () => {
    setLoginModal(true);
  };

  const handleSearch = () => {};

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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (date) {
      const searchData = {
        city: destination,
        date: [date],
        options: {
          adults: adults,
          children: children,
          room: rooms,
        },
      };
      updateValue(searchData);
      navigate("/hotel", {
        state: {
          searchQuery: {
            destination: destination,
            date: date,
          },
        },
      });
    } else {
      setDateError("Date field is required!");
    }
  };

  const handleLogin = () => {
    showLoginPopup();
  };

  const handleLogout = () => {
    clearAll();
  };

  return (
    <>
      <div className="px-10 py-4 bg-blue-800 min-h-[50vh]">
        <div className="flex justify-between">
          <div className="">
            <h1 className="text-white font-bold text-2xl">lamaBooking</h1>
          </div>
          {!userData ? (
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
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
        <div className=" mt-8 flex flex-wrap">
          <div className="flex items-center border py-2 rounded-xl px-2 mx-8 my-2">
            <FaBed className="text-2xl text-white" />
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
        <div className="mt-4 md:mt-16">
          <h1 className="md:text-6xl font-bold text-white">
            A Lifetime of Discounts? It's Genious
          </h1>
          <p className="text-white md:mt-16">
            Get Rewarded for your travels - unlock instant savings of 10% or
            more with a free lamabooking Account{" "}
          </p>

          <button className="text-white bg-slate-500 px-3 py-3 mt-5 rounded font-bold">
            SignIn / Register
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col border py-2 px-3 h-20 bg-white rounded md:flex-row md:mx-20 md:-mt-8">
          <div className="flex items-center space-x-2 w-full md:w-[30%] mb-3 md:mb-0">
            <label htmlFor="destination" className="text-gray-500">
              <FaMapMarkerAlt />
            </label>
            <div className="flex flex-col">
              <input
                type="text"
                id="destination"
                placeholder="Where are you going?"
                value={destination}
                {...register("destination")}
                onChange={handleDestinationChange}
                className="border-none px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
              />
              <p className="text-red-600">{errors.destination?.message}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 w-full md:w-[30%] mb-3 md:mb-0">
            <Flatpickr
              options={{
                mode: "range",
                dateFormat: "d-m-Y",
              }}
              {...register("date")}
              onChange={(range: any) => {
                setDate(range);
                setDateError("");
              }}
              className="h-10 md:h-[37px] w-full border focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-600 border-gray-300 p-2 rounded-md"
              placeholder="Choose the date"
            />
            <p className="text-red-600">{dateError}</p>
          </div>

          <div className="flex items-center space-x-2 w-full md:w-[30%] relative mb-3 md:mb-0">
            <label htmlFor="guests" className="text-gray-500 ml-3">
              Guests
            </label>

            <p onClick={handleOpenMenu} className="text-sm md:text-base">
              {adults} adults . {children} children . {rooms} room
            </p>
            {isMenuOpen && (
              <div className="max-w-md mx-auto p-2 md:p-4 absolute bg-white rounded-lg top-10 left-0 md:left-20">
                <OptionSelector
                  label="Adults"
                  count={adults}
                  onIncrement={() => handleIncrement(setAdults)}
                  onDecrement={() => handleDecrement(setAdults)}
                />
                <OptionSelector
                  label="Children"
                  count={children}
                  onIncrement={() => handleIncrement(setChildren)}
                  onDecrement={() => handleDecrement(setChildren)}
                />
                <OptionSelector
                  label="Rooms"
                  count={rooms}
                  onIncrement={() => handleIncrement(setRooms)}
                  onDecrement={() => handleDecrement(setRooms)}
                />
              </div>
            )}
          </div>

          <button
            className="bg-blue-800 text-white px-4 py-2 rounded w-full md:w-auto"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </form>
      {loginModal && <LoginModal visible={loginModal} hidePopup={hidePopup} />}

      <div className="flex flex-wrap justify-center mt-5">
        {locationData.map((item: any, index: any) => {
          return (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
              <div className="">
                <img src={images[index]} className="h-full w-full" />
                <div className="-mt-20 mx-4">
                  <h1 className="text-2xl font-bold text-white">{item.name}</h1>
                  <p className="text-white font-bold ">
                    {item.count} Properties
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-10 py-4 mt-5">
        <PropertyType />
      </div>
      <div className="">
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
