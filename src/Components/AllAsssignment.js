import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import { BaseUrl } from '../Constants/BaseUrl'

import moment from 'moment'
import { useDispatch, useSelector } from "react-redux"
import CreateClassModal from './CreateClassModal'
import { useNavigate } from "react-router-dom"
import * as DataAction from "../Store/DataAction"
import * as BiIcon from "react-icons/io"
import * as AiIcon from "react-icons/ai"


const AllAsssignment = () => {
    const allStudent = useSelector((state) => state.date.allStudent)
    const { classId } = useParams();

    const [allSchools, setAllSchols] = useState([])
    const [SchoolDetails, setSchoolDetails] = useState()
    const dispatch = useDispatch()


    const [search, setSearch] = useState("")
    const [create, setCreate] = useState(false)
    const navigate = useNavigate()

    // const GetAllStudent = () => {
    //     dispatch(DataAction.GetALlStudents())
    // }


    const [allAssignment, setAllAssignment] = useState([])
    const GetAllAssignment = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${BaseUrl}api/assignment/getAll`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    let data = result.data
                    let list = []
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].ClassId === classId) {
                            list.push(data[i])
                        }

                    }

                    setAllAssignment(list)
                }
            })
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        GetAllAssignment()
    }, [])


    return (
        <div className="w-full h-screen bg-back bg-cover flex items-center">
            <div className="w-full h-screen bg-opacityBgColor flex">
                <div className="mt-2">
                    <SideBar />
                </div>
                <div className={"w-100 overflow-auto bg-glass  ml-4 mr-4 mt-2.5 mb-8 rounded-3xl"}>
                    <div className={"w-100 overflow-auto bg-glass   mb-8 rounded-3xl p-4 bg-[#164370]"}>

                        <div className='h-16 w-100 flex justify-between items-center '>
                            <div className='flex flex-row justify-center items-center'>
                                <h4 className='text-white font-bold'>{"All Assignments"}</h4>

                            </div>
                            <div className='flex flex-row justify-center items-center'>
                                <div className='flex flex-row justify-between items-center bg-white  pr-3 ml-4'>
                                    <input onChange={(e) => setSearch(e.target.value)} className='h-10  focus:border-gray-500 w-80 text-lg p-2' />
                                    <div className='flex justify-center items-center '>
                                        <BiIcon.IoMdSearch />
                                    </div>

                                </div>
                                <div onClick={() => { setCreate(true) }} className='cursor-pointer text-[2.8rem] text-white ml-4'>
                                    <BiIcon.IoMdAddCircle />
                                </div>
                            </div>

                        </div>
                        <div className='bg-white h-[90%] p-5 rounded-2xl   '>
                            <div className='w-full flex-wrap flex justify-between overflow-scroll'>
                                {
                                    allAssignment.map((i) => {
                                        return (
                                            <div className="min-h-40 bg-[#eef3f5] w-[49%] mt-4 rounded-md drop-shadow-md flex p-3">
                                                <div>
                                                    <div className='flex justify-between'>
                                                        <h1 className=' text-[1.5rem] text-[#164370] font-bold' >{i?.AssignmentName}</h1>
                                                        <a href="https://www.africau.edu/images/default/sample.pdf" target='_blank'> <div className='text-4xl cursor-pointer' >

                                                            <AiIcon.AiFillFilePdf />
                                                        </div>
                                                        </a>
                                                    </div>


                                                    <h1 className=' text-[0.9rem] text-black] mt-2' >{`Total Marks: ${i.TotalMarks}`}</h1>
                                                    <h1 className=' text-[0.9rem] text-black] mt-2' >{`Last Date: ${moment(i?.LastDate).format("DD-MM-YY")}`}</h1>
                                                    <h1 className=' text-[1rem] text-black] mt-2 font-bold' >{`Description`}</h1>
                                                    <h1 className=' text-[0.8rem] text-black] mt-2' >{`Total Marks: ${i?.AssignmentDescription}`}</h1>
                                                </div>


                                            </div>
                                        )
                                    })
                                }




                            </div>
                        </div>
                        {/* {
                            create && <CreateClassModal schoolId={schoolId} onCancel={() => {
                                GetSchoolDetails()
                                setCreate(false)
                            }} />
                        } */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllAsssignment