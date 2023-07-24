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

const QuizDetails = () => {
    const allStudent = useSelector((state) => state.date.allStudent)
    const { quizId } = useParams();



    const dispatch = useDispatch()


    const [search, setSearch] = useState("")
    const [marks, setMarks] = useState("")
    const [create, setCreate] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState()

    const navigate = useNavigate()

    // const GetAllStudent = () => {
    //     dispatch(DataAction.GetALlStudents())
    // }


    const [quizDetails, setquizDetails] = useState()

    // const AssignmentMarksSubmittion = () => {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     var raw = JSON.stringify({
    //         "assignmentId": quizId,
    //         "studentId": selectedStudent,
    //         "marks": marks
    //     });

    //     var requestOptions = {
    //         method: 'PUT',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     fetch(`${BaseUrl}api/assignment/markSubmission`, requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             if (result.status === 200) {
    //                 setCreate(false)
    //                 GetquizDetails()

    //                 selectedStudent()
    //                 setMarks("")

    //             }
    //         })
    //         .catch(error => console.log('error', error));
    // }

    const GetquizDetails = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": quizId
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BaseUrl}api/quiz/getById`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setquizDetails(result.data)
                } else {
                    alert(result?.message)
                }
            })
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        GetquizDetails()
        dispatch(DataAction.GetALlStudents())
    }, [])

    const [csvData, setCsvData] = useState();

    useEffect(() => {
        if (quizDetails) {

            let list = []
            for (let i = 0; i < allStudent.length; i++) {
                for (let j = 0; j < quizDetails?.SubmittedList.length; j++) {
                    if (allStudent[i]?._id === quizDetails?.SubmittedList[j]?.studentId) {
                        list.push({
                            Name: allStudent[i].firstName + " " + allStudent[i].lastName,
                            Number: allStudent[i].number,
                            "Total Marks": quizDetails?.SubmittedList[j].totalMarks,
                            "Marks Obtail": quizDetails?.SubmittedList[j].marksObtain
                        })
                    }
                }

            }

            setCsvData(list)

        }
    }, [allStudent, quizDetails])

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
                                <h1 className='text-white font-bold'>{quizDetails?.QuizName}</h1>

                                <h4 className='text-white mt-2'>{`Total Marks:  ${quizDetails?.TotalMarks}`}</h4>
                            </div>
                            <div className='flex flex-row justify-center items-center'>
                                <div className='flex flex-row justify-between items-center bg-white  pr-3 ml-4'>
                                    <input onChange={(e) => setSearch(e.target.value)} className='h-10  focus:border-gray-500 w-80 text-lg p-2' />
                                    <div className='flex justify-center items-center '>
                                        <BiIcon.IoMdSearch />
                                    </div>

                                </div>
                                <div onClick={() => { setCreate(true) }} className='cursor-pointer text-[2.8rem] text-[#85fb69] ml-4'>
                                    <CsvLink data={csvData} fileName={quizDetails?.QuizName} withTimeStamp>
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


                                </div>
                            </div>
                        </div>
                        {/* {
                            create && <AssignmentMarksModal
                                marks={marks}
                                onChange={(e) => setMarks(e.target.value)}
                                classId={""} onCancel={() => {
                                    GetquizDetails()
                                    setCreate(false)
                                }}
                                onClick={() => {

                                }}

                            />


                        } */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizDetails