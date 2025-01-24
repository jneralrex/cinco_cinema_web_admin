import React, { useContext } from "react";
import { GlobalController } from "../Global";
import { MdCancel } from "react-icons/md";

const TimeForm = () => {
  const { addTime, setAddTime } = useContext(GlobalController);
  

  return (
    <div className="bg-black/40 fixed inset-0 flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={() => setAddTime("")}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button>

        {/* Form */}
        <h2 className="text-xl font-bold text-center mb-4">Add Time</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            id="eventTime"
            placeholder="Enter Time"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Time
          </button>
        </form>
      </div>
    </div>
  );
};

export default TimeForm;
