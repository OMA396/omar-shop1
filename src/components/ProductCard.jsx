import "./productcard.css";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <img src={product.image} alt="Product" />

      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>

        <p className="card-price">${product.price}</p>

        <p className="card-description" >
          {product.description}
        </p>

        <button
          className="card-button"
          onClick={(e) => { 
            e.stopPropagation(); // عشان الضغط على الزر مش يفتح صفحة التفاصيل
            addToCart(product);
          }}
        >
          Add to Cart
        </button>
        <button  onClick={() => navigate(`/product/${product.id}`)}> DETAILS</button>
      </div>
    </div>
  );
}

export default ProductCard;