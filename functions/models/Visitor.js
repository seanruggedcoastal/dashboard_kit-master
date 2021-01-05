require('dotenv').config();
const mongoose = require('mongoose');
const ServerError = require('../utils/ServerError');


mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true },
);

// ─────────────────────────────────────────────────────────────────────────────
// schema
// ─────────────────────────────────────────────────────────────────────────────

const VisitorSchema = new mongoose.Schema(
  {
    referrer: {
      type: String
    },
    path: {
      type: String
    },
    device: {
      type: String
    },
    country: {
      type: String
    },
    browser: {
      type: String
    }
  },
  { timestamps: true }, // adds createdAt and updatedAt automatic fields
);




module.exports = mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);
