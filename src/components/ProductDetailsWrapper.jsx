import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";

export default function ProductDetailsWrapper({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  return <ProductDetails product={product} addToCart={addToCart} />;
}