import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const MyOrders = () => {
  const { orders } = useCart(); // Accessing orders from CartContext

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="border rounded-lg shadow hover:shadow-lg transition duration-200 p-4"
            >
              <img
                src={order.images}
                alt={order.title}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="mt-4 text-lg font-semibold">{order.title}</h2>
              <p className="text-gray-600">₹{order.price}</p>
              <p className="text-sm font-medium mt-2 text-green-600">
                Status: Ordered
              </p>
              <Link
                to={`/product/${order.id}`}
                className="mt-3 inline-block text-blue-500 hover:underline text-sm"
              >
                View Order
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
