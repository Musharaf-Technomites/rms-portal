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
import * as SiIcon from "react-icons/si"
import CreateAssignmentModal from './CreateAssignmentModal'
import CsvLink from "react-csv-export";
import AssignmentMarksModal from './AssignmentMarksModal'

const AssignmentDetails = () => {
    const allStudent = useSelector((state) => state.date.allStudent)
    const { assignmentId } = useParams();



    const dispatch = useDispatch()


    const [search, setSearch] = useState("")
    const [marks, setMarks] = useState("")
    const [create, setCreate] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState()

    const navigate = useNavigate()

    // const GetAllStudent = () => {
    //     dispatch(DataAction.GetALlStudents())
    // }


    const [assignmentDetails, setAssignmentDetails] = useState()

    const AssignmentMarksSubmittion = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "assignmentId": assignmentId,
            "studentId": selectedStudent,
            "marks": marks
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BaseUrl}api/assignment/markSubmission`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setCreate(false)
                    GetAssignmentDetails()

                    selectedStudent()
                    setMarks("")

                }
            })
            .catch(error => console.log('error', error));
    }

    const GetAssignmentDetails = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": assignmentId
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BaseUrl}api/assignment/getById`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setAssignmentDetails(result.data)
                } else {
                    alert(result?.message)
                }
            })
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        GetAssignmentDetails()
        dispatch(DataAction.GetALlStudents())
    }, [])

    const [csvData, setCsvData] = useState();

    useEffect(() => {
        if (assignmentDetails) {

            let list = []
            for (let i = 0; i < allStudent.length; i++) {
                for (let j = 0; j < assignmentDetails?.SubmittedList.length; j++) {
                    if (allStudent[i]?._id === assignmentDetails?.SubmittedList[j]?.studentId) {
                        list.push({
                            Name: allStudent[i].firstName + " " + allStudent[i].lastName,
                            Number: allStudent[i].number,
                            "Total Marks": assignmentDetails?.SubmittedList[j].totalMarks,
                            "Marks Obtail": assignmentDetails?.SubmittedList[j].marksObtain
                        })
                    }
                }

            }

            setCsvData(list)

        }
    }, [allStudent, assignmentDetails])

    return (
        <div className="w-full h-screen bg-back bg-cover flex items-center">
            <div className="w-full h-screen bg-opacityBgColor flex">
                <div className="mt-2">
                    <SideBar />
                </div>
                <div className={"w-100 overflow-auto bg-glass  ml-4 mr-4 mt-2.5 mb-8 rounded-3xl"}>
                    <div className={"w-100 overflow-auto bg-glass   mb-8 rounded-3xl p-4 bg-[#164370]"}>

                        <div className='h-16 w-100 flex justify-between items-center '>
                            <div className=' flex-row justify-center items-center'>
                                <h1 className='text-white font-bold'>{assignmentDetails?.AssignmentName}</h1>

                                <h4 className='text-white mt-2'>{`Total Marks:  ${assignmentDetails?.TotalMarks}`}</h4>
                            </div>
                            <div className='flex flex-row justify-center items-center'>
                                <div className='flex flex-row justify-between items-center bg-white  pr-3 ml-4'>
                                    <input onChange={(e) => setSearch(e.target.value)} className='h-10  focus:border-gray-500 w-80 text-lg p-2' />
                                    <div className='flex justify-center items-center '>
                                        <BiIcon.IoMdSearch />
                                    </div>

                                </div>
                                <div onClick={() => { setCreate(true) }} className='cursor-pointer text-[2.8rem] text-[#85fb69] ml-4'>
                                    <CsvLink data={csvData} fileName={assignmentDetails?.AssignmentName} withTimeStamp>
                                        <AiIcon.AiFillFileExcel
                                            style={{ fontSize: 40, color: "green" }}
                                        />
                                    </CsvLink>
                                </div>
                            </div>

                        </div>
                        <div className='bg-white h-[90%] p-5 rounded-2xl   '>
                            <div className='w-full flex-wrap justify-between overflow-scroll'>
                                {/* <h1 className=' text-fontColor font-bold'>{"Students Assignments"}</h1> */}
                                <div className='my-2 w-full'>



                                    <table class="w-full">
                                        <thead className=''>
                                            <tr className=' text-xl text-fontColor h-10 rounded-md'>
                                                <th>Full Name</th>
                                                <th>Number</th>
                                                <th>PDF File</th>
                                                <th>Marks</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody >


                                            {
                                                assignmentDetails?.SubmittedList?.map((item) => {
                                                    const StudentName = allStudent.find((i) => i?._id === item?.studentId)

                                                    return (
                                                        <tr className='h-10 text-md' >
                                                            <td className='font-bold '>{`${StudentName?.firstName} ${StudentName?.lastName} `}</td>
                                                            <td>{StudentName?.number}</td>
                                                            <td>
                                                                <a href={item?.pdfLink} target='_blank'>
                                                                    <div className='text-4xl cursor-pointer item' >

                                                                        <AiIcon.AiFillFilePdf />
                                                                    </div>
                                                                </a>
                                                            </td>

                                                            <td>{item?.marksObtain}</td>
                                                            <td >
                                                                <div onClick={() => {
                                                                    setMarks("")
                                                                    setSelectedStudent(item?.studentId)
                                                                    setCreate(true)
                                                                }} className='text-2xl cursor-pointer item' >
                                                                    <AiIcon.AiFillEdit />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {
                            create && <AssignmentMarksModal
                                marks={marks}
                                onChange={(e) => setMarks(e.target.value)}
                                classId={""} onCancel={() => {
                                    GetAssignmentDetails()
                                    setCreate(false)
                                }}
                                onClick={AssignmentMarksSubmittion}

                            />


                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignmentDetails