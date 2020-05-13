const express = require('express');
const router = express.Router();

const mw = require('../custom/middleware')
const validPostId = mw.validPostId
const validPost = mw.validPost

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validPostId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validPostId, (req, res) => {
  // do your magic!
});

router.put('/:id', validPostId, validPost, (req, res) => {
  // do your magic!
});



module.exports = router;
