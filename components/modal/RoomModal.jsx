import React, { useState } from "react";

const RoomModal = ({ onClose, onRoomOption }) => {
  const [roomID, setRoomID] = useState("");

  const handleCreateRoom = () => {
    onRoomOption("create");
    onClose();
  };

  const handleJoinRoom = () => {
    onRoomOption("join", roomID);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 glass-effect">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl bg-gray-100 text-blue-600 font-semibold rounded-lg p-2 mb-4">
          Join or Create a Room
        </h2>
        <button
          onClick={handleCreateRoom}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 w-full"
        >
          Create a Room
        </button>
        <div className="mb-4">
          <input
            type="text"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
            placeholder="Enter Room ID"
            className="border border-gray-400 p-2 rounded-lg w-full text-teal-500 pl-4 text-center"
          />
        </div>
        <button
          onClick={handleJoinRoom}
          className="bg-green-500 text-white py-2 px-4 rounded-lg w-full"
        >
          Join Room
        </button>
        <button
          onClick={onClose}
          className="text-gray-100 mt-6 w-full text-md bg-red-500 font-semibold rounded-lg p-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RoomModal;
