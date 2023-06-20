import React, { useEffect, useState } from 'react'
import * as MdIcon from "react-icons/md"
import { BaseUrl } from "../Constants/BaseUrl"
const CreateClassModal = (props) => {

    const [masterData, setMasterData] = useState()


    const [formFields, setFormsFields] = useState({
        className: "",
        school: "",
        zoomLink: "",
        startData: "",
        endData: "",
        image: ""


    })
    const courseList = [
        {
            id: 1,
            Name: "A1"
        },
        {
            id: 2,
            Name: "A2"
        },
        {
            id: 3,
            Name: "A3"
        },
        {
            id: 4,
            Name: "A4"
        },
    ]
    const GetAllMasterData = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/allMasterData", requestOptions)
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


    const CreateClass = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "className": formFields.className,
            "schoolName": formFields.school,
            "zoomLink": formFields.zoomLink,
            "startDate": formFields.startData.toString(),
            "endDate": formFields.endData.toString(),
            "thumbnail": formFields.image,
            "studentList": []
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/class/api/classCreation", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    alert(result.message)
                    setFormsFields({
                        ...formFields,
                        className: "",
                        school: "",
                        zoomLink: "",
                        startData: "",
                        endData: "",
                        image: ""
                    })
                } else {
                    alert(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center'>
            <div className=' w-[30%] bg-white p-4'>
                <div className='flex flex-row justify-between p-2'>
                    <div className='flex justify-center items-center'>
                        <h4 className=' text-fontColor font-bold'>Create Students</h4>
                    </div>

                    <div onClick={props.onCancel} className='cursor-pointer text-fontColor text-[30px]'>
                        <MdIcon.MdCancel />
                    </div>

                </div>

                <div className='w-100'>
                    <form class=" " action="#">
                        <div className='flex flex-row   items-center mt-2'>
                            <div className='w-2/4'>
                                <label for="email" className="block text-fontColor bold text-sm font-medium ">Class Name</label>
                                <input onChange={(e) => setFormsFields({
                                    ...formFields,
                                    className: e.target.value
                                })} value={formFields.className} type="email" name="email" class=" bg-gray-50 border border-gray-300 text-[#104871] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Class Name" required="" />
                            </div>

                            <div className='w-2/4'>
                                <label for="email" className="block text-fontColor bold text-sm font-medium ">School</label>
                                {
                                    masterData && <select onChange={(e) => setFormsFields({
                                        ...formFields,
                                        school: e.target.value
                                    })} name="cars" id="cars" className='dark:bg-gray-700 text-white h-10 rounded-lg w-full  px-3'>
                                        {masterData?.map((i) => {
                                            return <option className='' value={i.SchoolName}>{i?.SchoolName}</option>

                                        })}

                                    </select>
                                }
                            </div>
                        </div>

                        <div className='w-full'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">Thumbnail Image </label>
                            <input onChange={(e) => setFormsFields({
                                ...formFields,
                                image: e.target.value
                            })} type="email" value={formFields.image} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Thumbnail Image" required="" />
                        </div>

                        <div className='w-full'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">Zoom Link</label>
                            <input onChange={(e) => setFormsFields({
                                ...formFields,
                                zoomLink: e.target.value
                            })} type="email" value={formFields.zoomLink} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Zoom Link" required="" />
                        </div>


                        <div className='flex flex-row  items-center mt-2'>
                            <div className='w-2/4'>
                                <label for="time" className="block text-fontColor bold text-sm font-medium ">Start Time</label>
                                <input onChange={(e) => setFormsFields({
                                    ...formFields,
                                    startData: e.target.value
                                })} type="time" value={formFields.startData} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Start Date" required="" />
                            </div>
                            <div className='w-2/4'>
                                <label for="time" className="block text-fontColor bold text-sm font-medium ">End Time</label>
                                <input type="time" onChange={(e) => setFormsFields({
                                    ...formFields,
                                    endData: e.target.value
                                })} value={formFields.endData} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="End Date" required="" />
                            </div>
                        </div>


                        {/* 
                        <div className='mt-2'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">Course</label>

                            <select name="cars" id="cars" className='dark:bg-gray-700 text-white h-10 rounded-lg w-full  px-3'>
                                {
                                    courseList.map((i) => {
                                        return <option className='' value="i.Name">{i?.Name}</option>
                                    })
                                }
                            </select>

                        </div> */}
                    </form>
                    <div onClick={() => {
                      
                    
                        if (formFields.className === "") {
                            alert("Class Name Is Needed")
                        } else if (formFields.school === "") {
                            alert("School Is Needed")
                        } else if (formFields.image==="") {
                            alert("Thumbnail Is Needed")
                        } else if (formFields.zoomLink==="") {
                            alert("Zoom Link Is Needed")
                        } else if (formFields.startData==="") {
                            alert("Start Date Is Needed")
                        } else if (formFields.endData==="") {
                            alert("End Date Is Needed")
                        } else {
                            CreateClass()
                        }


                    }} className="h-12 w-full bg-fontColor mt-2 rounded flex justify-center items-center cursor-pointer" >
                        <p className='text-white bold '>CREATE </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateClassModal