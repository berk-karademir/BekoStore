import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { LoaderCircle, LogInIcon } from "lucide-react";
import { setUser } from "../store/actions/clientActions";
import { loginUser } from "../services/authService";
import { handleAuthError, setAuthToken } from "../utils/authUtils";
import {
  emailValidation,
  passwordValidation,
} from "../validations/loginValidations";
import { Button } from "./ui/button";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (formData) => {
    const { email, password, remember } = formData;

    try {
      setIsSubmitting(true);
      const userData = await loginUser({ email, password });

      console.log("Login response user data:", userData);

      // Make sure we have user data before storing
      if (userData && userData.email) {
        // Store user data in Redux
        dispatch(setUser(userData));

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("Stored user data:", userData);

        // Handle token separately
        if (remember && userData.token) {
          setAuthToken(userData.token);
        }

        toast.success("Login successful! Navigating to home page...");

        const redirectTo = location.state?.from || "/";
        setTimeout(() => {
          setIsSubmitting(false);
          history.push(redirectTo);
        }, 4000);
      } else {
        throw new Error("Invalid user data received from server");
      }
    } catch (error) {
      setIsSubmitting(false);
      const errorMessage = handleAuthError(error);
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
        Login to{" "}
        <Link
          to="/"
          className="hover:text-gray-600 transition-colors text-white"
        >
          BekoStore
        </Link>
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
            {...register("email", emailValidation)}
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
            {...register("password", passwordValidation)}
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

        {/* <PrimaryButton id="login-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex justify-center">
              <Spinner /> Logging in...
            </div>
          ) : (
            "Login"
          )}
        </PrimaryButton> */}

        {/* shad-cn loading button :
         <Button disabled>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
        */}
        <div className="flex justify-center">
          <Button disabled={isSubmitting} type="submit" className="w-full">
            {" "}
            {isSubmitting ? (
              <div className="flex items-center">
                <LoaderCircle className="animate-spin" />{" "}
                <p className="px-2 font-[700]">Please wait...</p>
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </div>
      <div className="text-gray-900 flex flex-col items-center text-center font-bold pt-10">
        <p className="mb-2">Don't you have an account yet?</p>
        <span>
          <Link to="/signup">
            SignUp <LogInIcon size={48} strokeWidth={3} />
          </Link>
        </span>
      </div>
    </form>
  );
};

export default LogIn;
