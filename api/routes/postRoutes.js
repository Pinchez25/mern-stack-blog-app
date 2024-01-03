const express = require('express');
const {createPost, getAllPosts, deletePost, updatePost, getPost} = require('../controllers/postsController')

const router = express.Router();

router.post('/create-post', createPost);

router.get('/posts', getAllPosts);
router.get('/post/:id', getPost);

router.delete('/delete-post/:id', deletePost);

router.put('/update-post/:id', updatePost);
module.exports = router;