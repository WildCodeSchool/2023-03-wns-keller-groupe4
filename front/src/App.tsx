import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";

import ProductDetails from "./pages/Front-Office/ProductsDetailsPage";
import HomePage from "./pages/HomePage";
import ProductsListPage from "./pages/Front-Office/ProductsListPage";
import ConnectFront from "./pages/ConnectFront";
import CreateProduct from "./pages/CreateProduct";
import Stock from "./pages/Stock";
import Profile from "./pages/Front-Office/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout isFrontOffice={true} />}>
        <Route index element={<HomePage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/connect" element={<ConnectFront />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<h1>Cart</h1>} />
        <Route path="*" element={<h1>404</h1>} />
        <Route path="/products/list" element={<ProductsListPage />} />
      </Route>
      <Route path="/admin" element={<Layout isFrontOffice={false} />}>
        <Route path="/admin/create" element={<CreateProduct />} />
        <Route path="/admin/stock" element={<Stock />} />
        <Route path="/admin/stock/:id" element={<h1>Stock Product</h1>} />
        <Route path="/admin/reservations" element={<h1>Reservations</h1>} />
        <Route path="/admin/profile" element={<h1>Admin Profile</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
