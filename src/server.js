// Require Dependencies

const express = require('express');
const session = require('express-session');
// const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');

// const logger = require('./util/logger');
const connectToDatabase = require('./config/database');
const { env, port, secretKey } = require('./config/config');

const TWO_HOURS = 1000 * 60 * 60 * 2;
const IN_PRODUCTION = env === 'production';

// Database connection
connectToDatabase();

// Instantiate an Express Application
const app = express();
const expressSession = session({
  secret: secretKey,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: TWO_HOURS,
    sameSite: true,
    secure: IN_PRODUCTION,
  },
});
app.use(expressSession);

// Require Facebook Strategy, Initialize passport
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

// Configure Express App Instance
app.use(
  express.json({
    limit: '50mb',
  }),
);
app.use(
  express.urlencoded({
    extended: true,
    limit: '10mb',
  }),
);

// Configure custom logger middleware
// app.use(logger.dev, logger.combined);

// app.use(cookieParser());
app.use(cors());
app.use(helmet());

// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Assign Routes
app.use('/api/v1/auth/facebook', require('./routes/auth'));
app.use('/api/v1/users/', require('./routes/users'));
app.use('/api/v1/order', require('./routes/orders'));

// Handle not valid route
app.use('*', (req, res) => {
  res.status(404).json({
    status: false,
    message: 'Endpoint Not Found',
  });
});

// Open Server on selected Port
const server = app.listen(port);
// require socket
require('./socket')(server, expressSession);
