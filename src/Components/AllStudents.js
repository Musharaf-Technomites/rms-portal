import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import * as BiIcon from "react-icons/io"
import CreateStudentModal from './CreateStudentModal';
import Switch from "react-switch";
import { BaseUrl } from '../Constants/BaseUrl';

const AllStudents = () => {
    const [allStudents, setAllStudents] = useState()
    const [search, setSearch] = useState("")
    const [create, setCreate] = useState(false)
    const [masterData, setMasterData] = useState()

    const GetAllStudents = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${BaseUrl}student/api/allStudents`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    setAllStudents(result.data)
                }
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        GetAllStudents()
    }, [])

    const AllowStudentToLogin = (studentId, allow) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "studentId": studentId,
            "isAllow": allow
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BaseUrl}student/api/allowStudent`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    GetAllStudents()
                }
            })
            .catch(error => console.log('error', error));
    }


    const GetAllMasterData = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${BaseUrl}api/allMasterData`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    setMasterData(result.data)
                }
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        GetAllMasterData()
    }, [])

    return (
        <div className="w-full h-screen bg-back bg-cover flex items-center">
            <div className="w-full h-screen bg-opacityBgColor flex">
                <div className="mt-2">
                    <SideBar />
                </div>

                <div className={"w-100 overflow-auto bg-glass  ml-4 mr-4 mt-2.5 mb-8 rounded-3xl p-4 ]"}>

                    <div className='h-16 w-100 flex justify-between items-center '>
                        <div className='flex flex-row justify-center items-center'>
                            <h4 className='text-white font-bold'>ALL STUDENTS</h4>

                        </div>
                        <div className='flex flex-row justify-center items-center'>
                            <div className='flex flex-row justify-between items-center bg-white  pr-3 ml-4'>
                                <input onChange={(e) => setSearch(e.target.value)} className='h-10  focus:border-gray-500 w-80 text-lg p-2' />
                                <div className='flex justify-center items-center '>
                                    <BiIcon.IoMdSearch />
                                </div>

                            </div>
                            {/* <div onClick={() => { setCreate(true) }} className='cursor-pointer text-[2.8rem] text-white ml-4'>
                                <BiIcon.IoMdAddCircle />
                            </div> */}
                        </div>

                    </div>
                    <div className='bg-white h-[90%] p-5 rounded-2xl overflow-auto'>
                        {
                            allStudents && <table class=" w-100">
                                <thead>
                                    <tr style={{ padding: 10 }} className=" h-12  rounded-2xl text-lg	">
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Number</th>
                                        <th>{"School (Course)"}</th>
                                        <th>Allow</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allStudents.map((i) => {
                                            let fullName = i?.firstName?.toLowerCase() + " " + i?.lastName?.toLowerCase()
                                            if (fullName.includes(search)) {
                                                return <tr className='m-2'>
                                                    <td>{fullName}</td>
                                                    <td>{i?.email}</td>
                                                    <td>{i?.number}</td>
                                                    <td>{`${i?.schoolName} (${i?.courseName})`}</td>
                                                    <tb> <Switch onChange={() => {
                                                        AllowStudentToLogin(i._id, !i.isAllow)

                                                    }} checked={i?.isAllow} /></tb>
                                                </tr>
                                            }

                                        })
                                    }

                                </tbody>
                            </table>
                        }
                    </div>


                </div>

            </div>
            {
                create && <CreateStudentModal
                    onCreate={() => alert("Yahoo")}
                    onCancel={() => {
                        GetAllStudents()
                        setCreate(false)
                    }} />
            }

        </div>
    )
}

export default AllStudents