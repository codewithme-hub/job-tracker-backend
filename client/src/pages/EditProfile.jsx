import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [name, setName] = useState(storedUser.name || "");
  const [email, setEmail] = useState(storedUser.email || "");

  // ✅ FIXED: handles both Google + uploaded images
  const [preview, setPreview] = useState(
    storedUser.profilePic
      ? storedUser.profilePic.startsWith("http")
        ? storedUser.profilePic
        : `http://localhost:8000/uploads/${storedUser.profilePic}`
      : null
  );

  const [file, setFile] = useState(null);

  // 🔥 handle image preview
  const handleImage = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // 🔥 fake save (frontend only)
  const handleSave = () => {
    const updatedUser = {
      ...storedUser,
      name,
      email,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Profile updated (frontend only)");
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

      {/* 🔥 FORM CARD */}
      <div className="max-w-lg mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Edit Profile
        </h2>

        {/* 🔥 IMAGE */}
        <div className="flex flex-col items-center mb-6">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full object-cover border border-white/20"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${storedUser?.name || "User"}`;
              }}
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
              👤
            </div>
          )}

          <label className="mt-3 cursor-pointer text-sm text-blue-400 hover:underline">
            Change Photo
            <input
              type="file"
              onChange={handleImage}
              className="hidden"
            />
          </label>
        </div>

        {/* 🔥 INPUTS */}
        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* 🔥 BUTTONS */}
        <div className="flex gap-3 mt-6">

          <button
            onClick={handleSave}
            className="w-full bg-green-500 py-2 rounded hover:bg-green-600 transition"
          >
            Save Changes
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