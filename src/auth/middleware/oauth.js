'use strict';
require('dotenv').config();
const superagent = require('superagent');
const users = require('../models/users-model.js');
const tokenServerUrl = 'https://github.com/login/oauth/access_token';
const remoteAPI = 'https://api.github.com/user';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = process.env.API_SERVER;

module.exports = async (req, res, next) => {
  //2 & 3
  try {
    //the code is coming back from the popup
    const code = req.query.code;
    // console.log('__THE CODE__', code);
    // this will call the function and will get back the Token from GH
    const remoteToken = await exchangeCodeForToken(code);
    // console.log('The TOKEN', remoteToken);
    // 4
    // get the user obj from GH by sending the token from GH
    const remoteUser = await getRemoteUserInfo(remoteToken);
    // console.log('GITHUB USER', remoteUser);
    // sending the GH user and save it to db get back local user + token
    const [user, token] = await getUser(remoteUser);
    // console.log('LOCAL USER', user);
    // since this is a middleware we can put user and token on the req obj
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    next(err.message);
  }
};

async function exchangeCodeForToken(code) {
  // console.log('coooooooooooodeiiiiiiiid',CLIENT_ID);
  const tokenResponse = await superagent.post(tokenServerUrl).send({
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: API_SERVER,
    grant_type: 'authorization_code',
  });
  // console.log('toooooooken reeeeees',tokenResponse);
  const access_token = tokenResponse.body.access_token;
  return access_token;
}

// function exchangeCodeForToken(code) {
//   console.log('coooooooooooodeiiiiiiiid',CLIENT_ID);
//   return superagent.post(tokenServerUrl).send({
//     code: code,
//     client_id: CLIENT_ID,
//     client_secret: CLIENT_SECRET,
//     redirect_uri: API_SERVER,
//     grant_type: 'authorization_code',
//   })
//     .then(tokenResponse => {
//       console.log('toooooooken reeeeees',tokenResponse.body);
//       const access_token = tokenResponse.body.access_token;
//       return access_token;
//     })
//     .catch(e => console.log(e));
// }

async function getRemoteUserInfo(token) {
  let userResponse = await superagent
    .get(remoteAPI)
    .set('Authorization', `token ${token}`)
    .set('user-agent', 'express-app');
  let user = userResponse.body;
  return user;
}
async function getUser(remoteUser) {
  // console.log('iiiiiiiiiiiiii',remoteUser);
  const userRecord = {
    username: remoteUser.login,
    password: 'Rehaaaam', 
  };
  // console.log('userrecord',userRecord.username);
  const user = await users.schema.find({username:userRecord.username});
  // console.log('uuuuuuuuuuuser',user);
  if(user!==[]){
    let token = users.generateToken(user);
    // console.log('1111uuuuser',user,'toooooooooooooken',token);
    return [user, token];
  }else{
    let user = await users.saveUser(userRecord);
    let token = users.generateToken(user);
    // console.log('2222uuuuser',user,'toooooooooooooken',token);

    return [user, token];

  }}
// async function getUser(remoteUser) {
//   console.log('iiiiiiiiiiiiii',remoteUser);
//   const userRecord = {
//     username: remoteUser.login,
//     password: 'Rehaaaam', 
//   };
//   console.log('userrecord',userRecord.username);
//   const user = await users.saveUser(userRecord);
//   console.log('uuuuuuuuuuuser',user);
//   let token = users.generateToken(user);
//   console.log('1111uuuuser',user,'toooooooooooooken',token);
//   return [user, token];
  
// }

