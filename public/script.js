'use strict';
// from GH docs Request a user's GitHub identity
const URL = 'https://github.com/login/oauth/authorize';

const options = {
  client_id: '136d8b7e0763a67a587d', 
  scope: 'read:user',
  state: '401 demo ask for user consent',
};
const queryString = Object.keys(options)
  .map((key) => {
    return `${key}=${encodeURIComponent(options[key])}`;
  })
  .join('&');

console.log('Query', queryString);
const authUrl = `${URL}?${queryString}`;
const link = document.getElementById('GitHubOauth');
link.setAttribute('href', authUrl);