import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import "./admin.css"; // 🔥 ضيفنا ملف السي اس اس

export default function Admin({ products, setProducts }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: ""
  });

  const [editIndex, setEditIndex] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title || !form.price || !form.image) return;

    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = form;
      setProducts(updated);
      setEditIndex(null);
    } else {
      const newProduct = {
        ...form,
        id: Date.now(),
        isCustom: true // 🔥 مهم جداً
      };

      setProducts([...products, newProduct]);
    }

    setForm({ title: "", price: "", image: "" });
  }

  function deleteProduct(index) {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  }

  function editProduct(index) {
    setForm(products[index]);
    setEditIndex(index);
  }

  return (
    <div className="admin-container">
      <h1>Admin Panel 🔥</h1>

      {/* زرار العودة */}
      <button onClick={() => navigate("/")} className="back-btn">⬅ Back</button>

      {/* الفورم */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button type="submit" className="admin-form-btn">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      {/* شبكة المنتجات */}
      <div className="products-grid">
        {products.map((product, index) => (
          <div className="card" key={product.id || index}>
            <ProductCard product={product} />

            <div className="card-buttons">
              <button onClick={() => editProduct(index)} className="edit-btn">Edit</button>
              <button onClick={() => deleteProduct(index)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}