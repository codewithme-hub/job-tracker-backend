import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 🔥 NORMAL LOGIN
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/google",
        {
          token: credentialResponse.credential,
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");

      // ✅ go to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response || err);
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  // 🔥 GOOGLE LOGIN
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("STEP 1 ✅ Google token:", credentialResponse);

      const res = await axios.post(
        "http://localhost:8000/api/users/google",
        {
          token: credentialResponse.credential,
        }
      );

      console.log("STEP 2 ✅ Backend response:", res.data);

      // ✅ safety check
      if (!res.data.token) {
        throw new Error("No token received from backend");
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Google login successful");

      // ✅ IMPORTANT FIX (no reload)
      navigate("/dashboard");
    } catch (err) {
      console.log("❌ GOOGLE LOGIN ERROR:", err.response || err);
      alert("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[350px]">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {/* 🔥 GOOGLE LOGIN */}
        <div className="mb-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log("Google Login Failed");
              alert("Google login failed");
            }}
          />
        </div>

        <p className="text-center text-gray-400 mb-4">or</p>

        {/* 🔥 EMAIL LOGIN */}
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-700 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-700 outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-400 cursor-pointer"
          >
            Signup
          </span>
        </p>
      </div>

    </div>
  );
}