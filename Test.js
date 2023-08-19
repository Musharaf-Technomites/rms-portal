import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import * as FaIcon from "react-icons/fa"
import * as TfIcon from "react-icons/tfi"
import * as BsIcon from "react-icons/bs"
import { BaseUrl } from '../Constants/BaseUrl'
const Dashboard = (props) => {
    const List = [
        { Id: 1, Name: "Schools" },
        { Id: 2, Name: "Classes" },
        { Id: 3, Name: "Students" },
        { Id: 4, Name: "Assignments" },
        { Id: 5, Name: "Quizes" },
        { Id: 6, Name: "Notes" },
        { Id: 7, Name: "PastPapers" },
    ]


    const CountTile = ({ name, count, index }) => {
        const Count = index.Id === 1 ? AllCount?.Schools : index.Id === 2 ? AllCount?.Classes : index.Id === 3 ? AllCount?.Students : index.Id === 4 ? AllCount?.Assignments : index.Id === 5 ? AllCount?.Quizes : index.Id === 6 ? AllCount?.Notes : index.Id === 7 ? AllCount?.PastPapers : 0

        return (
            <div className='h-[100px] w-[23.6%] bg-gray-100 m-2 rounded-2xl justify-center items-center flex flex-row'>
                <div className='h-[100%] w-[30%] text-fontColor text-6xl flex justify-center items-center'>
                    {
                        index.Id === 1 ?
                            <FaIcon.FaSchool />
                            :
                            index.Id === 2
                                ?
                                <TfIcon.TfiBlackboard />
                                :
                                index.Id === 3 ?
                                    <BsIcon.BsFillPersonFill />
                                    :
                                    index.Id === 4 ?
                                        <FaIcon.FaNewspaper />
                                        :
                                        index.Id === 5 ?
                                            <BsIcon.BsCardChecklist />
                                            :

                                            index.Id === 6 ?
                                                <BsIcon.BsFillFileEarmarkFill />

                                                :

                                                <BsIcon.BsPaperclip />

                    }

                </div>

                <div className='h-full w-[70%] flex justify-center items-center flex-col'>
                    <h4 className='text-2xl font-bold text-[#F05152]'>{Count}</h4>
                    <h4 className='text-fontColor text-lg text-bold' >{`${name?.toUpperCase()}`}</h4>
                </div>



            </div>
        )
    }


    const [AllCount, setCount] = useState()
    const GetAllCount = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${BaseUrl}api/getAllRecordCount`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    setCount(result?.data)
                }
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        GetAllCount()
    }, [])

    const ZoomClassUrl = "https://us05web.zoom.us/j/85054786562?pwd=5nqE0ttRw7P43Ad3A9z7q0o8pXzL5q.1"
    return (
        <div className="w-full bg-back bg-cover  items-center">
            <div className="w-full h-screen bg-opacityBgColor flex">
                <div className="mt-2">
                    <SideBar />
                </div>
                <div className={"w-100  bg-glass  ml-4 mr-4 mt-2.5 mb-8 rounded-3xl"}>
                    <div className='h-full w-full bg-fontColor p-4  '>
                        <div className='h-full w-full bg-white rounded-xl p-7'>
                            <div className='w-full h-[40%] rounded-2xl '>
                                <a href={ZoomClassUrl} target='_blank'>
                                    <img
                                        className='h-full w-full rounded-2xl cursor-pointer'
                                        src={require("../Assets/homeBanner.jpg")}
                                    />
                                </a>

                            </div>

                            <div className='h-[300] w-full my-4 flex flex-wrap '>
                                {
                                    List?.map((i) => {


                                        return (
                                            <CountTile
                                                index={i}
                                                count={10}
                                                name={i.Name}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Dashboard