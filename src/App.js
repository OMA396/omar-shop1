import React, { useState, useEffect } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import img from "./ChatGPT Image Mar 14, 2026, 09_51_56 PM.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductDetailsWrapper from "./components/ProductDetailsWrapper";

// 🔥 إضافات
import Login from "./components/login";
import Admin from "./components/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function removeFromCart(index) {
    const newCart = cart.filter((item, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  // ✅ تحميل المنتجات (API + الأدمن)
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        const localProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts([...data, ...localProducts]);
      });

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // ✅ حفظ منتجات الأدمن فقط
  useEffect(() => {
    const customProducts = products.filter(p => p.isCustom);
    localStorage.setItem("products", JSON.stringify(customProducts));
  }, [products]);

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <Router>
      <div className="app">

        {/* NAVBAR */}
        <nav className="nav">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />  

          <div>
            <a href="#products">Shop</a>
            <a href="#cart">Cart 🛒 ({cart.length})</a>
            <Link to="/login">Login</Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero-modern">
          <div className="h">
            <h1>Elevate Your Style</h1>
            <p>Minimal. Clean. Powerful.</p>
            <button className="btn">Shop Now</button>
          </div>
<img src={img} className="im" alt="hero" />
        </section>

        <Routes>
          {/* الصفحة الرئيسية */}
          <Route
            path="/"
            element={
              <section id="products" className="products">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id || product.title}
                    product={product}
                    addToCart={addToCart}
                  />
                ))}
              </section>
            }
          />

          {/* تفاصيل المنتج */}
          <Route
            path="/product/:id"
            element={<ProductDetailsWrapper addToCart={addToCart} />}
          />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin products={products} setProducts={setProducts} />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* CART */}
        <section id="cart">
          <Cart cart={cart} removeFromCart={removeFromCart} />
        </section>

      </div>
        <div id="contact">
          <h1 className="T">you can contact us by </h1>
          
          <button className="cbtn">press here </button>
        </div>
    </Router>
  );
}
