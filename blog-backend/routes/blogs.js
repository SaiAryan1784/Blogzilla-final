// routes/blogs.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Create a new blog post
router.post('/', async (req, res) => {
    const newBlog = new Blog(req.body);
    try {
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read all blog posts
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read a single blog post by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(200).json(blog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a blog post by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a blog post by ID
router.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
