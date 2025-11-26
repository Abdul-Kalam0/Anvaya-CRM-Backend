import mongoose from "mongoose";
import leadModel from "../models/lead.model.js";

// creates new lead
const leadCreation = async (req, res) => {
  const { name, source, salesAgent, status, tags, timeToClose, priority } =
    req.body;
  try {
    const fields = {
      name: "Name is required",
      source: "Lead Source is required",
      salesAgent: "Sales Agent is required",
      status: "Lead Status is required",
      timeToClose: "Time To Close is required",
      priority: "Priority is required",
    };

    const missingFields = Object.keys(fields).filter((k) => !req.body[k]);
    if (missingFields.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid Input",
        errors: missingFields.map((k) => fields[k]),
      });
    }

    let salesAgentData = null;
    if (salesAgent) {
      salesAgentData = await leadModel.findById(salesAgent);

      if (!salesAgentData) {
        return res.status(404).json({
          success: false,
          error: `Sales agent with ID ${salesAgent} not found.`,
        });
      }
    }

    const newLead = new leadModel({
      name,
      source,
      salesAgent,
      status,
      tags,
      timeToClose,
      priority,
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully.",
      Lead: newLead,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server Error", error: error.message });
  }
};

// get all leads
const allowedStatus = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Closed",
];
const allowedSources = ["Referral", "Website", "Cold Call", "Social Media"];
const getAllLeads = async (req, res) => {
  const { salesAgent, status, source } = req.query;
  try {
    let filter = {};
    if (salesAgent) {
      if (!mongoose.Types.ObjectId(salesAgent)) {
        return res.status(400).json({
          success: false,
          error: "Invalid query: 'salesAgent' must be a valid ObjectId.",
        });
      }
      filter.salesAgent = salesAgent;
    }

    if (status) {
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          error:
            "Invalid input: 'status' must be one of ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'].",
        });
      }
      filter.status = status;
    }

    if (source) {
      if (allowedSources.includes(source)) {
        return res.status(400).json({
          success: false,
          error: `Invalid input: 'source' must be one of ${JSON.stringify(
            allowedSources
          )}.`,
        });
      }
      filter.source = source;
    }

    if (tags) {
      //find the lead which containe any of the tag
      // supports comma-separated tags: ?tags=High Value,Follow-up
      filter.tags = { $in: tags.split(",") };
    }

    const leads = await leadModel
      .find(filter)
      .populate("salesAgent", "name email")
      .sort({ createdAt: -1 });

    if (!leads.length) {
      return res
        .status(404)
        .json({ success: false, message: "No lead data found." });
    }
    res.status(200).json({ success: true, message: "All lead data.", leads });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server Error", error: error.message });
  }
};

// Updated a lead

export { leadCreation, getAllLeads };
