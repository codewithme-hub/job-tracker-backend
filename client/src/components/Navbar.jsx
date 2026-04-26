import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-full sticky top-0 z-50 backdrop-blur-xl bg-black/20">

      <div className="max-w-6xl mx-auto px-6 py-2 flex justify-between items-center">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-lg font-semibold tracking-tight cursor-pointer hover:opacity-80 transition"
        >
          JobTracker
        </h1>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {user && (
            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 cursor-pointer group"
            >
              {/* IMAGE */}
              {user?.profilePic ? (
                <img
                  src={
                    user.profilePic.startsWith("http")
                      ? user.profilePic
                      : `http://localhost:8000/uploads/${user.profilePic}`
                  }
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover transition group-hover:scale-105"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                  👤
                </div>
              )}

              {/* NAME */}
              <span className="text-sm text-gray-300 group-hover:text-white transition">
                {user.name}
              </span>
            </div>
          )}

          {/* BUTTON */}
          {user ? (
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
              className="text-sm text-red-400 hover:text-red-500 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-blue-400 hover:text-blue-500 transition"
            >
              Login
            </button>
          )}

        </div>
      </div>
    </div>
  );
}