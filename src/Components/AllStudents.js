import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import * as BiIcon from "react-icons/io"
import CreateStudentModal from './CreateStudentModal';
import Switch from "react-switch";
import { BaseUrl } from '../Constants/BaseUrl';
import * as AiIcon from "react-icons/ai"
import EditStudentPopUp from './EditStudentPopUp';
import WarningPopUp from './WarningPopUp';
const AllStudents = () => {
    const [allStudents, setAllStudents] = useState()
    const [search, setSearch] = useState("")
    const [create, setCreate] = useState(false)
    const [masterData, setMasterData] = useState()

    const [SelectedStudent, setSelectedStudent] = useState()
    const [update, setUpdate] = useState(false)

    const [loading, setLoading] = useState(false);

    const [warningPopUp, setWarningPopUp] = useState(false)

    const [formsFields, setFormFields] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        number: ""
    })






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

    const DeleteStudent = (id) => {
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "_id": id
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BaseUrl}student/api/deleteStudentRecord`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    setLoading(false)
                    setSelectedStudent()
                    setWarningPopUp(false)
                    GetAllStudents()
                } else {
                    setLoading(false)
                }
            })
            .catch(error => console.log('error', error));
    }

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

    const UpdateStudentInfo = () => {
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "_id": SelectedStudent._id,
            "firstName": formsFields.firstName,
            "lastName": formsFields.lastName,
            "email": formsFields.email,
            "password": formsFields.password,
            "number": formsFields.number
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BaseUrl}student/api/updateStudentRecord`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    GetAllStudents()
                    setUpdate(false)
                    setLoading(false)
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

                <div className={"w-100 overflow-auto bg-glass  ml-4 mr-4 mt-2.5 mb-8 rounded-3xl p-4 bg-[#164370]"}>

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
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email / Number</th>
                                        <th>{"School (Course)"}</th>
                                        <th>Allow</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        allStudents.map((i) => {
                                            let fullName = i?.firstName?.toLowerCase() + " " + i?.lastName?.toLowerCase()
                                            if (fullName.includes(search)) {
                                                return <tr className='m-4'>
                                                    <td onClick={() => {
                                                        setSelectedStudent(i)
                                                        setWarningPopUp(true)

                                                    }} className='h-[50px] w-[30px] text-[1.7rem] text-red-500 cursor-pointer'>
                                                        <AiIcon.AiTwotoneDelete className={"h-6 w-6 "} />
                                                    </td>
                                                    <td>{fullName}</td>
                                                    <td>
                                                        <p>{i?.email}</p>
                                                        <p className='font-bold text-xs'>{i?.number}</p>
                                                    </td>

                                                    <td>{`${i?.schoolName} (${i?.courseName})`}</td>
                                                    <tb>
                                                        <div className='flex'>
                                                            <Switch onChange={() => {
                                                                AllowStudentToLogin(i._id, !i.isAllow)
                                                            }} checked={i?.isAllow} />
                                                            <div onClick={() => {
                                                                setFormFields({
                                                                    ...formsFields,
                                                                    email: i.email,
                                                                    firstName: i.firstName,
                                                                    lastName: i.lastName,
                                                                    password: i.password,
                                                                    number: i.number
                                                                })
                                                                setSelectedStudent(i)
                                                                setUpdate(true)
                                                            }} className=' w-8 flex justify-center items-center text-lg text-fontColor cursor-pointer'>
                                                                <AiIcon.AiTwotoneEdit />
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

            </div>
            {
                update && <EditStudentPopUp
                    loading={loading}
                    numberValue={formsFields.number}
                    firstNameValue={formsFields.firstName}
                    lastNameValue={formsFields.lastName}
                    emailValue={formsFields.email}
                    passwordValue={formsFields.password}




                    onChanegEmail={(e) => {
                        setFormFields({
                            ...formsFields,
                            email: e.target.value
                        })

                    }}
                    onChanegPassword={(e) => {
                        setFormFields({
                            ...formsFields,
                            password: e.target.value
                        })

                    }}

                    onChanegFirstName={(e) => {
                        setFormFields({
                            ...formsFields,
                            firstName: e.target.value
                        })

                    }}

                    onChanegLastName={(e) => {
                        setFormFields({
                            ...formsFields,
                            lastName: e.target.value
                        })

                    }}


                    onChanegNumber={(e) => {
                        setFormFields({
                            ...formsFields,
                            number: e.target.value
                        })

                    }}
                    onCancel={() => setUpdate(false)}
                    onSubmit={UpdateStudentInfo}
                />
            }


            {
                create && <CreateStudentModal
                    onCreate={() => alert("Yahoo")}
                    onCancel={() => {
                        GetAllStudents()
                        setCreate(false)
                    }} />
            }
            {
                warningPopUp && <WarningPopUp
                    loading={loading}
                    Name={`${SelectedStudent?.firstName} ${SelectedStudent?.lastName}`}
                    onNoClick={() => setWarningPopUp(false)}
                    onYesClick={() => {
                        DeleteStudent(SelectedStudent._id)
                    }}

                />
            }

        </div >
    )
}

export default AllStudents