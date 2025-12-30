const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    sourceUrl: {
      type: String,
      unique: true
    },
    publishedAt: String,
    isUpdated: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
