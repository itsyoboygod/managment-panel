import axios from 'axios';

export const fetchData = async (setData, setError, setLoading) => {
    try {
        setLoading(true); // Start loading state
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await axios.get('http://localhost:5000/api/data', {
            headers: {
                Authorization: `Bearer ${token}` // Include token in the request
            }
        });
        setData(response.data); // Set the retrieved data
        setError(null); // Clear any previous errors
    } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.'); // Set error message
    } finally {
        setLoading(false); // End loading state
    }
};