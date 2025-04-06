const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getLeads,
  createLead,
  updateLeadAddress,
  deleteLead,
  updateStatus
} = require('../controllers/leadController');

router.get('/', auth(['telecaller']), getLeads);
router.post('/', auth(['telecaller']), createLead);
router.put('/:id/address', auth(['telecaller']), updateLeadAddress);
router.delete('/:id', auth(['telecaller']), deleteLead);
router.put('/:id/status', auth(['telecaller']), updateStatus);

module.exports = router;
