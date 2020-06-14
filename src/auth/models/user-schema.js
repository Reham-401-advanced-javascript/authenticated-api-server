'use strict';

const mongoose = require('mongoose');

const db = new mongoose.Schema({
  username: {type: String ,required: true},
  password: {type: String, required: true},
  role: {type: String, required: true, default : 'user' , enum:['user','writer' ,'editor', 'admin']},
});
module.exports = mongoose.model('user', db);