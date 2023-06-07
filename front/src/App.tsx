import { Route, Routes } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import LayoutFront from "./components/LayoutFront";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutFront />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<h1>404</h1>} />
      </Route>
      <Route path="/admin" element={<LayoutFront />}> {/* TODO: Layout à changer */}
        <Route index element={<h1>Admin</h1>} />
        <Route path="/admin/create" element={<h1>Create Product</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
