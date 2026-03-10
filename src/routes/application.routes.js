const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/application.controller");

router.post("/", applicationController.createApplication);

router.get("/", applicationController.getApplications);
router.get("/user/:id", applicationController.getApplicationsByUserId);

router.get("/error-test", (req, res, next) => {
    throw new Error("This is a test error from applications route");
  });

router.get("/:id", applicationController.getApplicationById);

router.put("/:id", applicationController.updateApplication);

router.delete("/:id", applicationController.deleteApplication);


module.exports = router;