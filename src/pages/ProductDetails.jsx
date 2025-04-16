import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";  


const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Products not found</p>
      </div>
    );
  }

  return (
    <>
      <div className=" flex flex-col items-center w-full mx-auto p-4 mb-6">
        <h1 className="text-2xl font-semibold text-center mb-4">
          {product.title}
        </h1>
        <div className="flex w-full justify-center mb-4">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-lg h-64 object-cover rounded-xl mb-4"
          />
        </div>
        <div className="flex-1 text-center">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-blue-600 mb-4">
            ₹{product.price}
          </p>
          <p className="text-sm bg-gray-200 inline-block px-2 py-1 rounded mb-4">
            Category: {product.category?.name}
          </p>
          <div>
            <button
              onClick={() => {
                addToCart(product);
                alert("Added to cart");}}
             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
