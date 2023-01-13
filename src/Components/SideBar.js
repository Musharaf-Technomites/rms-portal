import React, { useState } from 'react'
import * as BiIcon from "react-icons/bi"
import UserProfile from "../Components/UserProfile"
import SideBarData from "../Components/SideBarData"
const SideBar = () => {
    const [toggle, setToggle] = useState(false)
    return (
        <div className={`${toggle ? "w-[5.8rem]" : ""} sidebar-container`}>
            <UserProfile toggle={toggle} />
            <SideBarData toggle={toggle} />
            <div
                onClick={() => {
                    setToggle(!toggle)
                }}
                className={'absolute top-[7rem] flex justify-center items-center -left-5 w-10 h-10 bg-glass rounded-full cursor-pointer'}>
                <BiIcon.BiChevronLeft className={`${toggle ? "rotate-180" : ""} text-3xl transition-all duration-300`} />
            </div>
        </div>
    )
}

export default SideBar