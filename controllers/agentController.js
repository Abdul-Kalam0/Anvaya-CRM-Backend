import salesAgentModel from "../models/salesAgent.model.js";

const createAgent = async (req, res) => {
  const { name, email } = req.body;

  try {
    // Required fields check
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Both name and email are required.",
      });
    }

    // Email validation
    const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!strictEmailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid email address.",
      });
    }

    // Check duplicate email
    const existingAgent = await salesAgentModel.findOne({ email });
    if (existingAgent) {
      return res.status(409).json({
        success: false,
        error: `Sales agent with email ${email} already exists.`,
      });
    }

    // Create new agent
    const newAgent = new salesAgentModel({ name, email });
    await newAgent.save();

    return res.status(201).json({
      success: true,
      message: "Sales agent created successfully.",
      data: newAgent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create sales agent",
      error: error.message,
    });
  }
};

const getAllSalesAgent = async (req, res) => {
  try {
    const allAgents = await salesAgentModel.find();
    if (allAgents.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: `No Agent data found.` });
    }
    res.status(200).json({
      success: true,
      message: "Agent data fetched successfully",
      data: { agent: newAgent },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch sales agent data",
      error: error.message,
    });
  }
};

export { createAgent, getAllSalesAgent };
