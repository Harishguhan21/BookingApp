import * as React from "react";

const ConfirmLogoutModal = ({ visible, hidePopup, handleLogout }: any) => {
  return (
    <div className={`fixed inset-0 z-50 ${visible ? "block" : "hidden"}`}>
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Are you sure you want to logout?
          </h2>
          <div className="flex justify-end">
            <button
              onClick={handleLogout}
              className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Logout
            </button>
            <button
              onClick={hidePopup}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
