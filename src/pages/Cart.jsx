import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, addToOrders } = useCart();
  const navigate = useNavigate();

  const handleCheckOut = () => {
    cartItems.forEach((item) => addToOrders(item));
    clearCart(); 
    navigate("/my-orders");
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-lg font-semibold">🛒 Your cart is empty</p>
        <Link to="/category/all" className="text-blue-500 hover:underline mt-2">
          Continue with Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between mb-4 p-4 border rounded-lg shadow-sm"
        >
          <div className="flex items-center">
            <img
              src={item.images?.[0]}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-lg mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">₹{item.price}</p>
              <div className="flex items-center mt-2 gap-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  -
                </button>
                <span className="text-md">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-6 p-4 border-t">
        <h2 className="text-xl font-semibold">Total: ₹{total}</h2>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckOut}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
