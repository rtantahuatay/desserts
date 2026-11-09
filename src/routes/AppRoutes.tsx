import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CreateProductPage from "../pages/CreateProductPage";
import EditProductPage from "../pages/EditProductPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/producto/nuevo" element={<CreateProductPage/>}></Route>
            <Route path="/producto/:id" element={<ProductDetailPage/>}></Route>
            <Route path="/producto/:id/editar" element={<EditProductPage />} />
            <Route path="*" element={<NotFoundPage/>}></Route>
        </Routes>
    )
}