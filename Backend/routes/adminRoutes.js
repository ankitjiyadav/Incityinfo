const express = require("express");
const router = express.Router();
const { getAdminDashboard } = require("../controllers/adminController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/dashboard", verifyToken, isAdmin, getAdminDashboard);

module.exports = router;
