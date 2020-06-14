'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

const authRoutes = require('./auth/router.js');
const extraRoutes = require('./auth/extra-routes.js');

const app = express();

// global middleware

app.use(express.static('./public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(authRoutes);
app.use(extraRoutes);




app.use('*',notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};

