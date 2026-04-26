const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  "502579456338-6jilog84v5g5btbdv2aq9mbr5a208k42.apps.googleusercontent.com"
);

// 🔥 SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePic = req.file ? req.file.filename : null;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePic,
    });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, "secret", {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 GOOGLE LOGIN (FIXED)
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "502579456338-6jilog84v5g5btbdv2aq9mbr5a208k42.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();

    const { name, email, picture } = payload;

    let user = await User.findOne({ email });

    // 👉 CREATE USER IF NOT EXISTS
    if (!user) {
      user = await User.create({
        name,
        email,
        password: null,
        profilePic: picture,
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, "secret", {
      expiresIn: "1d",
    });

    res.json({
      token: jwtToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    console.log("🔥 GOOGLE ERROR FULL:", err);
    console.log("🔥 MESSAGE:", err.message);
    res.status(500).json({ message: err.message });
  }
};