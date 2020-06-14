'use strict';
/**
 * Simple Server
 * @module server
 */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const logRequest = require('./middleware/logger.js');
const timeStamp = require('./middleware/timestamp.js');
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');
// const categoriesRouter = require('../routes/categories.js');
// const productsRouter = require('../routes/product.js');
const apiRoutes = require('../routes/api-v1.js');

const app = express();

// global middleware
app.use('/docs', express.static('./docs'));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(timeStamp);
app.use(logRequest);
app.use('/api/v1',apiRoutes);
// app.use('/api/v1', categoriesRouter);
// app.use('/api/v1', productsRouter); 

app.get('/timeStamp',timeStamp);

app.use('*',notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};