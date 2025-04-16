import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
  return (
    <>
    <Link to={`/product/${product.id}`} className="block w-full h-full">
      <div className="relative w-full p-3 rounded-2xl shadow hover:shadow-lg flex flex-col ">
        <div className="relative mb-4">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/150"}
            alt={product.title}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
              alert("Added to cart");
            }}
            className="absolute top-4 right-4 bg-white cursor-pointer rounded-full p-2 shadow hover:shadow-lg"
          >
            <FaPlus size={16} />
          </button>
          <span className="absolute bottom-6 left-2 bg-white/80 backdrop-blur-sm text-sm rounded-md px-2 py-0.5 shadow text-gray-700">
            {product.category?.name}
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
        <p className="text-sm text-gray-600 mb-1 line-clamp-2">{product.description}</p>
        <p className="text-md font-bold text-blue-600 mb-2">{product.price}$</p>
      </div>
    </Link>
    </>
  );
};

export default ProductCard;
