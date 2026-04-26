const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  googleLogin,
} = require("../controllers/user.controller");

const upload = require("../utils/upload.util");

// 🔥 GOOGLE
router.post("/google", googleLogin);

// 🔥 AUTH
router.post("/signup", upload.single("profilePic"), signup);
router.post("/login", login);

module.exports = router;