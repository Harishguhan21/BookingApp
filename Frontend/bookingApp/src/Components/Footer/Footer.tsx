import * as React from "react";

const Footer = () => {
  return (
    <div className="bg-blue-800 min-h-[30vh] flex-col flex justify-center items-center p-4 sm:p-8">
      <h1 className="text-3xl sm:text-5xl font-bold text-white text-center">
        Save time, save money
      </h1>
      <p className="text-white mt-3 sm:mt-5 text-sm sm:text-lg text-center">
        Sign up and we'll send the best deals to you
      </p>
      <div className="flex items-center justify-center mt-5 sm:mt-8">
        <div className="flex flex-col sm:flex-row max-w-md w-full bg-white p-2 sm:p-4 rounded-lg shadow-md">
          <input
            type="email"
            placeholder="Enter your email"
            // value={email}
            // onChange={handleEmailChange}
            className="flex-grow outline-none px-2 sm:px-4 py-2 sm:py-3 rounded-t-md sm:rounded-l-md sm:rounded-tl-md"
          />
          <button
            // onClick={handleSubscribeClick}
            className="bg-blue-500 text-white px-2 sm:px-4 py-2 sm:py-3 rounded-b-md sm:rounded-r-md sm:rounded-bl-md"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
