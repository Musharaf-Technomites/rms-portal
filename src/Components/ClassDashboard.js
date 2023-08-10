import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import { BaseUrl } from '../Constants/BaseUrl'

import moment from 'moment'
import { useDispatch, useSelector } from "react-redux"
import CreateClassModal from './CreateClassModal'
import { useNavigate } from "react-router-dom"
import * as DataAction from "../Store/DataAction"
import * as BsIcon from "react-icons/bs"
import * as MdIcon from "react-icons/md"
import * as HiIcon from "react-icons/hi"
import * as GiIcon from "react-icons/gi"
import CreateAssignmentModal from './CreateAssignmentModal'


const ClassDashboard = () => {
    const allStudent = useSelector((state) => state.date.allStudent)
    const { classId } = useParams();

    const [classImage, setClassImage] = useState([])
    const [SchoolDetails, setSchoolDetails] = useState()
    const dispatch = useDispatch()


    const [search, setSearch] = useState("")
    const [create, setCreate] = useState(false)
    const navigate = useNavigate()

    // const GetAllStudent = () => {
    //     dispatch(DataAction.GetALlStudents())
    // }




    const [GetClassDetail, setGetClassDetails] = useState([])

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "classId": classId
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BaseUrl}class/api/getClassDetail`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    const thumbnailImage = result?.data?.thumbnail

                    const thubnailId = thumbnailImage.split("/")
                    const imageId = thubnailId[5]
                    const imageIrl = `https://drive.google.com/uc?export=view&id=${imageId}`
                    setGetClassDetails(result?.data)
                    setClassImage(imageIrl)

                }
            })
            .catch(error => console.log('error', error));
    }, [])
    return (
        <div className="w-full h-screen bg-back bg-cover flex items-center">
            <div className="w-full h-screen bg-opacityBgColor flex">
                <div className="mt-2">
                    <SideBar />
                </div>
                <div className={"w-100 overflow-auto bg-glass  ml-4 mr-4 mt-2.5 mb-8 rounded-3xl"}>
                    <div className={"w-100 overflow-auto bg-glass   mb-8 rounded-3xl px-4 bg-[#164370]"}>

                        <div className='h-16 w-100 flex justify-between items-center '>
                            <div className='flex flex-row justify-center items-center w-full'>
                                <h4 className='text-white font-bold '>{GetClassDetail?.className}</h4>
                            </div>
                            {/* <div className='flex flex-row justify-center items-center'>
                                <div className='flex flex-row justify-between items-center bg-white  pr-3 ml-4'>
                                    <input onChange={(e) => setSearch(e.target.value)} className='h-10  focus:border-gray-500 w-80 text-lg p-2' />
                                    <div className='flex justify-center items-center '>
                                        <BiIcon.IoMdSearch />
                                    </div>

                                </div>
                                <div onClick={() => { setCreate(true) }} className='cursor-pointer text-[2.8rem] text-white ml-4'>
                                    <BiIcon.IoMdAddCircle />
                                </div>
                            </div> */}

                        </div>
                        <div className='bg-white h-[90%] p-5 rounded-2xl   '>

                            <div className='h-80 w-full'>
                                <img className='h-[100%] w-full rounded-lg' src={classImage} />
                            </div>

                            <div className=' w-full mt-2 flex-wrap flex justify-between '>
                                <div onClick={() => {
                                    navigate(`/allAssignment/${classId}`)
                                }} className='h-40 w-[32%] bg-[#e0e1e2] rounded-lg flex justify-center items-center flex-col hover:drop-shadow-lg cursor-pointer '>
                                    <div className='text-lg'>
                                        <MdIcon.MdAssignment className={"h-20 w-20 text-fontColor"} />
                                    </div>

                                    <h1 className='text-fontColor font-medium ' >Assignments</h1>

                                </div>

                                <div onClick={() => {
                                    navigate(`/allQuizes/${classId}`)
                                }} className='h-40 w-[32%] bg-[#e0e1e2] rounded-lg flex justify-center items-center flex-col hover:drop-shadow-lg cursor-pointer  '>
                                    <div className='text-lg'>
                                        <MdIcon.MdQuiz className={"h-20 w-20 text-fontColor"} />
                                    </div>

                                    <h1 className='text-fontColor font-medium ' >Quiz</h1>

                                </div>

                                <div onClick={() => {
                                    navigate(`/AllStudentByClass/${classId}`)
                                }} className='h-40 w-[32%] bg-[#e0e1e2] rounded-lg flex justify-center items-center flex-col hover:drop-shadow-lg cursor-pointer  '>
                                    <div className='text-lg'>
                                        <HiIcon.HiUserGroup className={"h-20 w-20 text-fontColor"} />
                                    </div>

                                    <h1 className='text-fontColor font-medium ' >Students Attandance</h1>

                                </div>

                                <div onClick={() => {
                                    navigate(`/allNotes/${classId}`)
                                }} className='h-40 w-[32%] bg-[#e0e1e2] rounded-lg flex justify-center items-center flex-col hover:drop-shadow-lg cursor-pointer   mt-4'>
                                    <div className='text-lg'>
                                        <GiIcon.GiNewspaper className={"h-20 w-20 text-fontColor"} />
                                    </div>

                                    <h1 className='text-fontColor font-medium ' >Class Notes</h1>

                                </div>

                                <div onClick={() => {
                                    navigate(`/AllPastPapers/${classId}`)
                                }} className='h-40 w-[32%] bg-[#e0e1e2] rounded-lg flex justify-center items-center flex-col hover:drop-shadow-lg cursor-pointer   mt-4'>
                                    <div className='text-lg'>
                                        <BsIcon.BsFillFileEarmarkTextFill className={"h-20 w-20 text-fontColor"} />
                                    </div>

                                    <h1 className='text-fontColor font-medium ' >Past Papers</h1>

                                </div>

                                <div onClick={() => {
                                    navigate(`/AllAccouncements/${classId}`)
                                }} className='h-40 w-[32%] bg-[#e0e1e2] rounded-lg flex justify-center items-center flex-col hover:drop-shadow-lg cursor-pointer   mt-4'>
                                    <div className='text-lg'>
                                        <BsIcon.BsBell className={"h-20 w-20 text-fontColor"} />
                                    </div>

                                    <h1 className='text-fontColor font-medium ' >Announcements</h1>

                                </div>


                                <div onClick={() => {
                                    navigate(`/ALlRecordedLactures/${classId}`)
                                }} className='h-40 w-[32%] bg-[#e0e1e2] rounded-lg flex justify-center items-center flex-col hover:drop-shadow-lg cursor-pointer   mt-4'>
                                    <div className='text-lg'>
                                        <BsIcon.BsCameraVideoFill className={"h-20 w-20 text-fontColor"} />
                                    </div>

                                    <h1 className='text-fontColor font-medium ' >Recorded Lectures</h1>

                                </div>


                            </div>

                        </div>
                        {/* {
                            create && <CreateAssignmentModal classId={classId} onCancel={() => {
                                // GetAllAssignment()
                                // setCreate(false)
                            }} />
                        } */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassDashboard