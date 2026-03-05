
import { useState } from "react";

interface FilteredProps {
  onCategoryChange: (category: number | null) => void;
}

export default function Filtered({ onCategoryChange }: FilteredProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const buttons = [
    { label: "Все", width: 85, category: null },
    { label: "Мясные", width: 140, category: 0 },
    { label: "Вегетарианская", width: 200, category: 1 },
    { label: "Гриль", width: 110, category: 2 },
    { label: "Острые", width: 120, category: 3 },
    { label: "Закрытые", width: 150, category: 4 },
  ];

  const handleCategoryClick = (category: number | null) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 50px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleCategoryClick(btn.category)}
            style={{
              width: `${btn.width}px`,
              height: "50px",
              borderRadius: "30px",
              border: "none",
              backgroundColor:
                activeCategory === btn.category ? "black" : "#f9f9f9",
              color: activeCategory === btn.category ? "white" : "black",
              cursor: "pointer",
              transition: "0.3s",
              fontWeight: "700",
              fontSize: "16px",
              boxShadow:
                activeCategory === btn.category
                  ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                  : "none",
            }}
            onMouseOver={(e) => {
              if (activeCategory !== btn.category) {
                e.currentTarget.style.backgroundColor = "#e8e8e8";
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseOut={(e) => {
              if (activeCategory !== btn.category) {
                e.currentTarget.style.backgroundColor = "#f9f9f9";
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>


      </div>
    </div>
  );
}
