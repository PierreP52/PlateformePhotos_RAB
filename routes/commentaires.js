const express = require('express');
const router = express.Router();

const {createComment, deleteComment, commentList} = require('../controllers/commentaires.controller');


router.get('/commentList', commentList);

router.delete('/:commentId', deleteComment);

router.post('/comments', createComment);

console.log('Route Express /photos/comments atteinte.');

module.exports = router;