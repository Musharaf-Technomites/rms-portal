import React from 'react'
import SideBar from '../Components/SideBar'
const Dashboard = () => {
    return (
        <div className="w-full h-screen bg-back bg-cover flex items-center">
            <div className="w-full h-screen bg-opacityBgColor flex">
                <div className="mt-2">
                    <SideBar />
                </div>
                <div className={"w-100 h-screen overflow-auto"}>

                </div>

            </div>


        </div>
    )
}

export default Dashboard