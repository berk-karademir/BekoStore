import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { fetchRoles, logout } from "../store/actions/clientActions";

const Profile = () => {
  const user = useSelector((state) => state.client.user);
  const roles = useSelector((state) => state.client.roles);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  console.log("Current user data:", user);

  // If no user is logged in, redirect to login
  React.useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      console.log("No user found, redirecting to login");
      history.push("/login");
    }
  }, [user, history]);

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");  // Redirect to home page instead of login
  };

  // Show loading state while checking user
  if (!user || Object.keys(user).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-[#5431b3] via-[#66cad1] to-[#ca0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Get role name from role_id
  const getUserRole = () => {
    if (!roles || roles.length === 0) return "Loading...";
    const userRole = roles.find(role => role.id === Number(user.role_id));
    return userRole ? userRole.name : "Unknown Role";
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#5431b3] via-[#66cad1] to-[#ca0a0a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <User size={64} className="text-gray-700" />
          </div>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
          </div>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-lg text-gray-800">{user.name}</p>
            </div>
            <div className="border-b pb-4">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-lg text-gray-800">{user.email}</p>
            </div>
            <div className="border-b pb-4">
              <p className="text-sm font-medium text-gray-500">Role</p>
              <p className="text-lg text-gray-800 capitalize">{getUserRole()}</p>
            </div>
            {user.store && (
              <>
                <div className="border-b pb-4">
                  <p className="text-sm font-medium text-gray-500">Store Name</p>
                  <p className="text-lg text-gray-800">{user.store.name}</p>
                </div>
                <div className="border-b pb-4">
                  <p className="text-sm font-medium text-gray-500">Store Phone</p>
                  <p className="text-lg text-gray-800">{user.store.phone}</p>
                </div>
                <div className="border-b pb-4">
                  <p className="text-sm font-medium text-gray-500">Tax ID</p>
                  <p className="text-lg text-gray-800">{user.store.tax_no}</p>
                </div>
                <div className="pb-4">
                  <p className="text-sm font-medium text-gray-500">Bank Account</p>
                  <p className="text-lg text-gray-800">{user.store.bank_account}</p>
                </div>
              </>
            )}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <LogOut size={20} />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
