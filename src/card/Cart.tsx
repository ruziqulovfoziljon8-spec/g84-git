
import img22 from '../assets/images/img22.png'
import { useState, useEffect } from "react";

export interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count: number;
}

interface CartProps {
  items?: CartItem[];
  onRemove?: (id: string) => void;
  onClear?: () => void;
  onUpdateCount?: (id: string, count: number) => void;
  onBack?: () => void;
}

const mockCartItems: CartItem[] = [
  {
    id: "1",
    title: "Сырный цыпленок",
    imageUrl: "https://example.com/cheese-chicken.jpg",
    price: 770,
    type: "тонкое тесто",
    size: 26,
    count: 2,
  },
  {
    id: "2",
    title: "Креветки по-азиатски",
    imageUrl: "https://example.com/asian-shrimp.jpg",
    price: 290,
    type: "толстое тесто",
    size: 40,
    count: 1,
  },
  {
    id: "3",
    title: "Чизбургер-пицца",
    imageUrl: "https://example.com/cheeseburger.jpg",
    price: 350,
    type: "тонкое тесто",
    size: 30,
    count: 3,
  },
];

const EmptyCartIcon = () => (
  <svg
    width="300"
    height="255"
    viewBox="0 0 300 255"
    fill="none"
    style={{ marginBottom: "40px" }}
  >
   
  </svg>
);

export default function Cart({
  items = mockCartItems,
  onRemove = (id: string) => console.log("Remove item:", id),
  onClear = () => console.log("Clear cart"),
  onUpdateCount = (id: string, count: number) =>
    console.log("Update count:", id, count),
  onBack = () => console.log("Go back"),
}: CartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(items);

  useEffect(() => {
    setCartItems(items);
  }, [items]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );
  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  const handleRemove = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    onRemove(id);
  };

  const handleClear = () => {
    setCartItems([]);
    onClear();
  };

  const handleUpdateCount = (id: string, count: number) => {
    if (count < 1) {
      handleRemove(id);
      return;
    }
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, count } : item))
    );
    onUpdateCount(id, count);
  };

  const handleBack = () => onBack();

  if (cartItems.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px 0",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{ marginBottom: "20px", fontSize: "32px", fontWeight: "700" }}
        >
          Корзина пустая 😕
        </h2>
        <p
          style={{
            color: "#777",
            marginBottom: "40px",
            fontSize: "18px",
            lineHeight: "1.5",
          }}
        >
          Вероятней всего, вы не заказывали ещё пиццу. <br /> Для того, чтобы
          заказать пиццу, перейди на главную страницу.
        </p>
        <EmptyCartIcon />
        <button
          onClick={handleBack}
          style={{
            border: "none",
            background: "#282828",
            color: "white",
            borderRadius: "30px",
            padding: "15px 40px",
            fontWeight: "700",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Вернуться назад
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 60px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <img style={{width:'30px',height:'30px'}} src={img22} alt="" />
        <h1 style={{ fontSize: "32px", fontWeight: "700", marginRight:'850px' }}>Корзина</h1>
        <button
          onClick={handleClear}
          style={{
            border: "none",
            background: "#f5f5f5",
            color: "#fe5f1e",
            padding: "10px 20px",
            borderRadius: "30px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Очистить корзину
        </button>
      </div>

      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 0",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
            <div>
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "700" }}>
                {item.title}
              </h3>
              <p style={{ margin: 0, color: "#777" }}>
                {item.type}, {item.size} см.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button
              onClick={() => handleUpdateCount(item.id, item.count - 1)}
              style={{
                width: "32px",
                height: "32px",
                border: "2px solid #fe5f1e",
                borderRadius: "50%",
                background: "white",
                color: "#fe5f1e",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              -
            </button>
            <span
              style={{
                minWidth: "30px",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              {item.count}
            </span>
            <button
              onClick={() => handleUpdateCount(item.id, item.count + 1)}
              style={{
                width: "32px",
                height: "32px",
                border: "2px solid #fe5f1e",
                borderRadius: "50%",
                background: "white",
                color: "#fe5f1e",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              +
            </button>
            <span
              style={{
                minWidth: "100px",
                textAlign: "right",
                fontWeight: "700",
              }}
            >
              {item.price * item.count} ₽
            </span>
            <button
              onClick={() => handleRemove(item.id)}
              style={{
                width: "32px",
                height: "32px",
                border: "2px solid #d7d7d7",
                borderRadius: "50%",
                background: "white",
                color: "#d7d7d7",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              ×
            </button>
          </div>
        </div>
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "40px",
          alignItems: "center",
        }}
      >
        <div>
          <p style={{ margin: 0 }}>
            Всего пицц: <b>{totalCount} шт.</b>
          </p>
          <p style={{ margin: 0 }}>
            Сумма заказа: <b style={{ color: "#fe5f1e" }}>{totalPrice} ₽</b>
          </p>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <button
            onClick={handleBack}
            style={{
              border: "1px solid #ddd",
              background: "white",
              padding: "10px 20px",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Вернуться назад
          </button>
          <button
            onClick={() => {
              alert(`Оплата успешна! Сумма: ${totalPrice} ₽`);
              handleClear();
            }}
            style={{
              border: "none",
              background: "#fe5f1e",
              color: "white",
              padding: "10px 20px",
              borderRadius: "30px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Оплатить сейчас
          </button>
        </div>
      </div>
    </div>
  );
}

