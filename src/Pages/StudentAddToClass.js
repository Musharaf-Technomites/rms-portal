import React, { useState, useEffect } from 'react'
import SideBar from '../Components/SideBar'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as DataAction from "../Store/DataAction"

const StudentAddToClass = () => {
    const { classId } = useParams();
    const [ClassDetail, setClassDetail] = useState()
    const dispatch = useDispatch()

    let allStudent = useSelector((state) => state.date.allStudent)
    let allStudenBySchool = allStudent.filter(i => i.school === ClassDetail?.schoolName)






    const AddStudentIntoClass = (classId, StudentId) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "classId": classId,
            "studentId": StudentId
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/class/api/addStudent", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    GetClassDetails()



                }
            })
            .catch(error => console.log('error', error));
    }


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
                    for (let i = 0; i < allStudenBySchool.length; i++) {
                        for (let j = 0; j < ClassDetail?.studentList.length; j++) {
                            if (ClassDetail.studentList[j].id === allStudenBySchool[i]._id) {
                                allStudenBySchool[i]["inClass"] = "true"
                            } else {
                                allStudenBySchool[i]["inClass"] = "false"
                            }

                        }

                    }
                }
            })
            .catch(error => console.log('error', error));
    }



    useEffect(() => {
        GetClassDetails()

    }, [])


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
                                allStudent.filter(i => i.school === ClassDetail?.schoolName).map((i) => {
                                    return <div onClick={() => {
                                        AddStudentIntoClass(classId, i?._id)
                                    }} className='h-24 cursor-pointer'>
                                        <p>{i?._id}</p>
                                        <p>{i?.inClass}</p>
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