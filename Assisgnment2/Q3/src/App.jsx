
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load products");
        setLoading(false);
      });
  }, []);

  function addToCart(product) {
    const item = cart.find((p) => p.id === product.id);

    if (item) {
      setCart(
        cart.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function changeQuantity(id, amount) {
    setCart(
      cart.map((p) =>
        p.id === id
          ? { ...p, quantity: Math.max(1, p.quantity + amount) }
          : p
      )
    );
  }

  function removeItem(id) {
    setCart(cart.filter((p) => p.id !== id));
  }

  const total = cart.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  if (loading) return <h2>Loading products...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="container">
      <h1>Shopping Cart</h1>

      <h2>Products</h2>

      <div className="products">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <img src={p.image} alt={p.title} />
            <h4>{p.title}</h4>
            <p>${p.price.toFixed(2)}</p>
            <button onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((p) => (
        <div className="cart-item" key={p.id}>
          <span>{p.title} - ${p.price.toFixed(2)}</span>

          <button onClick={() => changeQuantity(p.id, -1)}>
            -
          </button>

          <span>{p.quantity}</span>

          <button onClick={() => changeQuantity(p.id, 1)}>
            +
          </button>

          <button onClick={() => removeItem(p.id)}>
            Remove
          </button>

          <p>
            Subtotal: ${(p.price * p.quantity).toFixed(2)}
          </p>
        </div>
      ))}

      <h2>Total: ${total.toFixed(2)}</h2>
    </div>
  );
}

export default App;
