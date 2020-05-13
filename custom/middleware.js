
const Users = require('../users/userDb')
const Posts = require('../posts/postDb')


//custom middleware

const logger = (req, res, next) => {
  const method = req.method
  const endpoint = req.originalUrl 
  const date = new Date()
  console.log(`You made a ${method} request to ${endpoint} on ${date}`)
  next()
}

const validUserId = (req, res, next) => {
  const { id } = req.params 
  Users.getById(id)
    .then(user => {
    user ? req.user : res.status(400).json({error: `ID ${id} is not a valid userID`})
    })
  next()
}

const validPostId = (req, res, next) => {
	const { id } = req.params
	Posts.getById(id).then((post) => {
		post ? req.user : res.status(400).json({ error: `ID ${id} is not a valid postID` })
	})
	next()
}

const validUser = (req, res, next) => {
  const {name}= req.body 
	Object.entries(req.body).length === 0
		? res.status(400).json({ error: 'Missing the User Information' })
		: !name
		? res.status(400).json({ error: 'Please make sure to include a name' })
		: next()
}

const validPost = (req, res, next) => {
 const { text } = req.body
	Object.entries(req.body).length === 0
		? res.status(400).json({ error: 'Missing the Post Data' })
		: !text
		? res.status(400).json({ error: 'Please include some Text for the Post Field' })
		: next()
}



module.exports = {
  logger,
  validUserId,
  validPostId,
  validUser,
  validPost
}