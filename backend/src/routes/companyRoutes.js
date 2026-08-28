const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const controller = require("../controllers/companyController");
const asyncHandler = require("../middleware/asyncHandler");
const router = express.Router();
router.use(authenticate, authorize("company"));
router.get("/profile", asyncHandler(controller.getProfile));
router.put("/profile", asyncHandler(controller.updateProfile));
router.get("/jobs", asyncHandler(controller.jobs));
router.post("/jobs", asyncHandler(controller.createJob));
router.put("/jobs/:jobId", asyncHandler(controller.updateJob));
router.delete("/jobs/:jobId", asyncHandler(controller.deleteJob));
router.get("/jobs/:jobId/applications", asyncHandler(controller.applicants));
router.patch(
  "/applications/:applicationId/status",
  asyncHandler(controller.updateApplicationStatus),
);
router.get("/dashboard", asyncHandler(controller.dashboard));
module.exports = router;
