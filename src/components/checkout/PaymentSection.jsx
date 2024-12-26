import React from 'react';
import { Info } from 'lucide-react';

function PaymentSection({ 
  cardInfo, 
  setCardInfo, 
  acceptTerms, 
  setAcceptTerms,
  errors,
  formatCardNumber 
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">2. Payment Options</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.cardNumber ? 'border-red-500' : ''
              }`}
              placeholder="0000 0000 0000 0000"
              maxLength="19"
              value={cardInfo.cardNumber}
              onChange={(e) => setCardInfo({
                ...cardInfo,
                cardNumber: formatCardNumber(e.target.value)
              })}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select 
                  className={`px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    errors.expiry ? 'border-red-500' : ''
                  }`}
                  value={cardInfo.expiryMonth}
                  onChange={(e) => setCardInfo({...cardInfo, expiryMonth: e.target.value})}
                >
                  <option value="">Month</option>
                  {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                    <option key={month} value={month.toString().padStart(2, '0')}>
                      {month.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <select 
                  className={`px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                    errors.expiry ? 'border-red-500' : ''
                  }`}
                  value={cardInfo.expiryYear}
                  onChange={(e) => setCardInfo({...cardInfo, expiryYear: e.target.value})}
                >
                  <option value="">Year</option>
                  {Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              {errors.expiry && (
                <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
                <span className="inline-block ml-1 text-gray-400 cursor-help">
                  <Info size={16} />
                </span>
              </label>
              <input
                type="password"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  errors.cvv ? 'border-red-500' : ''
                }`}
                placeholder="000"
                maxLength="4"
                value={cardInfo.cvv}
                onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="3dsecure"
            checked={cardInfo.use3DSecure}
            onChange={(e) => setCardInfo({...cardInfo, use3DSecure: e.target.checked})}
            className="rounded text-blue-500 focus:ring-blue-500"
          />
          <label htmlFor="3dsecure" className="text-sm text-gray-700">
            I want to pay with 3D Secure
          </label>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="terms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className={`rounded focus:ring-blue-500 ${
              errors.terms ? 'border-red-500' : ''
            }`}
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I have read and accept the terms and conditions
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms}</p>
        )}
      </div>
    </div>
  );
}

export default PaymentSection; 