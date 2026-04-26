import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleSignup = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      await axios.post(
        "http://localhost:8000/api/users/signup",
        formData
      );

      alert("Signup successful");
      navigate("/login");

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">

      <div className="w-full max-w-sm bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-semibold text-center mb-6">
          Signup
        </h1>

        {/* NAME */}
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* EMAIL */}
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* 🔥 CUSTOM FILE UPLOAD */}
        <div className="mb-4 text-left">
          <label className="block text-sm mb-2 text-gray-400">
            Profile Picture
          </label>

          <label className="cursor-pointer flex items-center justify-center gap-3 border border-white/10 bg-white/5 hover:bg-white/10 transition p-3 rounded-lg">

            <span className="text-sm text-gray-300">
              {profilePic ? profilePic.name : "Upload Image"}
            </span>

            <input
              type="file"
              className="hidden"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </label>

          {/* 🔥 PREVIEW */}
          {profilePic && (
            <img
              src={URL.createObjectURL(profilePic)}
              alt="preview"
              className="mt-3 w-20 h-20 rounded-full object-cover border border-white/20 mx-auto"
            />
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSignup}
          className="w-full bg-green-500 py-3 rounded-lg hover:bg-green-600 transition duration-300 shadow-md"
        >
          Signup
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-400 mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}