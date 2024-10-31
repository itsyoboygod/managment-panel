import React, { useState } from 'react';
import axios from 'axios';
import '../components/styles/upload.css';

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setErrorMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                setSuccessMessage('File uploaded successfully!');
                const dataResponse = await axios.get('http://localhost:5000/api/data');
            }
        } catch (error) {
            console.error('Error uploading the file:', error);
            setErrorMessage('Failed to upload the file. Please try again.');
        }
    };

    return (
        <>
            <h1>Upload</h1>
            <div className="upload-container">
                <h2>Upload a CSV or XLSX File</h2>
                <form onSubmit={handleUpload}>
                    <input
                        type="file"
                        accept=".csv, .xlsx, .xls"
                        onChange={handleFileChange}
                        className="file-input"
                    />
                    <button type="submit" className="upload-button">Upload</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
        </>
    );
};

export default Upload;