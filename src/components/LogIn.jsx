import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import PrimaryButton from "./PrimaryButton";
import Spinner from "./Spinner";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  
  const history = useHistory();
  const location = useLocation();
  const api = axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (formData) => {
    

    const { email, password, remember } = formData;
  
    try {
      setIsSubmitting(true); 

      const payload = { email, password };
      
      // Login isteğini gönder
      const response = await api.post("/login", payload);
      const userData = response.data;
      

      setTimeout(() => {
        setIsSubmitting(false); // 4 saniye sonra işlemi tamamla
      }, 8000);
      
      // Eğer "remember me" işaretlenmişse, token'ı localStorage'a kaydet
      if (remember) {
        localStorage.setItem("token", userData.token);
      }

      setTimeout(() => {
        toast.success("Login successful! Navigating to home page...");

      },3000)
      // Success mesajını ve yönlendirmeyi 4 saniye sonra yapmak için setTimeout kullan
      setTimeout(() => {
        const redirectTo = location.state?.from || "/";
        history.push(redirectTo);
      }, 6000); // 4 saniye sonra yönlendirme
  
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to log in";
      toast.error("Error: " + errorMessage);
      setError("email", { type: "server", message: errorMessage });
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-screen h-screen flex flex-col items-center justify-center text-[1rem] bg-gradient-to-t from-[#ca0a0a] via-[#66cad1] to-[#5431b3]"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Login to BekoStore
      </h2>
      <div className="rounded-xl shadow-[15px_15px_5px_1px_rgba(0,0,0,0.7)] bg-[#e7ebee] p-10">
        <div className="mb-4 w-64">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            {...register("email", { required: "Email is required!" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-600 text-m font-semibold">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="w-64">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password:
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required!" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-600 text-m font-semibold">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center my-6">
          <input
            id="remember"
            type="checkbox"
            {...register("remember")}
            className="w-4 h-4"
          />
          <label htmlFor="remember" className="ml-2 text-m text-gray-700">
            Remember Me
          </label>
        </div>

        <PrimaryButton id="login-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex justify-center">
              <Spinner /> Logging in...
            </div>
          ) : (
            "Login"
          )}
        </PrimaryButton>
      </div>
    </form>
  );
};
export default LogIn;
