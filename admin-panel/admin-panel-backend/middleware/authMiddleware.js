const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token

    if (!token) { return res.status(401).json({ message: 'Invalid token format.' }); }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = decoded; // Attach user information to request
        next();
    } catch (error) {
        console.error('Token verification failed:', error); // Log the error for debugging
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }

};

function adminOnly(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
}

module.exports = {authMiddleware, adminOnly};