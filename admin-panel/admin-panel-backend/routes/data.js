const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const router = express.Router();

router.get('/', (req, res) => {  // Removed authMiddleware to make data accessible without login
    const filePath = path.join(__dirname, '../uploads', 'last_update.xls'); // Adjust this path for your file

    // Check file extension
    const fileExt = path.extname(filePath).toLowerCase();

    if (fileExt === '.csv') {
        // Parse CSV to JSON
        const results = [];
        fs.createReadStream(filePath, { encoding: 'utf8' })
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                res.json(results); // Send JSON response
            })
            .on('error', (err) => {
                console.error('Error reading CSV file:', err);
                res.status(500).json({ message: 'Error reading CSV file' });
            });
    } else if (fileExt === '.xlsx' || fileExt === '.xls') {
        // Parse XLS/XLSX to JSON
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(sheet);

        res.json(jsonData); // Send JSON response
    } else {
        res.status(400).json({ message: 'Unsupported file format' });
    }
});

module.exports = router;