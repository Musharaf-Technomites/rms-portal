import React from 'react'
import SideBar from '../Components/SideBar'
import { BrowserRouter, Routes, Route } from "react-router-dom"

const AllStudents = () => {
    return (
        <div className="w-full h-screen bg-back bg-cover flex items-center">
            <div className="w-full h-screen bg-opacityBgColor flex">
                <div className="mt-2">
                    <SideBar />
                </div>
                <div className={"w-100 overflow-auto bg-glass  ml-4 mr-4 mt-2.5 mb-8 rounded-3xl"}>
                    <h1>All Students</h1>
                </div>

            </div>


        </div>
    )
}

export default AllStudents