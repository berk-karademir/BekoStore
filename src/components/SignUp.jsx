import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const history = useHistory();
  const api = axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com",
  });

  const fetchRoles = async () => {
    try {
      const response = await api.get("/roles");
      setRoles(response.data);

      const defaultRole = response.data.find(
        (role) => role.code === "customer"
      );
      if (defaultRole) {
        setValue("role_id", defaultRole.id);
        setSelectedRole(defaultRole.code);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const onSubmit = async (data) => {

    console.log("Submitting data before submit:", data);

    const essentialData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: data.role_id,
    };

    const storeData = {
      ...essentialData,
      store: {
        name: data.storeName,
        phone: data.storePhone,
        tax_no: data.storeTaxID,
        bank_account: data.storeBankAccount,
      },
    };

    if (selectedRole === "store") {
      try {
        await api.post("/signup", storeData);
        console.log("storeData submit successful :>>>", storeData);
        alert("You need to click the link in your email to activate your account!");
        history.push("/");
      } catch (error) {
        console.error("Sign-up error:", error);
        alert("Sign-up failed. Please check the form and try again.");
      }
    } else {
      try {
        await api.post("/signup", essentialData);
        console.log("essentialData submit successful :>>>", storeData);
        alert("You need to click the link in your email to activate your account!");
        history.push("/");
      } catch (error) {
        console.error("Sign-up error:", error);
        alert("Sign-up failed. Please check the form and try again.");
      }
    }
  };

  useEffect(() => {
    console.log("Updated Selected Role:", selectedRole);
  }, [selectedRole]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-t from-[#a1afbb] to-[#0178ff9c] text-[1rem]"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up For BekoStore</h2>

      <div className="mb-4 w-72">
        <label className="block text-gray-700 font-medium mb-2">Name *</label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("name", {
            required: "Name is required!",
            minLength: {
              value: 3,
              message: "Your name must be at least 3 characters long.",
            },
          })}
          placeholder="Full Name"
        />
        {errors.name && <span className="text-red-500 text-m font-semibold">{errors.name.message}</span>}
      </div>

      <div className="mb-4 w-72">
        <label className="block text-gray-700 font-medium mb-2">Email address *</label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("email", {
            required: "Email is required!",
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: "Invalid email format!",
            },
          })}
          placeholder="example@gmail.com"
        />
        {errors.email && <span className="text-red-500 text-m font-semibold">{errors.email.message}</span>}
      </div>

      <div className="mb-4 w-72">
        <label className="block text-gray-700 font-medium mb-2">Password*</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("password", {
            required: "Password is required!",
            minLength: 8,
            validate: {
              includesNumber: (value) =>
                /\d/.test(value) || "Password must include a number",
              includesLowercase: (value) =>
                /[a-z]/.test(value) || "Password must include a lowercase letter",
              includesUppercase: (value) =>
                /[A-Z]/.test(value) || "Password must include an uppercase letter",
              includesSpecialChar: (value) =>
                /[!@#$%^&*]/.test(value) || "Password must include a special character",
            },
          })}
          placeholder="Password"
        />
        {errors.password && <span className="text-red-500 text-m font-semibold">{errors.password.message}</span>}
      </div>

      <div className="mb-4 w-72">
        <label className="block text-gray-700 font-medium mb-2">Confirm your password*</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("confirmPassword", {
            validate: (value) =>
              value === watch("password") || "Passwords do not match!",
          })}
          placeholder="Confirm Your Password"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-m font-semibold">{errors.confirmPassword.message}</span>
        )}
      </div>

      <div className="mb-6 w-72">
        <label className="block text-gray-700 font-medium mb-2">Role*</label>
        <Controller
          name="role_id"
          control={control}
          defaultValue="customer"
          render={({ field }) => (
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...field}
              onChange={(e) => {
                e.preventDefault();
                const selectedOption = roles.find(
                  (role) => role.id === Number(e.target.value)
                );
                setSelectedRole(
                  selectedOption ? selectedOption.code : "customer"
                );
                setValue("role_id", e.target.value);
              }}
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-72 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </button>
      <div className="text-center py-10 font-bold">
        <p>Already have an account?</p>
        <span className="underline"> <Link to="/login">Login</Link></span>
      </div>
    </form>
  );
};

export default SignUp;
