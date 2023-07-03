import React, { useEffect, useState } from 'react'
import * as MdIcon from "react-icons/md"
import { BaseUrl } from '../Constants/BaseUrl'
const CreateStudentModal = (props) => {

    const [masterData, setMasterData] = useState()
    const [courseObj, setCourse] = useState()

    const [formFields, setFormsFields] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        number: "",
        school: "",
        course: ""

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

    const submitHandler = () => {
        if (formFields.firstName === "") {
            alert("First Name Is Needed")
        } else if (formFields.lastName === "") {
            alert("Last Name Is Needed")
        }
        else if (formFields.password === "") {
            alert("Password Is Needed")
        }
        else if (formFields.confirmPassword === "") {
            alert("Confirm Password Is Needed")
        } else if (formFields.number === "") {
            alert("Number Is Needed")
        } else if (formFields.school === "") {
            alert("School Name Is Needed")
        } else if (formFields.course === "") {
            alert("Course Is Needed")
        } else if (formFields.password != formFields.confirmPassword) {
            alert("Password Does Not Matched")
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "firstName": formFields.firstName,
                "lastName": formFields.lastName,
                "email": formFields.email,
                "password": formFields.password,
                "school": formFields.school,
                "subject": formFields.course,
                "isAllow": true,
                "number": formFields.number
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${BaseUrl}student/api/signUp`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status === "Success") {
                        alert(result.message)
                        setFormsFields({
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            number: "",
                            school: "",
                            confirmPassword: ""


                        })
                    } else {
                        alert(result.message)
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    useEffect(() => {
        if (formFields.school !== "") {
            const CoourseObj = masterData.find((i) => i.SchoolName === formFields.school)
            setCourse(CoourseObj)
        }
    }, [formFields?.school])


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



    console.log(formFields)
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
                                <label for="email" className="block text-fontColor bold text-sm font-medium ">First Name</label>
                                <input value={formFields.firstName} onChange={(e) => {
                                    setFormsFields({
                                        ...formFields,
                                        firstName: e.target.value
                                    })
                                }} type="string" name="firstName" class=" bg-gray-50 border border-gray-300 text-[#104871] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required="" />
                            </div>

                            <div className='w-2/4'>
                                <label for="email" className="block text-fontColor bold text-sm font-medium ">Last Name</label>
                                <input value={formFields.lastName} onChange={(e) => {
                                    setFormsFields({
                                        ...formFields,
                                        lastName: e.target.value
                                    })
                                }} type="string" name="lastName" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required="" />
                            </div>
                        </div>

                        <div className='mt-2'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">Password</label>
                            <input onChange={(e) => {
                                setFormsFields({
                                    ...formFields,
                                    password: e.target.value
                                })
                            }} value={formFields.password} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div className='mt-2'>
                            <label for="password" className="block text-fontColor bold text-sm font-medium ">Confirm Password</label>
                            <input onChange={(e) => {
                                setFormsFields({
                                    ...formFields,
                                    confirmPassword: e.target.value
                                })
                            }} type="password" value={formFields.confirmPassword} name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>

                        <div className='flex flex-row  items-center mt-2'>
                            <div className='w-2/4'>
                                <label for="email" className="block text-fontColor bold text-sm font-medium ">Email</label>
                                <input onChange={(e) => {
                                    setFormsFields({
                                        ...formFields,
                                        email: e.target.value
                                    })
                                }} type="email" value={formFields.email} name="email" class=" bg-gray-50 border border-gray-300 text-[#104871] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required="" />
                            </div>

                            <div className='w-2/4'>
                                <label for="email" className="block text-fontColor bold text-sm font-medium ">Number</label>
                                <input onChange={(e) => {
                                    setFormsFields({
                                        ...formFields,
                                        number: e.target.value
                                    })
                                }} type="string" value={formFields.number} name="number" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required="" />
                            </div>
                        </div>

                        <div className='mt-2'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">School</label>
                            {
                                masterData && <select onChange={(e) => {
                                    setFormsFields({
                                        ...formFields,
                                        school: e.target.value
                                    })
                                }} name="cars" id="cars" className='dark:bg-gray-700 text-white h-10 rounded-lg w-full  px-3'>
                                    {masterData?.map((i) => {
                                        return <option className='' value={i.SchoolName}>{i?.SchoolName}</option>

                                    })}

                                </select>
                            }


                        </div>

                        <div className='mt-2'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">Course</label>

                            <select onChange={(e) => {
                                setFormsFields({
                                    ...formFields,
                                    course: e.target.value
                                })
                            }} name="cars" id="cars" className='dark:bg-gray-700 text-white h-10 rounded-lg w-full  px-3'>
                                {
                                    courseList.map((i) => {
                                        return <option className='' value={i}>{i?.className}</option>
                                    })
                                }
                            </select>

                        </div>
                    </form>
                    <div onClick={submitHandler} className="h-12 w-full bg-fontColor mt-2 rounded flex justify-center items-center cursor-pointer" >
                        <p className='text-white bold '>CREATE </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateStudentModal