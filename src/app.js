const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

//const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(cors());
app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "../public")));

const logger = require("./middleware/logger.middleware");
app.use(logger);

const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);

const applicationRoutes = require("./routes/application.routes");
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);

module.exports = app;