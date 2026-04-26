import { Link, useNavigate, useLocation } from "react-router-dom";
import { Briefcase, BarChart, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar"; // ✅ NEW

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const features = [
    {
      icon: <Briefcase size={28} className="text-blue-400" />,
      title: "Track Applications",
      desc: "Keep all your job applications organized in one place.",
    },
    {
      icon: <BarChart size={28} className="text-green-400" />,
      title: "Manage Status",
      desc: "Update status from Applied to Interview to Rejected.",
    },
    {
      icon: <CheckCircle size={28} className="text-yellow-400" />,
      title: "Stay Organized",
      desc: "Never lose track of opportunities again.",
    },
  ];

  // 🔥 SMART LOGO CLICK
  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-x-hidden">

      {/* ✅ REUSABLE NAVBAR */}
      <Navbar />

      {/* 🔥 HERO */}
      <div className="w-full flex flex-col items-center justify-center text-center mt-28 px-6 lg:px-20">

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 text-transparent bg-clip-text">
          Track Your Job Applications Easily
        </h1>

        <p className="text-gray-400 max-w-2xl mb-10 text-lg">
          Organize, track, and manage all your job applications in one place.
          Stay focused and land your dream job faster.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-green-500 px-7 py-3 rounded-lg hover:scale-105 hover:bg-green-600 transition duration-300 shadow-lg"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-gray-600 px-7 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* 🔥 FEATURES */}
      <div className="mt-28 px-8 lg:px-20 grid gap-8 md:grid-cols-3">
        {features.map((item, i) => (
          <div
            key={i}
            className="backdrop-blur-lg bg-white/5 border border-white/10 p-8 rounded-2xl hover:scale-105 hover:border-white/20 transition duration-300 text-center shadow-md"
          >
            <div className="mb-4 flex justify-center">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 🔥 CTA */}
      <div className="text-center mt-32 pb-16 px-6">
        <h2 className="text-3xl font-semibold mb-6">
          Start Your Job Journey Today 🚀
        </h2>

        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-500 px-8 py-3 rounded-lg hover:bg-blue-600 transition shadow-lg"
        >
          Get Started
        </button>
      </div>

    </div>
  );
}