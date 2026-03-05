
import { useEffect, useState } from "react";

export default function Yetkazilganlar() {
  const [delivered, setDelivered] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/yetkazilganlar")
      .then((res) => res.json())
      .then((data) => setDelivered(data));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Yetkazilganlar</h2>

      {delivered.map((item) => (
        <div key={item.id} style={cardStyle}>
          <h3>{item.title}</h3>
          <h4>${item.price}</h4>
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  background: "#d9f7be",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "10px",
};
