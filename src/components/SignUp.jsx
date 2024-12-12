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

      // Varsayılan rol 'customer' olarak ayarlanıyor
      const defaultRole = response.data.find(
        (role) => role.code === "customer"
      );
      if (defaultRole) {
        setValue("role_id", defaultRole.id); // Form state için varsayılan değer
        setSelectedRole(defaultRole.code); // Seçim için varsayılan değer
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
        console.log("Data submit successful :>>>", data);
        alert(
          "You need to click the link in your email to activate your account!"
        );
        history.push("/")
      } catch (error) {
        console.error("Sign-up error:", error);
        alert("Sign-up failed. Please check the form and try again.");
      }
    } else {
      try {
        await api.post("/signup", essentialData);
        console.log("Data submit successful :>>>", data);
        alert(
          "You need to click the link in your email to activate your account!"
        );
        history.push("/")
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
        className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-t from-[#ff4040] to-[#096bff9c] text-[1.1rem]"
      >
        <h2>Sign Up BekoStore</h2>

        {/* Name Field */}
        <div>
          <label>Name:</label>
          <br />
          <input
            className="rounded-"
            {...register("name", { required: "Name is required", minLength: {
              value: 3,
              message:"Your name must be at least 3 characters long",
            } })}
            placeholder="Your name"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        {/* Email Field */}
        <div>
          <label>Email:</label>
          <br />
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Your email"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        {/* Password Fields */}
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: 8,
              validate: {
                includesNumber: (value) =>
                  /\d/.test(value) || "Password must include a number",
                 includesLowercase: (value) =>
                /[a-z]/.test(value) ||
                "Password must include a lowercase letter",
              includesUppercase: (value) =>
                /[A-Z]/.test(value) ||
                "Password must include an uppercase letter",
              includesSpecialChar: (value) =>
                /[!@#$%^&*]/.test(value) ||
                "Password must include a special character",
            },
          })}
          placeholder="Your password"
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <label>Confirm Password:</label>
        <br />
        <input
          type="password"
          {...register("confirmPassword", {
            validate: (value) =>
              value === watch("password") || "Passwords do not match!",
          })}
          placeholder="Confirm password"
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </div>

      {/* Role Selection */}
      <div>
        <label>Role:</label>
        <br />
        <Controller
          name="role_id"
          control={control}
          defaultValue="customer"
          render={({ field }) => (
            <select
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

      {/* Store-Specific Fields */}
      {selectedRole === "store" && (
        <>
          <div>
            <label>Store Name:</label>
            <input
              {...register("storeName", {
                required: "Store name is required",
                minLength: {
                  value:3,
                  message:"Your store's name must be at least 3 characters long"
                }
              })}
              placeholder="(min 3 characters)"
            />
            {errors.storeName && <span>{errors.storeName.message}</span>}
          </div>
          <div>
            <label>Store Phone:</label>
            <input
              {...register("storePhone", {
                required: "Store phone is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number",
                },
              })}
              placeholder="Store phone"
            />
            {errors.storePhone && <span>{errors.storePhone.message}</span>}
          </div>
          <div>
            <label>Store Tax ID:</label>
            <input
              {...register("storeTaxID", {
                required: "Tax ID is required",
                pattern: {
                  value: /^T\d{4}V\d{6}$/,
                  message: "Invalid Tax ID format",
                },
              })}
              placeholder="Tax ID (e.g., T1234V123456)"
            />
            {errors.storeTaxID && <span>{errors.storeTaxID.message}</span>}
          </div>
          <div>
            <label>Store Bank Account:</label>
            <input
              {...register("storeBankAccount", {
                required: "Bank account is required",
                pattern: {
                  value: /^[A-Z0-9]{14,34}$/,
                  message: "Invalid IBAN format",
                },
              })}
              placeholder="IBAN"
            />
            {errors.storeBankAccount && (
              <span>{errors.storeBankAccount.message}</span>
            )}
          </div>
        </>
      )}

      {/* Submit Button */}
      <button
  type="submit"
  disabled={isSubmitting}
  className="m-10 py-1 px-10 bg-[#23A6F0] rounded-md text-white font-[600] flex items-center justify-center"
>
  {isSubmitting && (
    <svg
      className="animate-spin h-6 w-6 text-white mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      ></path>
    </svg>
  )}
  {isSubmitting ? "Submitting..." : "Sign Up"}
</button>

      <div className="text-center text-2xl font-[700] text-white">
        <p>Already signed up? </p>
        <Link to="/login">Log in</Link>
      </div>
    </form>
    
  
);
}
export default SignUp