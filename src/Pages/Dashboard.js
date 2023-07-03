import React from 'react'
import SideBar from '../Components/SideBar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AllStudents from '../Components/AllStudents'
import AllClasses from '../Components/AllSchool'
const Dashboard = () => {
    return (
        <div className="w-full h-screen bg-back bg-cover flex items-center">
            <div className="w-full h-screen bg-opacityBgColor flex">
                <div className="mt-2">
                    <SideBar />
                </div>
                <div className={"w-100 overflow-auto bg-glass  ml-4 mr-4 mt-2.5 mb-8 rounded-3xl"}>
                    <Routes>
                        <Route path="/students" element={<AllStudents />} />
                        <Route path="/classes" element={<AllClasses />} />


                    </Routes>
                </div>

            </div>


        </div>
    )
}

export default Dashboard