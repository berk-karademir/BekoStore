import React from 'react';
import { Loader } from 'lucide-react';
import AddressForm from '../AddressForm';

function AddressSection({ 
  addresses, 
  selectedAddress, 
  setSelectedAddress, 
  showAddressForm, 
  setShowAddressForm,
  editAddress,
  setEditAddress,
  isLoading,
  handleDeleteAddress,
  fetchAddresses,
  errors 
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">1. Address Information</h2>
        <button 
          onClick={() => setShowAddressForm(true)}
          className="text-blue-500 hover:text-blue-600"
          disabled={isLoading.addresses}
        >
          {isLoading.addresses ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            'Add New Address'
          )}
        </button>
      </div>

      {errors.address && (
        <p className="text-red-500 text-sm mb-2">{errors.address}</p>
      )}

      {!Array.isArray(addresses) || addresses.length === 0 ? (
        <p className="text-gray-500">No saved addresses found.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map(address => (
            <div 
              key={address.id || Math.random()}
              className={`border p-4 rounded cursor-pointer ${
                selectedAddress?.id === address.id ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedAddress(address)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{address.title}</span>
                <div className="space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditAddress(address);
                      setShowAddressForm(true);
                    }}
                    className="text-blue-500 hover:text-blue-600"
                    disabled={isLoading.deleteAddress}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(address.id);
                    }}
                    className="text-red-500 hover:text-red-600"
                    disabled={isLoading.deleteAddress}
                  >
                    {isLoading.deleteAddress ? (
                      <Loader className="animate-spin" size={16} />
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
              <p className="text-gray-600">
                {address.name} {address.surname}
                <br />
                {address.neighborhood}, {address.district}/{address.city}
                <br />
                {address.phone}
              </p>
            </div>
          ))}
        </div>
      )}

      {showAddressForm && (
        <AddressForm
          onClose={() => {
            setShowAddressForm(false);
            setEditAddress(null);
          }}
          editAddress={editAddress}
          onAddressUpdate={fetchAddresses}
        />
      )}
    </div>
  );
}

export default AddressSection; 