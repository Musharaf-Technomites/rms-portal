import React from 'react'
import { SideBarListData } from '../Data/SideBarListData'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as AuthAction from "../Store/AuthAction"
const SideBarData = ({ toggle }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const CurrentSideState = useSelector((state) => state.auth.currentSideState)
  return (
    <div>
      {SideBarListData.map((i) => {
        return (
          <div onClick={() => {

            if (i.id === 4) {
              localStorage.clear()
              dispatch(AuthAction.UserLogoutAction())
              navigate("/login")

            } else if (i.id === 2) {
              dispatch(AuthAction.CurrentSideBaseStateAction(i.Name))
              navigate("/students")
            } else if (i.id === 1) {
              dispatch(AuthAction.CurrentSideBaseStateAction(i.Name))
              navigate("/")
            } else if (i.id === 3) {
              dispatch(AuthAction.CurrentSideBaseStateAction(i.Name))
              navigate("/school")
            } else {
              dispatch(AuthAction.CurrentSideBaseStateAction(i.Name))
            }
          }} key={i.id} className={`${toggle ? "last:w-[3.6rem]" : "last:w-[16rem]"} ${CurrentSideState === i.Name ? "bg-white" : null} sidebar`}>
            <div className={"mr-5 text-[1.7rem] text-fontColor "}>{i.Icon}</div>
            <div className={`${toggle ? "opacity-0 delay-200 " : "text-fontColor font-medium"} text-[1rem] whitespace-pre`}>{i.Name}</div>

          </div>
        )
      })}
    </div>
  )
}

export default SideBarData