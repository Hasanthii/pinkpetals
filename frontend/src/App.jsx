import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AdminUsersPage from './pages/AdminUsersPage.jsx';
import SidebarLayout from './components/SidebarLayout.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const token = localStorage.getItem('pinkpetals_token');
    const role = localStorage.getItem('pinkpetals_role');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && role !== 'ADMIN') {
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
                    path="/admin/users"
                    element={
                        <ProtectedRoute requireAdmin>
                            <SidebarLayout>
                                <AdminUsersPage />
                            </SidebarLayout>
                        </ProtectedRoute>   
                    }
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </ErrorBoundary>
    );
};

export default App;