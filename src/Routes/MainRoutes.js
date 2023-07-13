import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react'

import LoginPage from "../Pages/Auth/LoginPage"
import Dashboard from "../Pages/Dashboard"

import ProtectedRoute from "../Components/ProtectedRoute"
import AllStudents from "../Components/AllStudents"
import AllSchool from "../Components/AllSchool"
import AllSchoolDetail from "../Components/AllSchoolDetail"
import StudentAddToClass from "../Pages/StudentAddToClass"
import AllAsssignment from "../Components/AllAsssignment"

const MainRoutes = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />
                <Route path="/students" element={<ProtectedRoute Component={AllStudents} />} />
                <Route path="/school" element={<ProtectedRoute Component={AllSchool} />} />
                <Route path="/schoolDetails/:schoolId" element={<ProtectedRoute Component={AllSchoolDetail} />} />
                <Route path="/addStudentToClass/:classId" element={<ProtectedRoute Component={StudentAddToClass} />} />
                <Route path="/allAssignment/:classId" element={<ProtectedRoute Component={AllAsssignment} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes