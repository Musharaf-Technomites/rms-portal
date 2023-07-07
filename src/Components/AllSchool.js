import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { BaseUrl } from '../Constants/BaseUrl'

import moment from 'moment'
import { useDispatch, useSelector } from "react-redux"
import CreateClassModal from './CreateClassModal'
import { useNavigate } from "react-router-dom"
import * as DataAction from "../Store/DataAction"
import * as BiIcon from "react-icons/io"
import * as AiIcon from "react-icons/ai"
import CreateSchoolModal from './CreateSchoolModal'
const AllSchool = () => {
    const allStudent = useSelector((state) => state.date.allStudent)

    const [allSchools, setAllSchols] = useState([])
    const dispatch = useDispatch()


    const [search, setSearch] = useState("")
    const [create, setCreate] = useState(false)
    const navigate = useNavigate()

    // const GetAllStudent = () => {
    //     dispatch(DataAction.GetALlStudents())
    // }

    const GetAllSchool = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${BaseUrl}api/allMasterData`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    setAllSchols(result.data)
                }
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        GetAllSchool()

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
                                <h4 className='text-white font-bold'>ALL SCHOOLS</h4>

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
                        <div className='bg-white h-[90%] p-5 rounded-2xl overflow-auto'>
                            {
                                allSchools && <table class=" w-100">
                                    <thead>
                                        <tr style={{ padding: 10 }} className=" h-12  rounded-2xl text-lg	">
                                            <th>School Name</th>
                                            <th>Classes</th>
                                            <th>{` `}</th>


                                        </tr>
                                    </thead>
                                    <tbody className='m-6'>
                                        {
                                            allSchools.map((i) => {

                                                if (i?.SchoolName.includes(search)) {
                                                    return <tr className='m-2 h-12 px-6 odd:bg-[#e4e0e0] rounded-full '>
                                                        <td className='px-2'> {i.SchoolName}</td>
                                                        <td className='text-md font-bold items-center justify-center'>{i?.ClassList?.length}</td>
                                                        <td onClick={() => {
                                                            navigate(`/schoolDetails/${i?._id}`)
                                                        }} className='text-xl font-bold cursor-pointer'>{
                                                                <AiIcon.AiFillCaretRight />
                                                            }</td>

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

            </div>
            {create && <CreateSchoolModal onCancel={() => {
                GetAllSchool()
                setCreate(false)
            }} />}



        </div>
    )
}

export default AllSchool