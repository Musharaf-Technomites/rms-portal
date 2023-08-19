import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
const UserProfile = ({ toggle, data }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('userSuccData'));
    if (items) {
      setItems(items);
      // alert(JSON.stringify(items.user))
    }
  }, [])

  return (
    <div className={`flex gap-2 items-center 
    ${toggle ? "bg-none trabsition-all duration-1000 delay-300" : "bg-white rounded-xl p-2 duration-1000 delay-300"}`}>
      <div className={"min-w-[3.5rem] h-[3.5rem]"}>
        <img
          className={"w-full h-full rounded-full object-cover"}
          src={require("../Assets/logo.jpg")}
        />
      </div>
      <div className={`${toggle ? "opacity-0 " : "trabsition-all duration-200 delay-300"}`}>
        <h3 className={"text-lg font-Popins"}>{`${items?.user?.firstName} ${items?.user?.lastName}`}</h3>
        <span className={"text-[0.75rem] opacity-60"}>{items?.user?.email}</span>
      </div>
    </div>
  )
}

export default UserProfile
