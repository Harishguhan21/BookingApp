import * as React from "react";

const Footer = () => {
  return (
    <div className="bg-blue-800 min-h-[30vh] flex-col flex justify-center items-center">
      <h1 className="text-5xl font-bold text-white">Save time,save money</h1>
      <p className="text-white mt-5">Sign up and we we'll send the the best deals to you</p>
      <div className="flex items-center justify-center mt-8">
        <div className="flex max-w-md w-full bg-white p-4 rounded-lg shadow-md">
          <input
            type="email"
            placeholder="Enter your email"
            // value={email}
            // onChange={handleEmailChange}
            className="flex-grow outline-none px-4 py-2 rounded-l-md"
          />
          <button
            // onClick={handleSubscribeClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
