const { readData, writeData } = require("../utils/file.util");
const crypto = require("crypto");

// ✅ CREATE APPLICATION
exports.createApplication = (req, res) => {
  try {
    const userId = req.user.id; // 🔥 from JWT
    const { company, role, status, date } = req.body;

    if (!company || !role) {
      return res.status(400).json({
        message: "company and role are required"
      });
    }

    const applications = readData("applications.json");

    const newApplication = {
      id: crypto.randomUUID(),
      userId,
      company,
      role,
      status: status || "Applied",
      date: date || new Date().toISOString().split("T")[0]
    };

    applications.push(newApplication);

    writeData("applications.json", applications);

    res.status(201).json(newApplication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET ALL (ONLY LOGGED-IN USER DATA)
exports.getApplications = (req, res) => {
  try {
    const userId = req.user.id;

    const applications = readData("applications.json");

    const userApplications = applications.filter(
      app => app.userId === userId
    );

    res.json(userApplications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET BY ID
exports.getApplicationById = (req, res) => {
  const applications = readData("applications.json");

  const application = applications.find(a => a.id === req.params.id);

  if (!application) {
    return res.status(404).json({
      message: "Application not found"
    });
  }

  res.json(application);
};

// ✅ UPDATE
exports.updateApplication = (req, res) => {
  const applications = readData("applications.json");

  const index = applications.findIndex(a => a.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      message: "Application not found"
    });
  }

  applications[index] = {
    ...applications[index],
    ...req.body
  };

  writeData("applications.json", applications);

  res.json(applications[index]);
};

// ✅ DELETE
exports.deleteApplication = (req, res) => {
  const applications = readData("applications.json");

  const index = applications.findIndex(a => a.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      message: "Application not found"
    });
  }

  applications.splice(index, 1);

  writeData("applications.json", applications);

  res.json({
    message: "Application deleted successfully"
  });
};

// ✅ GET BY USER ID (OPTIONAL)
exports.getApplicationsByUserId = (req, res, next) => {
  try {
    const { id } = req.params;

    const applications = readData("applications.json");

    const userApplications = applications.filter(
      app => app.userId === id
    );

    res.json(userApplications);

  } catch (error) {
    next(error);
  }
};