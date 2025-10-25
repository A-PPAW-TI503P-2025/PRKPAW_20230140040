const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensicontroller');
const { addUserData, isAdmin } = require('../middleware/permisionmidleware');
const reportController = require('../controllers/reportcontroller');

// Route untuk menampilkan semua data presensi (GET)
router.get('/', addUserData, presensiController.getAll);

// Endpoint check-in / check-out
router.post('/check-in', addUserData, presensiController.CheckIn);
router.post('/check-out', addUserData, presensiController.CheckOut);

// Endpoint report (hanya admin yang boleh mengakses)
router.get('/report/daily', addUserData, isAdmin, reportController.getDailyReport);  // GET untuk ambil report
router.post('/report/daily', addUserData, isAdmin, reportController.getDailyReport); // POST untuk compatibility
module.exports = router;