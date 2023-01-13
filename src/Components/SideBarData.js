import React from 'react'
import { SideBarListData } from '../Data/SideBarListData'
const SideBarData = ({ toggle }) => {
  return (
    <div>
      {SideBarListData.map((i) => {
        return (
          <div key={i.id} className={`${toggle ? "last:w-[3.6rem]" : "last:w-[16rem]"} sidebar`}>
            <div className={"mr-5 text-[1.7rem] text-fontColor "}>{i.Icon}</div>
            <div className={`${toggle ? "opacity-0 delay-200 " : "text-fontColor font-medium"} text-[1rem] whitespace-pre`}>{i.Name}</div>

          </div>
        )
      })}
    </div>
  )
}

export default SideBarData