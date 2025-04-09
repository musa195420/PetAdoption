const { createLogger, transports, format } = require('winston');
require('winston-mongodb');
require("dotenv").config();

const loggerTransports = [
  new transports.File({
    filename: 'info.log',
    level: 'info',
    format: format.combine(format.timestamp(), format.json())
  }),
];

console.log('MONGODB_URL:', process.env.MONGODB_URL);

// Try to add MongoDB transport only if the env var is defined
if (process.env.MONGODB_URL) {
  try {
    loggerTransports.push(
      new transports.MongoDB({
        level: 'error',
        db: process.env.MONGODB_URL,
        collection: 'MongoDB Errors',
        format: format.combine(format.timestamp(), format.json()),
        options: {
          useUnifiedTopology: true
        }
      })
    );
    console.log('✅ MongoDB transport added to Winston');
  } catch (err) {
    console.error('❌ Failed to configure MongoDB transport for logger:', err.message);
  }
} else {
  console.warn('⚠️ MONGODB_URL is not defined. Skipping MongoDB logging.');
}

const logger = createLogger({
  transports: loggerTransports
});

module.exports = logger;
