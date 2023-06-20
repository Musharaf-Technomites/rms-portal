import React, { useState, useEffect } from 'react'
import SideBar from '../Components/SideBar'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import { BaseUrl } from '../Constants/BaseUrl'
import * as AiIcon from "react-icons/io"

import { useNavigate } from "react-router-dom"
const StudentAddToClass = () => {
    const { classId } = useParams();
    const [ClassDetail, setClassDetail] = useState()
    const [getAllStudent, setGetAllStudent] = useState([])



    const GetClassDetails = () => {
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

        fetch("http://localhost:8000/class/api/getClassDetail", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    setClassDetail(result.data)
                }
            })
            .catch(error => console.log('error', error));
    }


    const GetAllStudents = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8000/student/api/allStudents", requestOptions)
            .then(response => response.json())
            .then(result => {
                let studentList = []
                if (result.status === "Success") {
                    const data = result.data
                    for (const key in data) {
                        if (data[key].school === ClassDetail?.schoolName) {
                            studentList.push(data[key])
                        }
                    }
                    setGetAllStudent(studentList)
                }
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        GetClassDetails()
        GetAllStudents()
    }, [classId])


    return (
        <div className="w-full h-screen bg-back bg-cover flex items-center">
            <div className="w-full h-screen bg-opacityBgColor flex">
                <div className="mt-2">
                    <SideBar />
                </div>
                <div className={"w-100 overflow-auto bg-glass  ml-4 mr-4 mt-2.5 mb-8 rounded-3xl"}>
                    <div className={"w-100 overflow-auto bg-glass    mb-2  p-4 bg-[#164370]"}>

                        <div className='h-5 w-100 flex justify-between items-center '>
                            <div className='flex flex-row justify-center items-center'>
                                <h4 className='text-white font-bold'>{ClassDetail?.className}</h4>
                                <h4 className='text-white font-bold ml-4'>{`( ${ClassDetail?.schoolName} )`}</h4>

                            </div>


                        </div>
                    </div>

                    <div className='h-[88%] w-full px-2 flex justify-between'>
                        <div className='h-52 w-96 rounded-md overflow-hidden' >
                            <img className='' src={ClassDetail?.thumbnail} />
                        </div>
                        <div className='h-full bg-white w-50 rounded-md p-2 overflow-y-scroll'>
                            {
                                getAllStudent.map((i) => {
                                    return <div className='h-52'>
                                        <p>{i?.firstName}</p>
                                    </div>
                                })
                            }
                        </div>

                    </div>
                </div>


            </div>


        </div>
    )
}

export default StudentAddToClass