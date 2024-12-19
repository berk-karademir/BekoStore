import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { LogIn } from "lucide-react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { setUser, fetchRoles } from "../store/actions/clientActions";
import { Button } from "./ui/button";
import { nameValidation, emailValidation, passwordValidation, storeValidations } from "../validations/signupValidations";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [selectedRole, setSelectedRole] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  
  // Redux store'dan rolleri al
  const roles = useSelector(state => state.client.roles);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  // Roller yüklendiğinde varsayılan rolü ayarla
  useEffect(() => {
    if (roles.length > 0) {
      const defaultRole = roles.find(role => role.code === "customer");
      if (defaultRole) {
        setValue("role_id", defaultRole.id);
        setSelectedRole(defaultRole.code);
      }
    }
  }, [roles, setValue]);

  const onSubmit = async (data) => {
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

    try {
      const submitData = selectedRole === "store" ? storeData : essentialData;
      const response = await axios.post("https://workintech-fe-ecommerce.onrender.com/signup", submitData);
      dispatch(setUser({
        ...response.data,
        role: selectedRole
      }));
      
      toast.success("Registration successful! Check your email for verification.");
      history.push("/");
    } catch (error) {
      toast.error("Sign-up failed. Please check the form and try again.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-screen min-w-screen flex flex-col items-center text-[1rem] bg-gradient-to-t from-[#5431b3] via-[#66cad1] to-[#ca0a0a]"
      >
        <h2 className="text-3xl font-bold text-gray-800 py-10">
          Sign Up For <Link to="/" className="hover:text-gray-600 transition-colors text-white">BekoStore</Link>
        </h2>

        <div className=" rounded-xl shadow-[15px_15px_5px_1px_rgba(0,0,0,0.7)] bg-[#e7ebee] p-10">
          <div className="mb-4 w-64">
            <label className="block text-gray-700 font-medium mb-2">
              Name *
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name", nameValidation)}
              placeholder="Full Name"
            />
            {errors.name && (
              <span className="text-red-600 text-m font-semibold">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="mb-4 w-64">
            <label className="block text-gray-700 font-medium mb-2">
              Email address *
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", emailValidation)}
              placeholder="example@gmail.com"
            />
            {errors.email && (
              <span className="text-red-600 text-m font-semibold">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-4 w-64">
            <label className="block text-gray-700 font-medium mb-2">
              Password*
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", passwordValidation)}
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-600 text-m font-semibold">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="mb-4 w-64">
            <label className="block text-gray-700 font-medium mb-2">
              Confirm your password*
            </label>
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
              <span className="text-red-600 text-m font-semibold">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="mb-6 w-64">
            <label className="block text-gray-700 font-medium mb-2">
              Role*
            </label>
            <Controller
              name="role_id"
              control={control}
              defaultValue=""
              rules={{ required: "Please select a role" }}
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
                      selectedOption ? selectedOption.code : ""
                    );
                    setValue("role_id", e.target.value);
                  }}
                >
                  <option value="">Select a role</option>
                  {roles && roles.length > 0 ? (
                    roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>Loading roles...</option>
                  )}
                </select>
              )}
            />
            {errors.role_id && (
              <span className="text-red-600 text-m font-semibold">
                {errors.role_id.message}
              </span>
            )}
          </div>
          {selectedRole === "store" && (
            <>
              <div className="mb-4 w-64">
                <label className="block text-gray-700 font-medium mb-2">
                  Store Name*
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("storeName", storeValidations.storeName)}
                  placeholder="Store Name"
                />
                {errors.storeName && (
                  <span className="text-red-600 text-m font-semibold">
                    {errors.storeName.message}
                  </span>
                )}
              </div>

              <div className="mb-4 w-64">
                <label className="block text-gray-700 font-medium mb-2">
                  Store Phone*
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("storePhone", storeValidations.storePhone)}
                  placeholder="+90XXXXXXXXXX"
                />
                {errors.storePhone && (
                  <span className="text-red-600 text-m font-semibold">
                    {errors.storePhone.message}
                  </span>
                )}
              </div>

              <div className="mb-4 w-64">
                <label className="block text-gray-700 font-medium mb-2">
                  Store Tax ID*
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("storeTaxID", storeValidations.storeTaxID)}
                  placeholder="TXXXXVXXXXXX"
                />
                {errors.storeTaxID && (
                  <span className="text-red-600 text-m font-semibold">
                    {errors.storeTaxID.message}
                  </span>
                )}
              </div>

              <div className="mb-4 w-64">
                <label className="block text-gray-700 font-medium mb-2">
                  Store Bank Account (IBAN)*
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("storeBankAccount", storeValidations.storeBankAccount)}
                  placeholder="TRXXXXXXXXXXXXXX"
                />
                {errors.storeBankAccount && (
                  <span className="text-red-600 text-m font-semibold">
                    {errors.storeBankAccount.message}
                  </span>
                )}
              </div>
            </>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex justify-center">
                {" "}
                <Spinner /> {"Please Wait..."}{" "}
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>
        <div className="text-gray-900 flex flex-col items-center text-center font-bold pt-10">
          <p className="mb-2">Already have an account?</p>
          <span>
            <Link to="/login">
              Login <LogIn size={48} strokeWidth={3} />
            </Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default SignUp;
