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
import CreateQuizModal from './CreateQuizModal'
import Switch from "react-switch";
const AllStudentByClass = () => {
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
    const [allStudents, setAllStudents] = useState([])
    const GetAllStudents = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${BaseUrl}student/api/allStudents`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    let data = result.data
                    let list = []
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].courseId === classId) {
                            list.push(data[i])
                        }

                    }

                    setAllStudents(list)
                }
            })
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        GetAllStudents()
    }, [])


    const AddAttandance = (data) => {

        let history = data.attandanceHistory
        history.push({
            id: Math.random(),
            type: "Present",
            date: new Date()
        })


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "studentId": data?._id,
            "attandanceHistory": history,
            "attandanceCount": Number(data?.attandanceCount + 1)
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        fetch(`${BaseUrl}student/api/markAttandance`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    GetAllStudents()
                } else {
                    alert("Something went wrong.")
                }
            })
            .catch(error => console.log('error', error));
    }


    const SubAttandance = (data) => {

        let history = data.attandanceHistory
        history.push({
            id: Math.random(),
            type: "Absent",
            date: new Date()
        })


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "studentId": data?._id,
            "attandanceHistory": history,
            "attandanceCount": Number(data?.attandanceCount)
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        fetch(`${BaseUrl}student/api/markAttandance`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status === 200) {
                    GetAllStudents()
                } else {
                    alert("Something went wrong.")
                }
            })
            .catch(error => console.log('error', error));
    }




    return (
        <div className="w-full h-screen bg-back bg-cover flex items-center">
            <div className="w-full h-screen bg-opacityBgColor flex">
                <div className="mt-2">
                    <SideBar />
                </div>
                <div className={"w-100 overflow-auto bg-glass  ml-4 mr-4 mt-2.5 mb-8 rounded-3xl"}>
                    <div className={"w-100 overflow-auto bg-glass   mb-8 rounded-3xl p-4 bg-[#164370]"}>

                        <div className='h-16 w-100 flex justify-between items-center '>
                            <div className='flex  justify-center items-center'>
                                <h4 className='text-white font-bold'>All Students</h4>

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
                                    allStudents && <table class=" w-100">
                                        <thead>
                                            <tr style={{ padding: 10 }} className=" h-12  rounded-2xl text-lg	">
                                                <th>Name</th>
                                                <th>Email / Number</th>
                                                <th>{"School (Course)"}</th>
                                                <th>Attandance</th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                            {
                                                allStudents.map((i) => {
                                                    let fullName = i?.firstName?.toLowerCase() + " " + i?.lastName?.toLowerCase()
                                                    if (fullName.includes(search)) {
                                                        return <tr className='m-4 h-20  odd:bg-[#e4e0e0] rounded-full justify-center items-center'>
                                                            <td style={{ marginLeft: 10 }} className='font-bold'>{fullName}</td>
                                                            <td>
                                                                <p>{i?.email}</p>
                                                                <p className='font-bold text-xs'>{i?.number}</p>
                                                            </td>

                                                            <td>{`${i?.schoolName} (${i?.courseName})`}</td>
                                                            <tb class=" p-2 flex-col ">
                                                                <div className='flex justify-center items-center'>
                                                                    <div onClick={() => {
                                                                        SubAttandance(i)
                                                                    }} className='bg-red-900 h-6 rounded flex justify-center items-center cursor-pointer p-2'>
                                                                        <p className='text-white'>Absent</p>
                                                                    </div>
                                                                    <h1 className='flex justify-center items-center px-4'>
                                                                        {i?.attandanceCount}
                                                                    </h1>
                                                                    <div onClick={() => {
                                                                        AddAttandance(i)
                                                                    }} className='bg-fontColor h-6 rounded flex justify-center items-center cursor-pointer p-2'>
                                                                        <p className='text-white'>Present</p>
                                                                    </div>
                                                                </div>

                                                            </tb>
                                                        </tr>
                                                    }

                                                })
                                            }

                                        </tbody>
                                    </table>
                                }


                            </div>
                        </div>
                        {
                            create && <CreateQuizModal classId={classId} onCancel={() => {
                                GetAllStudents()
                                setCreate(false)
                            }} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllStudentByClass