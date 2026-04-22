import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const ProtectedRoute = ({ children, requireAdmin = false, requireSupplier = false }) => {
    const token = localStorage.getItem('pinkpetals_token');
    const role = localStorage.getItem('pinkpetals_role');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    if (requireSupplier && role !== 'SUPPLIER') {
        return <Navigate to="/" replace />;
    }

    return children;
};

const App = () => {
    return (
        <ErrorBoundary>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                <Route path="/" element={<StoreLanding />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/product/:id" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/deals" element={<DealsPage />} />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <SidebarLayout>
                                <ProfilePage />
                            </SidebarLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={<Navigate to="/admin/dashboard" replace />}
                />
                <Route
                    path="/admin/dashboard"
                    element={<Navigate to="/admin/products" replace />}
                />
                <Route
                    path="/admin/products"
                    element={
                        <ProtectedRoute requireAdmin>
                            <SidebarLayout>
                                <AdminProductPage />
                            </SidebarLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute requireAdmin>
                            <SidebarLayout>
                                <AdminUsersPage />
                            </SidebarLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/orders"
                    element={
                        <ProtectedRoute requireAdmin>
                            <SidebarLayout>
                                <OrdersPage />
                            </SidebarLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <SidebarLayout>
                                <OrdersPage />
                            </SidebarLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/reviews"
                    element={
                        <ProtectedRoute>
                            <SidebarLayout>
                                <ReviewsPage />
                            </SidebarLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/reviews"
                    element={
                        <ProtectedRoute requireAdmin>
                            <SidebarLayout>
                                <ReviewsPage />
                            </SidebarLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/promotions"
                    element={
                        <ProtectedRoute requireAdmin>
                            <SidebarLayout>
                                <AdminPromotionsPage />
                            </SidebarLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/suppliers"
                    element={
                        <ProtectedRoute requireAdmin>
                            <SidebarLayout>
                                <AdminSuppliersPage />
                            </SidebarLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/customer/dashboard"
                    element={
                        <ProtectedRoute>
                            <SidebarLayout>
                                <CustomerDashboard />
                            </SidebarLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/supplier/dashboard"
                    element={
                        <ProtectedRoute requireSupplier>
                            <SidebarLayout>
                                <SupplierDashboard />
                            </SidebarLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/supplier/products"
                    element={
                        <ProtectedRoute requireSupplier>
                            <SidebarLayout>
                                <AdminProductPage />
                            </SidebarLayout>
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </ErrorBoundary>
    );
};

export default App;
