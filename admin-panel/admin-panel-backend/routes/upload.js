const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Folder where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, 'last_update.xls'); // Fixed filename to overwrite
    }
});

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const fileFilter = function (req, file, cb) {
    const fileTypes = /csv|xlsx|xls/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    // Supported MIME types
    const mimeTypes = [
        'text/csv',
        'application/vnd.ms-excel', // for .xls
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // for .xlsx
    ];
    const mimetype = mimeTypes.includes(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only CSV, XLS, and XLSX files are allowed!'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// Upload route
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Please upload a file.' });
    }
    res.status(200).json({ message: 'File uploaded successfully' });
});

module.exports = router;