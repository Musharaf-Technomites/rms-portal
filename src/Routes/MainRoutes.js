import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react'
import HomePage from "../Pages/HomePage"
import ProfilePage from "../Pages/ProfilePage"
import ProductPage from "../Pages/ProductPage"

const MainRoutes = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/ProductPage" element={<ProductPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes