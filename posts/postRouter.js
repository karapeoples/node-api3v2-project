const express = require('express');
const router = express.Router();
const Posts = require('./postDb')
const mw = require('../custom/middleware')
const validPostId = mw.validPostId
const validPost = mw.validPost

router.get('/', (req, res) => {
  Posts.get()
			.then((post) => {
				res.status(200).json(post)
			})
			.catch((err) => {
				res.status(500).json({ error: 'There was an error reaching the database!' })
			})
})

router.get('/:id', validPostId, (req, res) => {
  const { id } = req.params 
  Posts.getById(id)
			.then((post) => {
				res.status(200).json({ success: `Post ${id} includes the following info...`, info: post })
			})
			.catch((err) => {
				res.status(500).json({ error: 'There was an error reaching the database!' })
			})
});

router.delete('/:id', validPostId, (req, res) => {
	const { id } = req.params
	Posts.getById(id)
		.then((post) => {
			post
				? Posts.remove(id).then((deleted) => {
						deleted ? res.status(200).json({ success: `Post ${id} has been removed`, info: post }) : null
				  })
				: null
		})
		.catch((err) => {
			res.status(500).json({ error: 'There was an error reaching the database!' })
		})
})

router.put('/:id', validPostId, validPost, (req, res) => {
   const { id } = req.params
			const body = req.body

			Posts.update(id, body)
				.then((user) => {
					res.status(200).json({ success: `Info for Post ${id} was Updated`, info: body })
				})
				.catch((err) => {
					res.status(500).json({ error: 'There was an error reaching the database!' })
				})
});



module.exports = router;
