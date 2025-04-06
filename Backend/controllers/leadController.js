const Lead = require('../modele/Lead');

// Get all leads created by this telecaller
exports.getLeads = async (req, res) => {
  const userId = req.user.id;
  try {
    const leads = await Lead.find({ createdBy: userId });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.createLead = async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    console.log("🧾 Received:", { name, email, phone, address });
    console.log("👤 User ID from token:", req.user?.id);

    const newLead = new Lead({
      name,
      email,
      phone,
      address,
      createdBy: req.user.id,
    });

    await newLead.save();
    res.status(201).json(newLead);
  } catch (err) {
    console.error("❌ Lead creation error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.updateLeadAddress = async (req, res) => {
  const { id } = req.params;
  const { address } = req.body;
  try {
    const lead = await Lead.findByIdAndUpdate(id, { address }, { new: true });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Error updating address' });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status, response } = req.body;
  try {
    const lead = await Lead.findByIdAndUpdate(id, { status, response }, { new: true });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Error updating status' });
  }
};
