const express = require('express');
require('dotenv').config();
const app = express();
const logger = require('./config/logger');

// Create HTTP server & Socket.IO
const http = require('http');
const server = http.createServer(app);

// ✅ FIX: Correct import and instantiation
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// Supabase client
const supabase = require('./config/database');

// Load Socket logic
const { initSocket } = require('./socket');
initSocket(io);

// Routers
const routes = {
  users: require('./api/users/user.router'),
  adopters: require('./api/adopter/adopter.router'),
  donors: require('./api/donor/donor.router'),
  pets: require('./api/pet/pet.router'),
  animals: require('./api/animal/animal.router'),
  breeds: require('./api/breed/breed.router'),
  vaccinations: require('./api/vaccination/vaccination.router'),
  diseases: require('./api/disease/disease.router'),
  disabilities: require('./api/disability/disability.router'),
  health: require('./api/health/healthinfo.router'),
  messages: require('./api/message/message.router'),
  favourites: require('./api/favourite/favourite.router'),
  meetups: require('./api/meetup/meetup.router'),
  secureMeetups: require('./api/secureMeetup/secureMeetup.router'),
  verificationMeetupRouter: require("./api/verification_meetup/verificationMeetup.router"),
  verificationUsersRouter: require("./api/verification_user/verificationUser.routes"),
    paymentRouter: require("./api/payment/payment.routes"),
     applicationRouter: require("./api/application/application.routes")
};

// Middleware
app.use(express.json());

// Request/Response logging
app.use((req, res, next) => {
  logger.info(`[REQUEST] ${req.method} ${req.url}`, req.body);

  const oldSend = res.send;
  res.send = function (data) {
    try {
      logger.info(`[RESPONSE] ${req.method} ${req.url}`, JSON.parse(data));
    } catch (err) {
      logger.warn(`[RESPONSE] ${req.method} ${req.url} (non-JSON)`);
    }
    oldSend.apply(res, arguments);
  };
  next();
});

// Routes
app.use('/api/secureMeetup', routes.secureMeetups);
app.use('/api/meetup', routes.meetups);
app.use('/api/favourite', routes.favourites);
app.use('/api/message', routes.messages);
app.use('/api/health', routes.health);
app.use('/api/disability', routes.disabilities);
app.use('/api/disease', routes.diseases);
app.use('/api/vaccination', routes.vaccinations);
app.use('/api/breed', routes.breeds);
app.use('/api/animal', routes.animals);
app.use('/uploads', express.static('uploads'));
app.use('/api/pet', routes.pets);
app.use('/api/donor', routes.donors);
app.use('/api/adopter', routes.adopters);
app.use('/api/users', routes.users);
app.use("/api/verification-meetups", routes.verificationMeetupRouter);
app.use("/api/verification-users", routes.verificationUsersRouter);
app.use("/api/payment", routes.paymentRouter);
app.use("/api/application", routes.applicationRouter);


// Base API Check
app.get('/api', async (req, res) => {
  res.json({
    status: 200,
    success: true,
    message: 'REST APIs are working.'
  });
});

// Unmatched Route Handler
app.use((req, res) => {
  res.status(404).json({
    status: 400,
    success: false,
    message: 'Route not found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ success: false, status: 500, message: 'Internal server error' });
});

// Start HTTP server
server.listen(process.env.APP_PORT, () => {
  logger.info(`Server running on port ${process.env.APP_PORT}`);
});
