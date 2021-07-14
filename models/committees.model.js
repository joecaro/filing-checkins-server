const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const committeeSchema = new Schema(
  {
    committeeFecId: { type: String, required: true },
    committeeName: { type: String, required: true },
    status: { type: Number, required: true },
    notes: { type: String, required: false },
    reportId: { type: String, required: false },
    dateFiled: { type: Date, required: false },
    poc: { type: String, required: true },
    filingFrequency: { type: String, required: true },
  },
  {
    timestamps: true,
  },
  { collection: "committees" }
);

const Committee = mongoose.model("Committee", committeeSchema);

module.exports = Committee;
