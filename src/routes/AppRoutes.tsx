import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProductDetailPage from "../pages/ProductDetailPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/producto/:id" element={<ProductDetailPage />}/>
            <Route path="*" element={<NotFoundPage />}/>
        </Routes>
    )
}