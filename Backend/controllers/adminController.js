const User = require("../modele/models");
const Lead = require("../modele/Lead");

// Helper function: get date string (yyyy-mm-dd)
const formatDate = (date) => date.toISOString().split("T")[0];

exports.getAdminDashboard = async (req, res) => {
  try {
    // 1. Total telecallers
    const telecallers = await User.countDocuments({ role: "telecaller" });

    // 2. Total calls made
    const totalCalls = await Lead.countDocuments({ status: { $ne: "" } });

    // 3. Total customers contacted (with status connected)
    const customersContacted = await Lead.countDocuments({ status: "Connected" });

    // 4. Recent activities (last 5 added or updated)
    const recentLeads = await Lead.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .populate("createdBy", "name");

    const recentActivities = recentLeads.map((lead) => {
      const who = lead.createdBy?.name || "Unknown";
      return `${who} ${lead.status ? "updated" : "added"} lead: ${lead.name}`;
    });

    // 5. Connected Calls (for table)
    const connectedCalls = await Lead.find({ status: "Connected" })
      .sort({ updatedAt: -1 })
      .limit(10)
      .populate("createdBy", "name");

    const callRecords = connectedCalls.map((lead) => ({
      customerName: lead.name,
      telecallerName: lead.createdBy?.name || "Unknown",
      callTime: lead.updatedAt,
      response: lead.response || "N/A",
    }));

    // 6. Call Trends (last 7 days)
    const today = new Date();
    const last7days = [...Array(7)].map((_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      return formatDate(d);
    }).reverse();

    const trends = await Lead.aggregate([
      {
        $match: {
          updatedAt: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
          count: { $sum: 1 },
        },
      },
    ]);

    const callTrends = last7days.map((date) => {
      const found = trends.find((t) => t._id === date);
      return { date, calls: found?.count || 0 };
    });

    res.json({
      metrics: {
        telecallers,
        totalCalls,
        customersContacted,
      },
      recentActivities,
      connectedCalls: callRecords,
      callTrends,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong in admin dashboard" });
  }
};
