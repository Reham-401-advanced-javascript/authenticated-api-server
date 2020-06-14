'use strict';
const express = require('express');
const bearerAuth = require('./middleware/bearer.js');
const permissions = require('./middleware/authorize.js');
const router = express.Router();

router.get('/secret', bearerAuth ,bearerauth);
router.get('/read', bearerAuth,permissions ('read') ,aclFunction);
router.post('/add', bearerAuth,permissions ( 'create') ,aclFunction);
router.put('/change', bearerAuth,permissions ('update' ), aclFunction);
router.delete('/remove', bearerAuth,permissions('delete' ), aclFunction);

function bearerauth(req,res){
  res.json(req.user);
  
}
function aclFunction (req,res){
  res.status(200).send('OK!!!');
}
module.exports = router;
  