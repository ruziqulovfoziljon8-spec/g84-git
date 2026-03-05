
export interface Pizza {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  types: number[];
  sizes: number[];
  category: number;
  rating: number;
}

export interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count: number;
}

import Filtered from "../filtered/Filtered";

interface NavbarProps {
  totalCount: number;
  totalPrice: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  onCategoryChange: (category: number | null) => void;
}

export default function Navbar({
  totalCount,
  totalPrice,
  onCartClick,
  onLogoClick,
  onCategoryChange,
}: NavbarProps) {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          height: "130px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "80px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            onClick={onLogoClick}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              marginLeft: "50px",
              fontSize: "24px",
              fontWeight: "800",
              color: "#181818",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              transition: "0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #FE5F1E 0%, #FF7B4A 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "20px",
                fontWeight: "900",
                boxShadow: "0 4px 8px rgba(254, 95, 30, 0.3)",
              }}
            >
              R
            </div>
            REACT PIZZA
          </button>
        </div>

        <div
          style={{
            width: "50%",
            height: "80px",
            justifyContent: "end",
            alignItems: "center",
            display: "flex",
          }}
        >
          <button
            onClick={onCartClick}
            style={{
              width: "180px",
              height: "60px",
              backgroundColor: "#FE5F1E",
              border: "none",
              borderRadius: "40px",
              color: "white",
              marginRight: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "16px",
              transition: "0.2s",
              boxShadow: "0 4px 8px rgba(254, 95, 30, 0.2)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#ff6b3d";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 12px rgba(254, 95, 30, 0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#FE5F1E";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 8px rgba(254, 95, 30, 0.2)";
            }}
          >
            <span>{totalPrice} ₽</span>
            <div
              style={{
                width: "1px",
                height: "25px",
                backgroundColor: "rgba(255,255,255,0.25)",
              }}
            ></div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            </svg>
            <span>{totalCount}</span>
          </button>
        </div>
      </div>

      <Filtered onCategoryChange={onCategoryChange} />
    </>
  );
}
