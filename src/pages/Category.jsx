import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Category = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  //fetching products based on category name
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`https://api.escuelajs.co/api/v1/products`);
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the products", error);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  //filtering products based on category name
  const filteredProducts = products.filter((product) => {
    if (categoryName.toLowerCase() === "all") return true;
    return product.category.name.toLowerCase() === categoryName.toLowerCase();
  });

  //filtering products based on search term
  const filteredProductsBySearch = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //function to handle add to cart
  const handleAddToCart = (product) => {
    console.log("Added to cart:", product.title);
  };

  return (
    <>
      <div className="p-16 mb-6">
        <h1 className="text-2xl font-semibold text-center mb-4">
          {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
        </h1>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-center rounded-lg border px-4 py-2 mb-4 w-72"
          />
        </div>

        {Loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {filteredProductsBySearch.length === 0 ? (
              <p className="text-center text-gray-500">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProductsBySearch.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Category;
