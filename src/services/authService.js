import axios from 'axios';

export const API_URL = 'https://workintech-fe-ecommerce.onrender.com';

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export const registerUser = async (userData) => {
  try {
    const response = await authApi.post('/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await authApi.post('/login', credentials);
    console.log('Full Login Response:', response);
    console.log('Login Response Data:', response.data);
    
    // Create a user object with the received data
    const userData = {
      name: response.data.name,
      email: response.data.email,
      role_id: response.data.role_id,
      token: response.data.token
    };
    
    console.log('Processed User Data:', userData);
    return userData;
  } catch (error) {
    console.error('Login Error:', error);
    
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.');
    }
    
    if (error.response) {
      // Sunucudan hata yanıtı geldi
      throw error.response.data || 'Giriş yapılırken bir hata oluştu';
    } else if (error.request) {
      // İstek yapıldı ama yanıt alınamadı
      throw new Error('Sunucu yanıt vermiyor. Lütfen daha sonra tekrar deneyin.');
    } else {
      // İstek oluşturulurken bir hata oluştu
      throw new Error('Giriş yapılırken beklenmeyen bir hata oluştu.');
    }
  }
};

export const fetchRoles = async () => {
  try {
    const response = await authApi.get('/roles');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchProducts = async () => {
  try {
    const [
      allProductsResponse,
      category1Response,
      category2Response,
      category3Response
    ] = await Promise.all([
      authApi.get('/products'),
      authApi.get('/products?category=1'),
      authApi.get('/products?category=2'),
      authApi.get('/products?category=3')
    ]);

    const allProducts = allProductsResponse.data.products || [];
    const category1Products = category1Response.data.products || [];
    const category2Products = category2Response.data.products || [];
    const category3Products = category3Response.data.products || [];

    // URL'leri saklayacağımız Set oluşturalım
    const seenUrls = new Set();
    const uniqueProducts = [];

    // Tüm ürün listelerini birleştirelim
    const allProductLists = [
      ...allProducts,
      ...category1Products,
      ...category2Products,
      ...category3Products
    ];

    // Her ürünü kontrol edelim
    allProductLists.forEach(product => {
      // Ürünün image URL'ini alal��m
      const imageUrl = product.images?.[0]?.url;
      
      // URL kontrolü yapalım
      if (imageUrl && !seenUrls.has(imageUrl)) {
        // Yeni URL'i Set'e ekleyelim
        seenUrls.add(imageUrl);
        // Ürünü benzersiz listeye ekleyelim
        uniqueProducts.push(product);
      }
    });

    console.log('Görülen URL sayısı:', seenUrls.size);
    console.log('Benzersiz ürün sayısı:', uniqueProducts.length);
    
    return uniqueProducts;

  } catch (error) {
    console.error('Ürünler yüklenirken hata:', error);
    throw new Error('Ürünler yüklenirken bir hata oluştu');
  }
};

export const verifyToken = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await authApi.get('/verify', {
      headers: {
        Authorization: token // Bearer prefix'i olmadan
      }
    });
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    delete authApi.defaults.headers.common['Authorization'];
    throw error;
  }
};

