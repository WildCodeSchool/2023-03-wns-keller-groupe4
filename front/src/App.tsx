import { Routes, Route } from "react-router-dom";
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
      </Routes>
    </div>
  );
};

export default App;
