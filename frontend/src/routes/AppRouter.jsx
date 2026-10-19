import { BrowserRouter, Routes, Route } from "react-router-dom";

import StorefrontLayout from "../layouts/StorefrontLayout";
import AdminLayout from "../layouts/AdminLayout";

import HomePage from "../pages/customer/HomePage";
import DashboardPage from "../pages/admin/DashboardPage";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";

import DanhMucPage from "../pages/admin/DanhMucPage";
import KichThuocPage from "../pages/admin/KichThuocPage";
import MauSacPage from "../pages/admin/MauSacPage";

import SanPhamPage from "../pages/admin/SanPhamPage";
import SanPhamDetailPage from "../pages/admin/SanPhamDetailPage";

import ProductListPage from "../pages/customer/ProductListPage";
import ProductDetailPage from "../pages/customer/ProductDetailPage";

import CartPage from "../pages/customer/CartPage";
import Checkout from "../pages/customer/Checkout";

// DAY 10 — Đơn hàng
import OrderHistoryPage from "../pages/customer/OrderHistoryPage";
import OrderTrackingPage from "../pages/customer/OrderTrackingPage";
import OrderDetailPage from "../pages/customer/OrderDetailPage";
import OrderSuccessPage from "../pages/customer/OrderSuccessPage";

// DAY 11 — Admin Đơn hàng & Khách hàng
import OrderManagementPage from "../pages/admin/OrderManagementPage";
import AdminOrderDetailPage from "../pages/admin/AdminOrderDetailPage";
import CustomerManagementPage from "../pages/admin/CustomerManagementPage";
import CustomerDetailPage from "../pages/admin/CustomerDetailPage";

// DAY 12 — Admin Nhập kho & Tồn kho
import TonKhoPage from "../pages/admin/TonKhoPage";
import NhapKhoPage from "../pages/admin/NhapKhoPage";

// DAY 13 — Admin Chatbot FAQ
import FaqManagementPage from "../pages/admin/FaqManagementPage";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                {/* ================================= */}
                {/* CUSTOMER STOREFRONT */}
                {/* ================================= */}
                <Route path="/" element={<StorefrontLayout />}>

                    <Route index element={<HomePage />} />

                    <Route
                        path="login"
                        element={<Login />}
                    />

                    <Route
                        path="register"
                        element={<Register />}
                    />

                    <Route
                        path="products"
                        element={<ProductListPage />}
                    />

                    <Route
                        path="products/:id"
                        element={<ProductDetailPage />}
                    />

                    {/* GIỎ HÀNG */}
                    <Route
                        path="cart"
                        element={
                            <ProtectedRoute>
                                <CartPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* CHECKOUT */}
                    <Route
                        path="checkout"
                        element={
                            <ProtectedRoute>
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />

                    {/* ĐẶT HÀNG THÀNH CÔNG */}
                    <Route
                        path="dat-hang-thanh-cong"
                        element={
                            <ProtectedRoute>
                                <OrderSuccessPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* PROFILE */}
                    <Route
                        path="profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    {/* ================================= */}
                    {/* DAY 10 — QUẢN LÝ ĐƠN HÀNG CUSTOMER */}
                    {/* ================================= */}

                    {/* LỊCH SỬ MUA HÀNG */}
                    <Route
                        path="lich-su-mua-hang"
                        element={
                            <ProtectedRoute>
                                <OrderHistoryPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* THEO DÕI ĐƠN HÀNG */}
                    <Route
                        path="theo-doi-don-hang"
                        element={
                            <ProtectedRoute>
                                <OrderTrackingPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* CHI TIẾT ĐƠN HÀNG */}
                    <Route
                        path="don-hang/:donHangId"
                        element={
                            <ProtectedRoute>
                                <OrderDetailPage />
                            </ProtectedRoute>
                        }
                    />

                </Route>

                {/* ================================= */}
                {/* ADMIN DASHBOARD */}
                {/* ================================= */}
                <Route
                    path="/admin"
                    element={<AdminLayout />}
                >
                    <Route
                        index
                        element={<DashboardPage />}
                    />

                    <Route
                        path="categories"
                        element={<DanhMucPage />}
                    />

                    <Route
                        path="sizes"
                        element={<KichThuocPage />}
                    />

                    <Route
                        path="colors"
                        element={<MauSacPage />}
                    />

                    <Route
                        path="products"
                        element={<SanPhamPage />}
                    />

                    <Route
                        path="products/:id"
                        element={<SanPhamDetailPage />}
                    />

                    {/* ================================= */}
                    {/* DAY 11 — ADMIN QUẢN LÝ ĐƠN HÀNG & KHÁCH HÀNG */}
                    {/* ================================= */}
                    <Route
                        path="don-hang"
                        element={<OrderManagementPage />}
                    />

                    <Route
                        path="don-hang/:id"
                        element={<AdminOrderDetailPage />}
                    />

                    <Route
                        path="khach-hang"
                        element={<CustomerManagementPage />}
                    />

                    <Route
                        path="khach-hang/:id"
                        element={<CustomerDetailPage />}
                    />

                    {/* ================================= */}
                    {/* DAY 12 — ADMIN QUẢN LÝ NHẬP KHO & TỒN KHO */}
                    {/* ================================= */}
                    <Route
                        path="ton-kho"
                        element={<TonKhoPage />}
                    />

                    <Route
                        path="nhap-kho"
                        element={<NhapKhoPage />}
                    />

                    {/* ================================= */}
                    {/* DAY 13 — ADMIN CHATBOT FAQ */}
                    {/* ================================= */}
                    <Route
                        path="chatbot"
                        element={<FaqManagementPage />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;