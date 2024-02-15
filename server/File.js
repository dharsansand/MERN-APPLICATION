const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    filename: String,
    originalname: String,
    mimetype: String,
    location: String, // Path or URL to the file
  },
  { timestamps: true } // This will add createdAt and updatedAt fields
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
