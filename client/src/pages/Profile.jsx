import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const applications = JSON.parse(localStorage.getItem("apps")) || [];

  // ✅ Handle both Google + uploaded images
  const profileImage = user?.profilePic
    ? user.profilePic.startsWith("http")
      ? user.profilePic
      : `http://localhost:8000/uploads/${user.profilePic}`
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white px-6 lg:px-16 py-8">

      {/* 🔥 NAVBAR */}
      <div className="flex justify-between items-center mb-10">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-bold cursor-pointer hover:text-blue-400 transition"
        >
          Job Tracker
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Dashboard
        </button>
      </div>

      {/* 🔥 PROFILE + STATS */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* 👤 PROFILE CARD */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center shadow-lg">

          {profileImage ? (
            <img
              src={profileImage}
              alt="profile"
              referrerPolicy="no-referrer"   // ✅ IMPORTANT FIX
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border border-white/20"
              onError={(e) => {
                // ✅ Better fallback (always works)
                e.target.src = `https://ui-avatars.com/api/?name=${user?.name || "User"}`;
              }}
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 flex items-center justify-center">
              👤
            </div>
          )}

          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-gray-400">{user?.email}</p>

          <button
            className="mt-4 w-full bg-green-500 py-2 rounded hover:bg-green-600"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>

        {/* 📊 STATS */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">

          <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/20">
            <p className="text-gray-400 text-sm">Total</p>
            <h2 className="text-2xl font-bold">{applications.length}</h2>
          </div>

          <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/20">
            <p className="text-gray-400 text-sm">Applied</p>
            <h2 className="text-2xl font-bold">
              {applications.filter(a => a.status === "Applied").length}
            </h2>
          </div>

          <div className="bg-yellow-500/10 p-5 rounded-xl border border-yellow-500/20">
            <p className="text-gray-400 text-sm">Interview</p>
            <h2 className="text-2xl font-bold">
              {applications.filter(a => a.status === "Interview").length}
            </h2>
          </div>

          <div className="bg-red-500/10 p-5 rounded-xl border border-red-500/20">
            <p className="text-gray-400 text-sm">Rejected</p>
            <h2 className="text-2xl font-bold">
              {applications.filter(a => a.status === "Rejected").length}
            </h2>
          </div>

        </div>
      </div>

      {/* ⚙️ ACCOUNT SECTION */}
      <div className="mt-10 bg-white/5 border border-white/10 p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

        <div className="flex gap-4 flex-wrap">
          <button 
            onClick={() => navigate("/edit-profile")}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
          >
            Edit Profile
          </button>

          <button
            onClick={() => navigate("/change-password")}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
          >
            Change Password
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

    </div>
  );
}