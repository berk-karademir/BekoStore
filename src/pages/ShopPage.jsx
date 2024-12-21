import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShopPage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/categories');
                console.log('API Response:', response.data); // Log the API response
                setCategories(response.data);
                console.log('Categories set:', response.data); // Log the categories being set
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <section>
        <div className="flex flex-col items-center">
            <h1>Home {">"} Shop</h1>
            <div style={{ display: 'flex' , flexDirection:"column"}}>
                {categories.map((category) => (
                    <div key={category.id} style={{ position: 'relative', margin: '10px' }}>
                        <img src={category.img} alt={category.title} style={{ width: '150px', height: '150px', borderRadius: '8px' }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            right: '0',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            textAlign: 'center',
                            padding: '5px'
                        }}>{category.title}</div>
                    </div>
                ))}
            </div>
        </div>
        </section>
    );
};

export default ShopPage;
