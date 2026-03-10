const { readData, writeData } = require("../utils/file.util");
const crypto = require("crypto");

exports.createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email required"
    });
  }

  const users = readData("users.json");

  const newUser = {
    id: crypto.randomUUID(),
    name,
    email
  };

  users.push(newUser);

  writeData("users.json", users);

  res.status(201).json(newUser);
};

exports.getUsers = (req, res) => {
  const users = readData("users.json");
  res.json(users);
};

exports.getUserById = (req, res) => {
  const users = readData("users.json");

  const user = users.find(u => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.json(user);
};

exports.updateUser = (req, res) => {
  const users = readData("users.json");

  const index = users.findIndex(u => u.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  users[index] = {
    ...users[index],
    ...req.body
  };

  writeData("users.json", users);

  res.json(users[index]);
};

exports.deleteUser = (req, res) => {
  const users = readData("users.json");

  const index = users.findIndex(u => u.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  users.splice(index, 1);

  writeData("users.json", users);

  res.json({
    message: "User deleted successfully"
  });
};