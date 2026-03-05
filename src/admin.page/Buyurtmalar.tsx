import { useEffect, useState } from "react";

export default function Buyurtmalar() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/buyurtmalar")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Buyurtma Qilinganlar</h2>

      {orders.map((order) => (
        <div key={order.id} style={card}>
          <h3>{order.title}</h3>
          <h4>${order.price}</h4>
        </div>
      ))}
    </div>
  );
}

const card = {
  background: "#eee",
  padding: "20px",
  marginBottom: "10px",
  borderRadius: "10px",
};
