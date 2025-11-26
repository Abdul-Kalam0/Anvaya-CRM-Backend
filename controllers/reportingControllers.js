import leadModel from "../models/lead.model.js";

export const getClosedLeadsLastWeek = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const closedLeads = await leadModel
      .find({
        status: "Closed",
        updatedAt: { $gte: sevenDaysAgo },
      })
      .select("name salesAgent updatedAt")
      .populate("salesAgent", "name")
      .sort({ updatedAt: -1 });

    if (closedLeads.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No leads were closed in the last 7 days.",
      });
    }

    const formattedResponse = closedLeads.map((lead) => ({
      id: lead._id,
      name: lead.name,
      salesAgent: lead.salesAgent?.name || "N/A",
      closedAt: lead.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      message: "Closed leads from last week fetched successfully.",
      data: formattedResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

export const getPipelineCount = async (req, res) => {
  try {
    const totalPipeline = await leadModel.countDocuments({
      status: { $ne: "Closed" },
    });

    return res.status(200).json({
      success: true,
      message: "Pipeline count fetched successfully.",
      data: { totalLeadsInPipeline: totalPipeline },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: error.message,
    });
  }
};
