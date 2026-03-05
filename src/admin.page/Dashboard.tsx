import { Route, Routes } from "react-router-dom";
import Tepameniu from "./Tepameniu";
import Yonmeniyu from "./Yonmeniyu";
import Mahsulotlar from "./Mahsulotlar";
import Buyurtmalar from "./Buyurtmalar";
import Yetkazilganlar from "./Yetkazilganlar";


export default function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Yonmeniyu/>

      <div style={{ flex: 1 }}>
        <Tepameniu />

        <Routes>
          <Route path="/" element={<Mahsulotlar />} />
          <Route path="/buyurtmalar" element={<Buyurtmalar />} />
          <Route path="/yetkazilganlar" element={<Yetkazilganlar />} />
        </Routes>
      </div>
    </div>
  );
}
