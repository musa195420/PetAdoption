const express = require('express');
require('dotenv').config();
const app = express();
const logger = require('./config/logger');

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
  secureMeetups: require('./api/secureMeetup/secureMeetup.router')
};

// Middlewares
app.use(express.json());

// Log every request/response asynchronously
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

// Base API Check
app.get('/api', async (req, res) => {
  res.json({
    success: 1,
    message: 'REST APIs are working.'
  });
});

// Error Handler for Uncaught Routes
app.use((req, res) => {
  res.status(404).json({
    success: 0,
    message: 'Route not found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ success: 0, message: 'Internal server error' });
});

// Start Server
app.listen(process.env.APP_PORT, () => {
  logger.info(`Server running on port ${process.env.APP_PORT}`);
});
