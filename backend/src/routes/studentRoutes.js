const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const controller = require("../controllers/studentController");
const asyncHandler = require("../middleware/asyncHandler");
const multer = require("multer");
const router = express.Router();
const resumeUpload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 2 * 1024 * 1024 },
	fileFilter: (req, file, callback) => {
		const allowed = new Set([
			"application/pdf",
			"application/msword",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		]);
		if (!allowed.has(file.mimetype)) {
			return callback(Object.assign(new Error("Only PDF/DOC/DOCX allowed"), { status: 400 }), false);
		}
		callback(null, true);
	},
});
router.use(authenticate, authorize("student"));
router.get("/profile", asyncHandler(controller.getProfile));
router.put("/profile", asyncHandler(controller.updateProfile));
router.post("/resume", resumeUpload.single("resume"), asyncHandler(controller.uploadResume));
router.delete("/resume", asyncHandler(controller.removeResume));
router.get("/jobs", asyncHandler(controller.availableJobs));
router.post("/jobs/:jobId/apply", asyncHandler(controller.applyToJob));
router.get("/applications", asyncHandler(controller.applications));
router.get("/notifications", asyncHandler(controller.notifications));
router.get("/dashboard", asyncHandler(controller.dashboard));
module.exports = router;
