const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const { signup, login } = require("../controllers/user.controller");
const upload = require("../utils/upload.util");

router.post("/signup", upload.single("profilePic"), signup);

router.post("/signup", userController.signup);
router.post("/login", userController.login);

// router.post("/", userController.createUser);
// router.get("/", userController.getUsers);
// router.get("/:id", userController.getUserById);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);


module.exports = router;