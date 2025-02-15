import axios from 'axios';

export const uploadFile = async (data) => {
    try {
        const response = await axios.post('https://fileease-server.onrender.com/upload`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}
