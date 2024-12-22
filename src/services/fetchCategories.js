import axios from 'axios';

export const fetchCategories = async () => {
    try {
        const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/categories'); // Replace with your actual API endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};
