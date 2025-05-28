import React from 'react';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const { state } = useLocation();
  const cartItems = state?.cartItems || state?.product ? [state.product] : [];

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold text-lg">
        No items selected for checkout
      </div>
    );
  }

  const calculateItemTotal = (item) => {
    const qty = item.quantity || 1;
    return (qty * item.price * 133 * (1 - item.discount / 100)).toFixed(0);
  };

  const grandTotal = cartItems
    .reduce(
      (sum, item) =>
        sum + (item.quantity || 1) * item.price * 133 * (1 - item.discount / 100),
      0
    )
    .toFixed(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2 gap-0">
        
        {/* Order Summary */}
        <div className="p-10">
          <h2 className="text-4xl font-bold text-pink-800 mb-8">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 mb-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg shadow-sm border"
              />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                <p className="text-lg text-pink-700 font-bold">
                  Rs. {calculateItemTotal(item)}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t pt-4 mt-6">
            <p className="text-2xl text-pink-800 font-bold">Total: Rs. {grandTotal}</p>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-pink-50 p-10">
          <h2 className="text-4xl font-bold text-pink-800 mb-8">Payment</h2>
          <div className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                placeholder="123 Main St, City"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="pt-4 border-t mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                placeholder="1234 1234 1234 1234"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <div className="flex gap-4 mt-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-1/2 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <label className="flex items-center mt-2 text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                Billing address same as shipping
              </label>
            </div>

            <button className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl text-lg font-semibold transition">
              Confirm & Pay
            </button>
          </div>
          <div className="text-center text-xs text-gray-500 mt-6">
            Powered by Aromara | <a href="#" className="underline">Terms</a> | <a href="#" className="underline">Privacy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
