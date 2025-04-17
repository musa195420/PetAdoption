const multer = require("multer");

// Use in-memory storage instead of saving to disk
const upload = multer({ storage: multer.memoryStorage() });

module.exports = upload;