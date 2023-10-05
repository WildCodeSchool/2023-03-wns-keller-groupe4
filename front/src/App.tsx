import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { refreshToken } from "./utils/jwtHandler";
import ProtectedRoute from "./utils/ProtectedRoute";

import Layout from "./components/Layout";

import ProductDetails from "./pages/Front-Office/ProductsDetailsPage";
import HomePage from "./pages/Front-Office/HomePage";
import ProductsListPage from "./pages/Front-Office/ProductsListPage";
import ConnectFront from "./pages/Front-Office/ConnectFront";
import CreateProduct from "./pages/Back-Office/CreateProduct";
import Profile from "./pages/Front-Office/Profile";
import AdminProductsDetails from "./pages/Back-Office/AdminProductsDetails";
import Stock from "./pages/Back-Office/Stock";

function App() {
    const [isLoading, setIsLoading] = useState(true);

    // Refresh token when app is loaded to avoid logout
    useEffect(() => {
        refreshToken()
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }
    return (
        // prettier-ignore
        <Routes>
            <Route path="/" element={<Layout isFrontOffice={true} />}>
                <Route index element={<HomePage />} />
                <Route path="/connect" element={<ConnectFront />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<h1>Cart</h1>} />
                <Route path="*" element={<h1>404</h1>} />
                <Route path="/products/list/:categorySlug" element={<ProductsListPage />} />
                <Route path="/product/:id/:name" element={<ProductDetails />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin" element={<Layout isFrontOffice={false} />}>
                    <Route path="/admin/create" element={<CreateProduct />} />
                    <Route path="/admin/product/:id/:name" element={<AdminProductsDetails />} />
                    <Route path="/admin/stock" element={<Stock />} />
                    <Route path="/admin/product/:id/:name" element={<h1>Stock Product</h1>} />
                    <Route path="/admin/reservations" element={<h1>Reservations</h1>} />
                    <Route path="/admin/profile" element={<h1>Admin Profile</h1>} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
