const express = require('express');
const router = express.Router();
const Users = require('./userDb.js')
const Posts = require('../posts/postDb')
const mw = require('../custom/middleware')
const validUserId = mw.validUserId
const validUser = mw.validUser
const validPost = mw.validPost

router.post('/', validUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
    res.status(201).json({success: "A New User has been created!", user})
    })
    .catch(err => {
    res.status(500).json({error: 'There was an error reaching the database!'})
  })
});

router.post('/:id/posts', validUserId, validPost, (req, res) => {
  const user_id = req.params.id
  const {text}= req.body
  const newPost = {
    text,
    user_id
  }
  
  Users.getById(user_id)
    .then(user => {
      !user ? null :
      Posts.insert(newPost)
				.then((post) => {
					res.status(201).json({ success: `The following has been added to the User with an ID of ${user_id}...`, post })
			})			
    })
    .catch((err) => {
								res.status(500).json({ error: 'There was an error reaching the database!' })
							})
})

router.get('/', (req, res) => {
  Users.get()
			.then((user) => {
				res.status(200).json(user)
			})
			.catch((err) => {
				res.status(500).json({ error: 'There was an error reaching the database!' })
			})
});

router.get('/:id', validUserId, (req, res) => {
  const { id } = req.params
  Users.getById(id)
			.then((user) => {
				res.status(200).json({ success: `User ${id} has the following information...`, info: user })
			})
			.catch((err) => {
				res.status(500).json({ error: 'There was an error reaching the database!' })
			})
})

router.get('/:id/posts', validUserId, (req, res) => {
  const {id}= req.params
  Users.getUserPosts(id)
    .then(post => {
      post ? res.status(200).json({ success: `User with ID ${id} has the following posts...`, info: post }) : null 
    })
  	.catch((err) => {
				res.status(500).json({ error: 'There was an error reaching the database!' })
			})
})

router.delete('/:id', validUserId, (req, res) => {
  const { id } = req.params
  Users.getById(id)
    .then(user => {
      user ?
        Users.remove(id)
          .then((deleted) => {
            deleted? res.status(200).json({ success: `USER ${id} has been removed`, info: user }) : null
          }) : null
    })
			.catch((err) => {
				res.status(500).json({ error: 'There was an error reaching the database!' })
			})
})

router.put('/:id', validUserId, validUser, (req, res) => {
  const { id } = req.params
  const body = req.body
  
  Users.update(id, body)
			.then((user) => {
				res.status(200).json({ success: `Info for User ${id} was Updated`, info: body })
			})
			.catch((err) => {
				res.status(500).json({ error: 'There was an error reaching the database!' })
			})
})



module.exports = router
