import mongoose from "mongoose";
import commentModel from "../models/comment.model.js";
import leadModel from "../models/lead.model.js";

const addComment = async (req, res) => {
  const { id } = req.params;
  const { commentText } = req.body;

  try {
    // Validate lead ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: `Invalid lead ID ${id}.`,
      });
    }

    // Validate comment text
    if (!commentText || typeof commentText !== "string") {
      return res.status(400).json({
        success: false,
        error: "commentText is required and must be a string.",
      });
    }

    // Find lead and populate assigned sales agent
    const leadData = await leadModel
      .findById(id)
      .populate("salesAgent", "name");
    if (!leadData) {
      return res.status(404).json({
        success: false,
        error: `Lead with ID ${id} not found.`,
      });
    }

    const authorId = leadData.salesAgent?._id;

    // Create new comment
    const newComment = new commentModel({
      lead: id,
      author: authorId,
      commentText,
    });

    await newComment.save();

    // Populate author data after saving
    await newComment.populate("author", "name");

    return res.status(201).json({
      success: true,
      message: "Comment added successfully.",
      data: {
        id: newComment._id,
        commentText: newComment.commentText,
        author: newComment.author.name,
        createdAt: newComment.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAllCommentsForLead = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: `Invalid lead ID ${id}.`,
      });
    }

    const leadData = await leadModel.findById(id);
    if (!leadData) {
      return res.status(404).json({
        success: false,
        error: `Lead with ID ${id} not found.`,
      });
    }

    const allCommentsForLead = await commentModel
      .find({ lead: id })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    if (allCommentsForLead.length === 0) {
      return res.status(404).json({
        success: false,
        error: `No comments found for lead ID ${id}.`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Comments for Lead fetched successfully.",
      data: {
        comments: allCommentsForLead.map((c) => ({
          id: c._id,
          author: c.author.name,
          commentText: c.commentText,
          createdAt: c.createdAt,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { addComment, getAllCommentsForLead };
