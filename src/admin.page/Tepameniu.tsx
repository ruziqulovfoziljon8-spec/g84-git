import pizza from "../assets/images/imgg.png"


export default function Tepameniu() {
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "80px",
          backgroundColor: "gray",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "30%",
            height: "80px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {" "}
          <img
            style={{ width: "70px", height: "70px", marginLeft: "50px" }}
            src={pizza}
            alt=""
          />
        </div>
        <div
          style={{
            width: "30%",
            height: "80px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "50px",
              padding: "0 15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
            type="text"
            placeholder="Search..."
          />
        </div>
        <div
          style={{
            width: "30%",
            height: "80px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            style={{
              width: "300px",
              height: "50px",
              backgroundColor: "green",
              border: "none",
              borderRadius: "10px",
              color: "white",
              marginLeft: "200px",
            }}
          >
            Malumot Qo'shish
          </button>
        </div>
      </div>
    </div>
  );
}
