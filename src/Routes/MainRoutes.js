import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react'

import LoginPage from "../Pages/Auth/LoginPage"
import Dashboard from "../Pages/Dashboard"

import HomePage from "../Pages/HomePage"
import ProfilePage from "../Pages/ProfilePage"
import ProductPage from "../Pages/ProductPage"
import ProtectedRoute from "../Components/ProtectedRoute"
const MainRoutes = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />

            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes