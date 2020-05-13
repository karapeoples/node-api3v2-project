const express = require('express');
const server = express();

//My IMPORTS
//Third Party Middleware
const helmet = require('helmet')
//Custom Middleware
const mw = require('./custom/middleware')
const logger = mw.logger

//Routers
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

server.use(helmet(), logger, express.json() )
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});



module.exports = server;
