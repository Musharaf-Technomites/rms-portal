import React from 'react'
const UserProfile = ({ toggle }) => {
  return (
    <div className={`flex gap-2 items-center 
    ${toggle ? "bg-none trabsition-all duration-200 delay-300" : "bg-white rounded-xl p-2 duration-200 delay-700"}`}>
      <div className={"min-w-[3.5rem] h-[3.5rem]"}>
        <img
          className={"w-full h-full rounded-full object-cover"}
          src={require("../Assets/user.jpeg")}
        />
      </div>
      <div className={`${toggle?"opacity-0 ":""}`}>
        <h3 className={"text-lg font-Popins"}>Musharaf Ahmed</h3>
        <span className={"text-[0.75rem] opacity-60"}>musharaf@gmail.com</span>
      </div>
    </div>
  )
}

export default UserProfile
