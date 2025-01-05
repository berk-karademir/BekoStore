import axios from "axios";

export const API_URL = "https://workintech-fe-ecommerce.onrender.com";

export const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export const registerUser = async (userData) => {
  try {
    const response = await authApi.post("/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await authApi.post("/login", credentials);
    console.log("Full Login Response:", response);
    console.log("Login Response Data:", response.data);

    // Create a user object with the received data
    const userData = {
      name: response.data.name,
      email: response.data.email,
      role_id: response.data.role_id,
      token: response.data.token,
    };

    // Remember Me kontrolü
    if (credentials.rememberMe) {
      localStorage.setItem("token", response.data.token);
    } else {
      sessionStorage.setItem("token", response.data.token);
    }

    // Axios header'ını güncelle
    authApi.defaults.headers.common["Authorization"] = response.data.token;

    console.log("Processed User Data:", userData);
    return userData;
  } catch (error) {
    console.error("Login Error:", error);

    if (error.code === "ERR_NETWORK") {
      throw new Error(
        "Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin."
      );
    }

    if (error.response) {
      throw error.response.data || "Giriş yapılırken bir hata oluştu";
    } else if (error.request) {
      throw new Error(
        "Sunucu yanıt vermiyor. Lütfen daha sonra tekrar deneyin."
      );
    } else {
      throw new Error("Giriş yapılırken beklenmeyen bir hata oluştu.");
    }
  }
};

export const fetchRoles = async () => {
  try {
    const response = await authApi.get("/roles");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchProducts = async (queryString = "") => {
  try {
    const response = await authApi.get(`/products${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Ürünler yüklenirken hata:", error);
    throw new Error("Ürünler yüklenirken bir hata oluştu");
  }
};

export const fetchProductDetail = async (productId) => {
  try {
    const response = await authApi.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Ürün detayı yüklenirken hata:", error);
    throw new Error("Ürün detayı yüklenirken bir hata oluştu");
  }
};

export const verifyToken = async () => {
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token bulunamadı");
    }

    const response = await authApi.get("/verify", {
      headers: {
        Authorization: token,
      },
    });

    // Token geçerliyse Axios header'ını güncelle
    authApi.defaults.headers.common["Authorization"] = token;

    return response.data;
  } catch (error) {
    // Token geçersizse tüm token bilgilerini temizle
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    delete authApi.defaults.headers.common["Authorization"];
    throw error;
  }
};

// Çıkış yapma fonksiyonu
export const logout = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  delete authApi.defaults.headers.common["Authorization"];
};

export const fetchMostPopularProducts = async () => {
  try {
    const response = await authApi.get(`/products?sort=rating:desc`);
    console.log("API Yanıtı:", response.data);
    if (response.data && Array.isArray(response.data.products)) {
      return response.data.products.slice(0, 10);
    } else {
      throw new Error("Beklenmeyen yanıt formatı");
    }
  } catch (error) {
    console.error("Ürünler yüklenirken hata:", error);
    throw new Error("Ürünler yüklenirken bir hata oluştu");
  }
};
