const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to verify token and role
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

// Get all users (Admin only)
router.get('/', verifyToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send('Access denied');

    const users = await User.find();
    res.json(users);
});

// Create user
router.post('/', verifyToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send('Access denied');

    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });

    try {
        await user.save();
        res.status(201).send('User created');
    } catch (err) {
        res.status(400).send(err);
    }
});

// DELETE user by ID
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    const db = req.db; // Accessing db from the request object

    try {
        await db.query('DELETE FROM users WHERE id = ?', [userId]);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// PUT (update) user by ID
router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, email, role } = req.body;
    const db = req.db; // Accessing db from the request object

    try {
        await db.query(
            'UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?',
            [username, email, role, userId]
        );
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

module.exports = router;