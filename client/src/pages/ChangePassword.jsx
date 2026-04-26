import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleChangePassword = () => {
    if (!current || !newPass || !confirm) {
      return alert("All fields are required");
    }

    if (newPass !== confirm) {
      return alert("Passwords do not match");
    }

    if (newPass.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    // 🔥 frontend-only demo
    alert("Password changed successfully (demo only)");

    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white px-6 py-8">

      {/* 🔥 NAVBAR */}
      <div className="flex justify-between items-center mb-10">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-bold cursor-pointer hover:text-blue-400 transition"
        >
          Job Tracker
        </h1>

        <button
          onClick={() => navigate("/profile")}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Back
        </button>
      </div>

      {/* 🔥 FORM */}
      <div className="max-w-lg mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Change Password
        </h2>

        <div className="flex flex-col gap-4">

          <input
            type="password"
            placeholder="Current Password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="p-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="p-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="p-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

        </div>

        {/* 🔥 BUTTONS */}
        <div className="flex gap-3 mt-6">

          <button
            onClick={handleChangePassword}
            className="w-full bg-green-500 py-2 rounded hover:bg-green-600 transition"
          >
            Update Password
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="w-full bg-gray-700 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}