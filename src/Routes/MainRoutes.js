import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react'

import LoginPage from "../Pages/Auth/LoginPage"
import Dashboard from "../Pages/Dashboard"

import ProtectedRoute from "../Components/ProtectedRoute"
import AllStudents from "../Components/AllStudents"
import AllClasses from "../Components/AllClasses"
const MainRoutes = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />
                <Route path="/students" element={<ProtectedRoute Component={AllStudents} />} />
                <Route path="/classes" element={<ProtectedRoute Component={AllClasses} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes