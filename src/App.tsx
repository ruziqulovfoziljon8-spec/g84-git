import imgg from "../src/assets/images/imgg.png";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Cart from "./card/Cart";
import Filtered from "./filtered/Filtered";
import Home from "./Home/Home";
import Login from "./admin.page/Login";
import Dashboard from "./admin.page/Dashboard";

interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count: number;
}

function App() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleUpdateCount = (id: string, count: number) => {
    if (count < 1) {
      handleRemoveFromCart(id);
      return;
    }

    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, count } : item))
    );
  };

  const handleBackFromCart = () => {
    setShowCart(false);
  };

  const handleAddToCart = (item: {
    title: string;
    imageUrl: string;
    price: number;
    type: string;
    size: number;
  }) => {
    const existingItem = cartItems.find(
      (cartItem) =>
        cartItem.title === item.title &&
        cartItem.type === item.type &&
        cartItem.size === item.size
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === existingItem.id
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        )
      );
    } else {
      const newItem: CartItem = {
        id: Math.random().toString(36).substring(2, 9),
        ...item,
        count: 1,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  return (
    <Routes>
      {/* MAIN PAGE */}
      <Route
        path="/"
        element={
          <div className="App">
            <header
              style={{
                padding: "20px 60px",
                borderBottom: "1px solid #f0f0f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={imgg}
                  alt=""
                />
                <div>
                  <h1
                    style={{ margin: 0, fontSize: "24px", fontWeight: "800" }}
                  >
                    REACT PIZZA
                  </h1>
                  <p style={{ margin: 0, color: "#777" }}>
                    самая вкусная пицца во вселенной
                  </p>
                </div>
              </div>

              {/* ADMIN BUTTON */}
              <button
                onClick={() => navigate("/login")}
                style={{
                  width: "150px",
                  height: "50px",
                  backgroundColor: "#FE5F1E",
                  border: "none",
                  borderRadius: "30px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Admin panel
              </button>

              {/* CART BUTTON */}
              <button
                onClick={() => setShowCart(!showCart)}
                style={{
                  width: "150px",
                  height: "50px",
                  backgroundColor: "#FE5F1E",
                  border: "none",
                  borderRadius: "30px",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "16px",
                }}
              >
                {cartTotal} ₽ | {cartCount}
              </button>
            </header>

            {showCart ? (
              <Cart
                items={cartItems}
                onRemove={handleRemoveFromCart}
                onClear={handleClearCart}
                onUpdateCount={handleUpdateCount}
                onBack={handleBackFromCart}
              />
            ) : (
              <>
                <Filtered onCategoryChange={setSelectedCategory} />
                <Home
                  addToCart={handleAddToCart}
                  selectedCategory={selectedCategory}
                />
              </>
            )}
          </div>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
