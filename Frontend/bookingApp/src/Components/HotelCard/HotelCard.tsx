import * as React from "react";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ data }: any) => {
  const navigate = useNavigate();
  console.log(data, "data from Hotelcard");
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4 my-2 ">
      <div className="md:col-span-4">
        <div className="">
          {data.photos.length > 0 ? (
            <img src={data.photos[0]} />
          ) : (
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsfGVufDB8fDB8fHww" />
          )}
        </div>
      </div>
      <div className="md:col-span-8">
        <div className="mx-4 ">
          <div className="flex justify-between py-3">
            <h1 className="font-bold md:text-3xl text-blue-800">{data.name}</h1>
            <h1 className="font-bold md:text-2xl ">Rs: {data.cheapPrice}</h1>
          </div>
          <div className="flex justify-between">
            <h1 className="">{data.distence}m from center</h1>
            <h1 className="">Includes taxes and fees</h1>
          </div>
          <div className="flex justify-between mt-3">
            <button className="px-2 py-1 md:px-4 md:py-2 bg-green-400 rounded text-white">
              Free Airport Taxi
            </button>
            <button
              className="px-2 py-1 md:px-4 md:py-2 bg-blue-400 rounded text-white"
              onClick={() => navigate(`/hoteldetail/${data._id}`)}
            >
              See Availability
            </button>
          </div>
          <h1 className="text-xl font-bold mt-4">{data.title}</h1>
          <p className="mt-2">hotel description</p>
          <p className="text-green-500 font-bold mt-2">Free Cancellation</p>
          <p className="text-green-400 mt-2">
            You can cancel later, so lock in this great price today
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
