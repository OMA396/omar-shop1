import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ مهم جداً
import "./ProductDetails.css"
export default function ProductDetails({ product, addToCart }) {
  const navigate = useNavigate(); // ✅ لازم قبل استخدام navigate

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} className="product-img"/>
      <div className="details-info">
        <h1>{product.title}</h1>
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>

        <button onClick={() => addToCart(product)} className="btn">
          Add to Cart 🛒
        </button>

        {/* زر الخروج */}
        <button  
          onClick={() => navigate("/")} // ✅ هيرجع الصفحة الرئيسية
          className="btn-exit-top"
          style={{ marginTop: "10px", }}
          
          
        >
       X
        </button>
      </div>
    </div>
  );
}