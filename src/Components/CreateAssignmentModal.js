import React, { useEffect, useState } from 'react'
import * as MdIcon from "react-icons/md"
import { BaseUrl } from "../Constants/BaseUrl"
const CreateAssignmentModal = (props) => {
    const IsCreate = props.IsCreate
    const Data = props.date





    const [formFields, setFormsFields] = useState({
        AssignmentName: "",
        AssignmentDescription: "",
        LastDate: "",
        PdfFile: "",
        ClassId: "",
        TotalMarks: ""


    })
    const AssignmentCreation = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "AssignmentName": formFields.AssignmentName,
            "AssignmentDescription": formFields.AssignmentDescription,
            "LastDate": formFields.LastDate,
            "PdfFile": formFields.PdfFile,
            "ClassId": props.classId,
            "TotalMarks": formFields.TotalMarks
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BaseUrl}api/assignment/create`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    alert(result.message)
                    setFormsFields({
                        ...formFields,
                        AssignmentDescription: "",
                        AssignmentName: "",
                        PdfFile: "",
                        TotalMarks: "",
                        LastDate: ""
                    })
                } else {
                    alert(result.message)
                }
            })
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        if (!IsCreate) {
            setFormsFields({
                ...formFields,
                AssignmentName: Data.AssignmentName,
                AssignmentDescription: Data.AssignmentDescription,
                LastDate: Data.LastDate,
                PdfFile: Data.PdfFile,
                TotalMarks: Data.TotalMarks,
            })
        }

    }, [IsCreate, Data])

    const UpdateAssignmentDandler = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "AssignmentId": Data._id,
            "AssignmentName": formFields.AssignmentName,
            "AssignmentDescription": formFields.AssignmentDescription,
            "LastDate": formFields.LastDate,
            "PdfFile": formFields.PdfFile,
            "ClassId": props.classId,
            "TotalMarks": formFields.TotalMarks,
            "SubmittedList": Data.SubmittedList,

        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BaseUrl}api/assignment/assignmentUpdate`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    alert("Assignment Updated Successfully")
                    setFormsFields({
                        ...formFields,
                        AssignmentDescription: "",
                        AssignmentName: "",
                        PdfFile: "",
                        TotalMarks: "",
                        LastDate: ""
                    })
                } else {
                    alert("Something Went Wrong")
                }
            })
            .catch(error => console.log('error', error));
    }


    return (
        <div className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center'>
            <div className=' w-[30%] bg-white p-4'>
                <div className='flex flex-row justify-between '>
                    <div className='flex justify-center items-center'>
                        <h4 className=' text-fontColor font-bold'>{IsCreate ? "Create Assignment" : "Update Assignment"}</h4>
                    </div>

                    <div onClick={props.onCancel} className='cursor-pointer text-fontColor text-[30px]'>
                        <MdIcon.MdCancel />
                    </div>

                </div>

                <div className='w-100'>
                    <form class=" " action="#">
                        <div className='flex flex-row   items-center mt-2'>
                            <div className='w-full'>
                                <label for="email" className="block text-fontColor bold text-sm font-medium ">Assignment Name</label>
                                <input onChange={(e) => setFormsFields({
                                    ...formFields,
                                    AssignmentName: e.target.value
                                })} value={formFields.AssignmentName} type="email" name="email" class=" bg-gray-50 border border-gray-300 text-[#104871] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Assignment Name Here" required="" />
                            </div>


                        </div>

                        <div className='w-full'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">PDF Link </label>
                            <input onChange={(e) => setFormsFields({
                                ...formFields,
                                PdfFile: e.target.value
                            })} type="email" value={formFields.PdfFile} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="PDF Link Here" required="" />
                        </div>



                        <div className='flex flex-row  items-center mt-2'>
                            <div className='w-2/4'>
                                <label for="time" className="block text-fontColor bold text-sm font-medium ">Last Date</label>
                                <input onChange={(e) => setFormsFields({
                                    ...formFields,
                                    LastDate: e.target.value
                                })} type="date" value={formFields.LastDate} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Start Date" required="" />
                            </div>
                            <div className='w-2/4'>
                                <label for="time" className="block text-fontColor bold text-sm font-medium ">Total Marks</label>
                                <input onChange={(e) => setFormsFields({
                                    ...formFields,
                                    TotalMarks: e.target.value
                                })} type="String" value={formFields.TotalMarks} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Marks" required="" />
                            </div>
                        </div>

                        <div className='w-full'>
                            <label for="email" className="block text-fontColor bold text-sm font-medium ">Description</label>
                            <input onChange={(e) => setFormsFields({
                                ...formFields,
                                AssignmentDescription: e.target.value
                            })} type="email" value={formFields.AssignmentDescription} name="email" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description Here" required="" />
                        </div>



                    </form>
                    <div onClick={() => {


                        if (formFields.AssignmentName === "") {
                            alert("Assignment Name Is Needed")
                        } else if (formFields.AssignmentDescription === "") {
                            alert("Description Is Needed")
                        } else if (formFields.PdfFile === "") {
                            alert("PDF Link Is Needed")
                        } else if (formFields.TotalMarks === "") {
                            alert("Total Marks Is Needed")
                        } else if (formFields.LastDate === "") {
                            alert("Last Date Is Needed")
                        } else {
                            if (IsCreate) {
                                AssignmentCreation()
                            } else {
                                UpdateAssignmentDandler()
                            }



                        }


                    }} className="h-12 w-full bg-fontColor mt-2 rounded flex justify-center items-center cursor-pointer" >
                        <p className='text-white bold '>{IsCreate ? "CREATE" : "UPDATE"} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAssignmentModal