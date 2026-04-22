import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 NEW STATES
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSignup = async () => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      if (file) {
        formData.append("profilePic", file); // 🔥 MUST MATCH BACKEND
      }

      const res = await axios.post(
        "http://localhost:8000/api/users/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      alert("Signup successful");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
  
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[350px]">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
  
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-700 outline-none"
        />
  
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-700 outline-none"
        />
  
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-700 outline-none"
        />
  
        {/* FILE INPUT */}
        <input
          type="file"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
  
            if (selectedFile) {
              setPreview(URL.createObjectURL(selectedFile));
            }
          }}
          className="w-full mb-3 text-sm"
        />
  
        {/* PREVIEW */}
        {preview && (
          <img
            src={preview}
            className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
          />
        )}
  
        <button
          onClick={handleSignup}
          className="w-full bg-green-500 py-2 rounded hover:bg-green-600 transition"
        >
          Signup
        </button>
  
        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
  
    </div>
  );
}