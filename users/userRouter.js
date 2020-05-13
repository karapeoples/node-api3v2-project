const express = require('express');
const router = express.Router();
const mw = require('../custom/middleware')
const validUserId = mw.validUserId
const validUser = mw.validUser
const validPost = mw.validPost

router.post('/', validUser, (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validUserId, validPost, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validUserId (req, res) => {
  // do your magic!
});

router.get('/:id/posts', validUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validUserId, (req, res) => {
  // do your magic!
});



module.exports = router;
