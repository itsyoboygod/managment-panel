const express = require('express');
const Content = require('../models/Content');
const jwt = require('jsonwebtoken');
const router = express.Router();

const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

// Get all content
router.get('/', async (req, res) => {
    const content = await Content.find();
    res.json(content);
});

// Create content (Admin or Editor)
router.post('/', verifyToken, async (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'editor') return res.status(403).send('Access denied');

    const { title, body } = req.body;

    const content = new Content({ title, body });

    try {
        await content.save();
        res.status(201).send('Content created');
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete content (Admin only)
router.delete('/:id', verifyToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send('Access denied');

    try {
        await Content.findByIdAndDelete(req.params.id);
        res.status(200).send('Content deleted');
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;