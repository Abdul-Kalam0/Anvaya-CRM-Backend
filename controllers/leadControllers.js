import mongoose from "mongoose";
import leadModel from "../models/lead.model.js";
import salesAgentModel from "../models/salesAgent.model.js";

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
      salesAgentData = await salesAgentModel.findById(salesAgent);

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
    await newLead.save();

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

//get a Lead
const getLead = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: `Invalid Lead ID: ${id}`,
      });
    }

    const lead = await leadModel
      .findById(id)
      .populate("salesAgent", "name email");

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: `Lead with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead fetched successfully",
      data: lead,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
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
  const { salesAgent, status, source, tags } = req.query;
  try {
    let filter = {};
    if (salesAgent) {
      if (!mongoose.Types.ObjectId.isValid(salesAgent)) {
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
      if (!allowedSources.includes(source)) {
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
const leadUpdate = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: `Invalid lead ID ${id}.` });
    }

    const updatedLead = await leadModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedLead) {
      return res
        .status(400)
        .json({ success: false, error: `Lead with ID ${id} not found.` });
    }

    res.status(200).json({
      success: true,
      message: `Lead data of ID ${id} successfully updated.`,
      updatedLead,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server Error", error: error.message });
  }
};

//Delete lead
const leadDelete = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: `Invalid lead ID ${id}.` });
    }
    const deleatedLead = await leadModel.findByIdAndDelete(id);

    if (!deleatedLead) {
      return res
        .status(404)
        .json({ success: false, error: `Lead with this ${id} id not found!` });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully!",
      deleatedLead,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export { leadCreation, getAllLeads, leadUpdate, leadDelete, getLead };
