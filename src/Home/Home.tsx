
import { useEffect, useState, useMemo } from "react";
import type { Pizza } from "../types/pizza,type";

interface HomeProps {
  addToCart: (item: {
    title: string;
    imageUrl: string;
    price: number;
    type: string;
    size: number;
  }) => void;
  selectedCategory: number | null;
}

type SortType = "rating" | "price" | "title";

export default function Home({ addToCart, selectedCategory }: HomeProps) {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: { type: number; size: number };
  }>({});
  const [sortType, setSortType] = useState<SortType>("rating");

  setSortType
  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching data:", err.message);
        setLoading(false);
      });
  }, []);

  const filteredPizzas = useMemo(() => {
    if (selectedCategory === null) {
      return pizzas;
    }
    return pizzas.filter((pizza) => pizza.category === selectedCategory);
  }, [pizzas, selectedCategory]);

  const sortedPizzas = useMemo(() => {
    const pizzasToSort = [...filteredPizzas];
    switch (sortType) {
      case "rating":
        return pizzasToSort.sort((a, b) => b.rating - a.rating);
      case "price":
        return pizzasToSort.sort((a, b) => a.price - b.price);
      case "title":
        return pizzasToSort.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return pizzasToSort;
    }
  }, [filteredPizzas, sortType]);

  const handleTypeChange = (pizzaId: string, type: number) => {
    const pizza = pizzas.find((p) => p.id.toString() === pizzaId);
    if (!pizza) return;

    setSelectedOptions((prev) => ({
      ...prev,
      [pizzaId]: {
        ...prev[pizzaId],
        type,
        size: prev[pizzaId]?.size || pizza.sizes[0],
      },
    }));
  };

  const handleSizeChange = (pizzaId: string, size: number) => {
    const pizza = pizzas.find((p) => p.id.toString() === pizzaId);
    if (!pizza) return;

    setSelectedOptions((prev) => ({
      ...prev,
      [pizzaId]: {
        ...prev[pizzaId],
        size,
        type: prev[pizzaId]?.type || (pizza.types.includes(0) ? 0 : 1),
      },
    }));
  };

  const handleAddToCart = (pizza: Pizza) => {
    const options = selectedOptions[pizza.id.toString()] || {
      type: pizza.types.includes(0) ? 0 : 1,
      size: pizza.sizes[0],
    };

    const typeName = options.type === 0 ? "тонкое" : "традиционное";

    let price = pizza.price;
    if (options.size === 30) price = Math.round(pizza.price * 1.2);
    if (options.size === 40) price = Math.round(pizza.price * 1.5);

    addToCart({
      title: pizza.title,
      imageUrl: pizza.imageUrl,
      price: price,
      type: typeName,
      size: options.size,
    });
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          fontSize: "24px",
          color: "#666",
        }}
      >
        <div
          style={{
            display: "inline-block",
            width: "50px",
            height: "50px",
            border: "5px solid #f3f3f3",
            borderTop: "5px solid #FE5F1E",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "20px",
          }}
        ></div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        <p>Загрузка пицц...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 60px 40px 60px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "800",
            color: "#181818",
            margin: 0,
          }}
        >
          {selectedCategory === null
            ? "Все пиццы"
            : selectedCategory === 0
            ? "Мясные пиццы"
            : selectedCategory === 1
            ? "Вегетарианские пиццы"
            : selectedCategory === 2
            ? "Гриль пиццы"
            : selectedCategory === 3
            ? "Острые пиццы"
            : selectedCategory === 4
            ? "Закрытые пиццы"
            : "Все пиццы"}
        </h1>

      </div>

      {sortedPizzas.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "100px 20px",
            fontSize: "20px",
            color: "#666",
            backgroundColor: "#f9f9f9",
            borderRadius: "20px",
            margin: "0 60px",
          }}
        >
          <p style={{ marginBottom: "20px", fontWeight: "600" }}>
            В этой категории пока нет пицц
          </p>
          <p style={{ color: "#999" }}>Попробуйте выбрать другую категорию</p>
        </div>
      ) : (
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "35px",
            padding: "0 20px",
          }}
        >
          {sortedPizzas.map((pizza) => {
            const options = selectedOptions[pizza.id.toString()] || {
              type: pizza.types.includes(0) ? 0 : 1,
              size: pizza.sizes[0],
            };

            const price = Math.round(
              pizza.price *
                (options.size === 30 ? 1.2 : options.size === 40 ? 1.5 : 1)
            );

            return (
              <div
                key={pizza.id}
                style={{
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  padding: "20px",
                  borderRadius: "15px",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0, 0, 0, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0, 0, 0, 0.05)";
                }}
              >
                <img
                  src={pizza.imageUrl}
                  alt={pizza.title}
                  style={{
                    width: "100%",
                    height: "240px",
                    objectFit: "contain",
                    borderRadius: "10px",
                    marginBottom: "15px",
                  }}
                />
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    margin: "10px 0",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#181818",
                    lineHeight: "1.3",
                  }}
                >
                  {pizza.title}
                </h3>

                <div
                  style={{
                    background: "#f3f3f3",
                    borderRadius: "10px",
                    padding: "6px",
                    marginBottom: "15px",
                  }}
                >
                  <div style={{ display: "flex", marginBottom: "6px" }}>
                    {pizza.types.includes(0) && (
                      <button
                        onClick={() => handleTypeChange(pizza.id.toString(), 0)}
                        style={{
                          flex: 1,
                          background:
                            options.type === 0 ? "white" : "transparent",
                          border: "none",
                          borderRadius: "5px",
                          padding: "8px 0",
                          fontWeight: "700",
                          cursor: "pointer",
                          fontSize: "14px",
                          transition: "all 0.2s",
                        }}
                      >
                        тонкое
                      </button>
                    )}
                    {pizza.types.includes(1) && (
                      <button
                        onClick={() => handleTypeChange(pizza.id.toString(), 1)}
                        style={{
                          flex: 1,
                          background:
                            options.type === 1 ? "white" : "transparent",
                          border: "none",
                          borderRadius: "5px",
                          padding: "8px 0",
                          fontWeight: "700",
                          cursor: "pointer",
                          fontSize: "14px",
                          transition: "all 0.2s",
                        }}
                      >
                        традиционное
                      </button>
                    )}
                  </div>

                  <div style={{ display: "flex" }}>
                    {[26, 30, 40].map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          handleSizeChange(pizza.id.toString(), size)
                        }
                        style={{
                          flex: 1,
                          background:
                            options.size === size ? "white" : "transparent",
                          border: "none",
                          borderRadius: "5px",
                          padding: "8px 0",
                          fontWeight: "700",
                          cursor: pizza.sizes.includes(size)
                            ? "pointer"
                            : "not-allowed",
                          opacity: pizza.sizes.includes(size) ? 1 : 0.5,
                          fontSize: "14px",
                          transition: "all 0.2s",
                        }}
                        disabled={!pizza.sizes.includes(size)}
                      >
                        {size} см.
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#181818",
                    }}
                  >
                    от {price} ₽
                  </span>

                  <button
                    onClick={() => handleAddToCart(pizza)}
                    style={{
                      border: "2px solid #fe5f1e",
                      background: "white",
                      color: "#fe5f1e",
                      borderRadius: "30px",
                      padding: "10px 20px",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "#fe5f1e";
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "white";
                      e.currentTarget.style.color = "#fe5f1e";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                    </svg>
                   + Добавить
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}