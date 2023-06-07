import { Routes, Route, useParams } from "react-router-dom";
import "./App.css";
import ProductDetails from "./pages/ProductDetailsPage";
import HomePage from "./pages/HomePage";

function App() {
  // return <ProductDetails />;

  return (
    <div>
      <HomePage />
      <Routes>
        <Route path="/product/:productId" element={<ProductDetails />} />
        {/* <Route path="/product/1" element={<ProductDetails />} />
        <Route path="/product/2" element={<ProductDetails />} />
        <Route path="/product/3" element={<ProductDetails />} /> */}
      </Routes>
    </div>
  );
};

export default App;
