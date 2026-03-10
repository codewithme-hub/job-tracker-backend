const { readData, writeData } = require("../utils/file.util");
const crypto = require("crypto");

exports.createApplication = (req, res) => {
  const { userId, company, role, status, date } = req.body;

  if (!userId || !company || !role) {
    return res.status(400).json({
      message: "userId, company and role are required"
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
};


exports.getApplications = (req, res) => {
  const applications = readData("applications.json");
  res.json(applications);
};


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