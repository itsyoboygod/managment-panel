const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {authMiddleware, adminOnly} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, email, role } = req.body;
    if (!username || !password || !email || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const [existingUser] = await req.db.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [rows] = await req.db.execute(
            'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, email, role]
        );

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await req.db.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        res.json({
            token,
            role: user.role,
            username: user.username
        });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});

router.get('/users', authMiddleware, adminOnly, async (req, res) => {
    try {
        const [rows] = await req.db.execute('SELECT id, username, email, role FROM users');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/data', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    try {
        // Assuming you have your data logic here
        const data = await getYourDataFromSomewhere(); // Replace this with your actual data retrieval logic
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;