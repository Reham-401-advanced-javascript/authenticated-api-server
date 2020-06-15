# LAB - Class 15:  authenticated-api-server
### Author: Reham Omar AL-Sobh

Restricting access to information online is one of the foundational paradigms of the internet. Whether it's your online bank account, facebook profile, or a one-time viewing of a document to sign, getting "logged in" to a website is an everday activity for almost every internet user.

In this app ,I will create an account and securely authenticate a user using their chosen username and password.

 ## Links and Resources

 - [ci/cd ](https://github.com/Reham-401-advanced-javascript/authenticated-api-server/actions?query=workflow%3ACI)
 - [heroku ](https://authenticated-api-server-1.herokuapp.com)


 ## Documentaion

 made any user with a valid token (retrieved from either Basic Authentication or OAuth) is able to use that token to login to the system and potentially access protected routes

- Create a POST route for `/api/vi/model`
 - Create a update route for `/api/vi/model/:id`
 - Create a GET route for `/api/vi/model`
 - Create a GET route for `/api/vi/model/:id`
 - Create a delete route for `/api/vi/model/:id`
 - Create a patch route for `/api/vi/model/:id`

 - Create a POST route for `/signup` || ` /api/vi/signup`
 - Create a POST route for `/signin`
 - Create a GET route for `/users`
 - Create a GET route for `/oauth`
 - Create a GET route for `/secret`

 
 ## Setup

 `npm i jest eslint dotenv express cors morgan  mongoose supergoose base-64 jsonwebtoken bcryptjs superagent`

 #### .env requirements (where applicable)
  i.e.

  `PORT - Port Number` :3000
  `MONGODB_URI` - URL to the running mongo instance/db
  `SECRET`
  `CLIENT_ID`
  `CLIENT_SECRET`
  `API_SERVER`

  ## How to initialize/run your application (where applicable)
   * `npm test`
   * `nodemon`

  ## Tests

  #### How do you run tests?
  ` npm test` / `npm run lint`/`node index.js `
  #### Any tests of note?
   `jest --verbose --coverage`


## UML

[UML Diagrame ](assest/lab15.jpg)