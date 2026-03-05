import { useEffect, useState } from "react";

interface Pizza {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
}

export default function Mahsulotlar() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3001/pizzas")
      .then((res) => res.json())
      .then((data) => setPizzas(data));
  };

  // DELETE
  const deletePizza = async (id: number) => {
    await fetch(`http://localhost:3001/pizzas/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  // EDIT
  const saveEdit = async (id: number) => {
    await fetch(`http://localhost:3001/pizzas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });

    setEditId(null);
    fetchData();
  };

  // BUYURTMA BERISH
  const orderPizza = async (pizza: Pizza) => {
    await fetch("http://localhost:3001/buyurtmalar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pizza),
    });

    alert("Buyurtma berildi ✅");
  };

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {pizzas.map((pizza) => (
        <div key={pizza.id} style={card}>
          <img src={pizza.imageUrl} style={{ width: "100%" }} />

          {editId === pizza.id ? (
            <>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button onClick={() => saveEdit(pizza.id)}>Saqlash</button>
            </>
          ) : (
            <>
              <h3>{pizza.title}</h3>
              <p>{pizza.type}</p>
              <h4>${pizza.price}</h4>
            </>
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button onClick={() => deletePizza(pizza.id)}>❌</button>
            <button
              onClick={() => {
                setEditId(pizza.id);
                setNewTitle(pizza.title);
              }}
            >
              ✏️
            </button>
            <button onClick={() => orderPizza(pizza)}>🚚</button>
          </div>
        </div>
      ))}
    </div>
  );
}

const card = {
  width: "250px",
  background: "#1f2937",
  color: "white",
  padding: "20px",
  borderRadius: "15px",
};
