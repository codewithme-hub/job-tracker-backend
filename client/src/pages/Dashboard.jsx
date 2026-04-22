import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      fetchApplications(token);
    }
  }, [navigate]);

  const fetchApplications = async (token) => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/applications",
        {
          headers: {
            authorization: token,
          },
        }
      );

      setApplications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/applications",
        { company, role, status },
        {
          headers: {
            authorization: token,
          },
        }
      );

      fetchApplications(token);

      setCompany("");
      setRole("");
      setStatus("Applied");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8000/api/applications/${id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      fetchApplications(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-4">
  
      {/* 🔥 NAVBAR */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Tracker</h1>
  
        <div className="flex items-center gap-3">
          {user?.profilePic && (
            <img
              src={`http://localhost:8000/uploads/${user.profilePic}`}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <span className="text-sm">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
  
      {/* 🔥 ADD APPLICATION */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-3">Add Application</h2>
  
        <div className="flex flex-col md:flex-row gap-3">
          <input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="p-2 rounded bg-gray-700 outline-none w-full"
          />
  
          <input
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 rounded bg-gray-700 outline-none w-full"
          />
  
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 rounded bg-gray-700 w-full"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
          </select>
  
          <button
            onClick={handleAdd}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Add
          </button>
        </div>
      </div>
  
      {/* 🔥 APPLICATION CARDS */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Applications</h2>
  
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <div
              key={app._id || app.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105 transition"
            >
              <h3 className="text-lg font-semibold">{app.company}</h3>
              <p className="text-gray-400">{app.role}</p>
  
              <span
                className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                  app.status === "Applied"
                    ? "bg-blue-500"
                    : app.status === "Interview"
                    ? "bg-yellow-400 text-black"
                    : "bg-red-500"
                }`}
              >
                {app.status}
              </span>
  
              <button
                onClick={() => handleDelete(app._id || app.id)}
                className="mt-4 w-full bg-red-500 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
  
    </div>
  );
}