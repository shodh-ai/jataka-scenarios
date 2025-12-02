const express = require('express');
const apiRoutes = require('./routes/api');

const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));
app.use('/api', apiRoutes);

module.exports = app;
