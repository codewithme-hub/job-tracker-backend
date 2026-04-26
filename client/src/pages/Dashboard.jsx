import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar"; // ✅ NEW

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [filter, setFilter] = useState("All");

  const [editingId, setEditingId] = useState(null);
  const [editCompany, setEditCompany] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("Applied");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      fetchApplications(token);
    }
  }, []);

  const fetchApplications = async (token) => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/applications",
        {
          headers: { authorization: token },
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
          headers: { authorization: token },
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
          headers: { authorization: token },
        }
      );

      fetchApplications(token);
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (app) => {
    setEditingId(app._id || app.id);
    setEditCompany(app.company);
    setEditRole(app.role);
    setEditStatus(app.status);
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8000/api/applications/${id}`,
        {
          company: editCompany,
          role: editRole,
          status: editStatus,
        },
        {
          headers: { authorization: token },
        }
      );

      setEditingId(null);
      fetchApplications(token);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredApps =
    filter === "All"
      ? applications
      : applications.filter((app) => app.status === filter);

  const chartData = [
    {
      name: "Applied",
      value: applications.filter(a => a.status === "Applied").length,
    },
    {
      name: "Interview",
      value: applications.filter(a => a.status === "Interview").length,
    },
    {
      name: "Rejected",
      value: applications.filter(a => a.status === "Rejected").length,
    },
  ];

  const COLORS = ["#3b82f6", "#facc15", "#ef4444"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">

      {/* ✅ REUSABLE NAVBAR */}
      <Navbar />

      {/* 🔥 CONTENT WRAPPER */}
      <div className="px-6 lg:px-16 py-6">

        {/* 🔥 STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm">Total</p>
            <h2 className="text-2xl font-bold">{applications.length}</h2>
          </div>

          <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
            <p className="text-gray-400 text-sm">Applied</p>
            <h2 className="text-2xl font-bold">
              {applications.filter(a => a.status === "Applied").length}
            </h2>
          </div>

          <div className="bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/20">
            <p className="text-gray-400 text-sm">Interview</p>
            <h2 className="text-2xl font-bold">
              {applications.filter(a => a.status === "Interview").length}
            </h2>
          </div>

          <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20">
            <p className="text-gray-400 text-sm">Rejected</p>
            <h2 className="text-2xl font-bold">
              {applications.filter(a => a.status === "Rejected").length}
            </h2>
          </div>
        </div>

        {/* 🔥 CHART */}
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 mb-8">
          <h2 className="text-xl font-semibold mb-4">Application Overview</h2>

          {applications.length === 0 ? (
            <p className="text-gray-400 text-center">
              No data yet. Add applications to see analytics.
            </p>
          ) : (
            <div className="w-full h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={chartData} dataKey="value" outerRadius={90}>
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* 🔥 ADD APPLICATION */}
        <div className="bg-white/5 p-5 rounded-xl border border-white/10 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Application</h2>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="p-3 rounded bg-gray-800 w-full"
            />

            <input
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-3 rounded bg-gray-800 w-full"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-3 rounded bg-gray-800 w-full"
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Rejected</option>
            </select>

            <button
              onClick={handleAdd}
              className="bg-green-500 px-5 py-3 rounded hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </div>

        {/* 🔥 FILTERS */}
        <div className="flex gap-3 mb-6">
          {["All", "Applied", "Interview", "Rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-full border ${
                filter === f
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-gray-400 border-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* 🔥 APPLICATION LIST */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => {
            const isEditing = editingId === (app._id || app.id);

            return (
              <div
                key={app._id || app.id}
                className="bg-white/5 p-5 rounded-xl border border-white/10 hover:scale-[1.02] transition"
              >
                {isEditing ? (
                  <>
                    <input
                      value={editCompany}
                      onChange={(e) => setEditCompany(e.target.value)}
                      className="p-3 rounded bg-gray-800 w-full mb-2"
                    />

                    <input
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      className="p-3 rounded bg-gray-800 w-full mb-2"
                    />

                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="p-3 rounded bg-gray-800 w-full mb-2"
                    >
                      <option>Applied</option>
                      <option>Interview</option>
                      <option>Rejected</option>
                    </select>

                    <button
                      onClick={() => handleUpdate(app._id || app.id)}
                      className="mt-4 w-full bg-green-500 py-2 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold">{app.company}</h3>
                    <p className="text-gray-400">{app.role}</p>

                    <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-blue-500/20">
                      {app.status}
                    </span>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => startEdit(app)}
                        className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(app._id || app.id)}
                        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}