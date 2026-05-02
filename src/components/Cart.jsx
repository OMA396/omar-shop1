import "./card.css"

export default function Cart({ cart, removeFromCart }) {
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart">
      <h2>Your Cart 🛒</h2>

      {cart.map((item, index) => (
        <div className="cart-item" key={index}>
<img src={item.image} alt={item.title} />

          <div className="cart-info">
            <div className="cart-title">{item.title}</div>
            <div className="cart-price">${item.price}</div>
          </div>

          <button
            className="remove-btn"
            onClick={() => removeFromCart(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="cart-total">
        Total: ${total}
      </div>
    </div>
  );
}
