const Post = require('../models/post');
const fs = require('fs');
const {verify} = require("jsonwebtoken");

const sanitiseFilePath = (filePath) => {
    return filePath.replace(/\\/g, '/').replace('public/', '');
}

const createPost = async (req, res) => {
    try {
        const {title, description, content} = req.body;
        const {hostname, protocol} = req;
        const {token} = req.cookies;

        if (!title || !description || !content) {
            throw new Error('Please provide title, description and content');
        }

        const port = parseInt(process.env.PORT) || 3000;
        let file = req.file ? sanitiseFilePath(req.file.path) : null;
        const imageUrl = `${protocol}://${hostname}:${port}/${file}`;

        verify(token, 'peteristhebestcoderalive', async (err, decoded) => {
            if (err) {
                throw new Error('Unauthorised! Access denied');
            }
            // console.log(decoded)
            const post = await Post.create({
                title,
                description,
                content,
                image: imageUrl,
                author: decoded.id || 'Anonymous'
            })
            if (post) {
                res.status(201).json({
                    "Message": "Post created successfully"
                });
            }
        });


    } catch (e) {
        res.status(400).json({
            "Error": e.message
        });
    }

}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username').sort({createdAt: -1});
        // console.log(posts)
        res.status(200).json({
            posts
        });
    } catch (e) {
        res.status(400).json({
            "Error": e.message
        });
    }
}
const getPost = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findById(id).populate('author', 'username');
        res.status(200).json({
            post
        });
    } catch (e) {
        res.status(400).json({
            "Error": e.message
        });
    }
}
const deletePost = async (req, res) => {
    const {id} = req.params;
    const {hostname, protocol} = req;
    try {
        // delete the image and clean up the image associated with the post
        const post = await Post.findById(id);
        const imagePath = post?.image.replace(`${protocol}://${hostname}:${process.env.PORT || 3000}/`, '');
        fs.unlinkSync(`public/${imagePath}`);
        await post.deleteOne();
        res.status(200).json({
            "Message": "Post deleted successfully"
        });
    } catch (e) {
        res.status(400).json({
            "Error": e.message
        });
    }
}

const updatePost = async (req, res) => {
    const {id} = req.params;
    const {title, description, content} = req.body;
    const {hostname, protocol} = req;
    try {
        const post = await Post.findById(id);
        // only update the image if a new image is provided
        let file = req.file ? sanitiseFilePath(req.file.path) : null;
        const imageUrl = `${protocol}://${hostname}:${process.env.PORT || 3000}/${file}`;
        const imagePath = post?.image.replace(`${protocol}://${hostname}:${process.env.PORT || 3000}/`, '');
        if (file) {
            fs.unlinkSync(`public/${imagePath}`);
        }
        await post.updateOne({
            title,
            description,
            content,
            image: file ? imageUrl : post.image
        });

        res.status(200).json({
            "Message": "Post updated successfully"
        });
    } catch (e) {
        res.status(400).json({
            "Error": e.message
        });
    }

}
module.exports = {
    createPost,
    getAllPosts,
    deletePost,
    getPost,
    updatePost,
}
