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
import { AiFillFileExcel } from "react-icons/ai";
import CreateNotesModal from './CreateNotesModal'
import CreatePastPaperModal from './CreatePastPaperModal'
import WarningPopUp from './WarningPopUp'
import { MdDelete } from "react-icons/md";
const AllPastPapers = () => {
    const allStudent = useSelector((state) => state.date.allStudent)
    const { classId } = useParams();

    const [allSchools, setAllSchols] = useState([])
    const [SchoolDetails, setSchoolDetails] = useState()
    const dispatch = useDispatch()


    const [search, setSearch] = useState("")
    const [create, setCreate] = useState(false)
    const navigate = useNavigate()

    // const GetAllStudent = () => {
    //     dispatch(DataAction.GetALlStudents())
    // }


    const [allAssignment, setAllAssignment] = useState([])
    const GetAllPastPaper = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${BaseUrl}api/pastPaper/getAll`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "Success") {
                    let data = result.data
                    let list = []
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].ClassId === classId) {
                            list.push(data[i])
                        }

                    }

                    setAllAssignment(list)
                }
            })
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        GetAllPastPaper()
    }, [])

    const [selectedExcelFile, setSelectedExcelFile] = useState()
    const [excelWarningPopUp, setExcelWarningPopUp] = useState(false)

    const handleFileImport = () => {
        // Create an input element dynamically
        const input = document.createElement('input');
        input.type = 'file';

        // Trigger click on the input element
        input.click();

        // Handle file selection
        input.addEventListener('change', (e) => {
            const selectedFile = e.target.files[0];
            setExcelWarningPopUp(true)
            // Perform operations with the selected file, for example:
            console.log('Selected File:', selectedFile);
            setSelectedExcelFile(selectedFile)
            // You can add your logic to process the file here
        });
    };

    const uploadFileToServer = async () => {
        try {
            const formData = new FormData();
            formData.append('file', selectedExcelFile);
            formData.append('ClassId', classId);

            const response = await fetch(`${BaseUrl}api/pastPaper/uploadLacExcel`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('File uploaded successfully:', data);
                setSelectedExcelFile()
                setExcelWarningPopUp(false)
                GetAllPastPaper()
                alert("Record Uploaded Successfully")
                // You can handle the response data here
            } else {
                throw new Error('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error, show message to the user, etc.
        }
    };

    const DeleterecordHandler = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "PaperId": id
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BaseUrl}api/pastPaper/delete`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 200) {
                    GetAllPastPaper()
                    alert("Record delete successfully")
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
                <div className={"w-100 overflow-auto bg-glass  ml-4 mr-4 mt-2.5 mb-8 rounded-3xl"}>
                    <div className={"w-100 overflow-auto bg-glass   mb-8 rounded-3xl p-4 bg-[#164370]"}>

                        <div className='h-16 w-100 flex justify-between items-center '>
                            <div className='flex flex-row justify-center items-center'>
                                <h4 className='text-white font-bold'>All Past Papers</h4>

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


                                <div onClick={handleFileImport} className='cursor-pointer text-[2.8rem] text-[#19b915] ml-4'>
                                    <AiFillFileExcel />
                                </div>
                            </div>

                        </div>
                        <div className='bg-white h-[90%] p-5 rounded-2xl   '>
                            <div className='w-full flex-wrap flex justify-between overflow-scroll'>
                                {
                                    allAssignment.map((i) => {
                                        return (
                                            <div onClick={() => {
                                                // navigate(`/assignmentDetails/${i._id}`)
                                            }} className="min-h-40 bg-[#eef3f5] w-[49%] mt-4 rounded-md drop-shadow-md flex p-3">
                                                <div>
                                                    <div className='flex justify-between w-full'>
                                                        <h1 className=' text-[1.5rem] text-[#164370] font-bold' >{i?.PaperName}</h1>
                                                        <a href={i?.PdfFile} target='_blank'> <div className='text-4xl cursor-pointer item' >

                                                            <AiIcon.AiFillFilePdf />
                                                        </div>
                                                        </a>
                                                    </div>
                                                    <div className='w-full justify-between items-center flex '>
                                                        <div>
                                                            <h1 className=' text-[1rem] text-black] mt-2 font-bold' >{`Description`}</h1>
                                                            <h1 className=' text-[0.8rem] text-black] mt-2 w-full' >{`${i?.PaperDescription}`}</h1>
                                                        </div>
                                                        <div className='text-red-500 text-2xl'>
                                                            <MdDelete
                                                                onClick={() => {
                                                                    DeleterecordHandler(i._id)
                                                                }}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>



                                            </div>
                                        )
                                    })
                                }




                            </div>
                        </div>
                        {
                            excelWarningPopUp && <WarningPopUp
                                title={"PAST PAPER UPLOAD"}
                                onNoClick={() => setExcelWarningPopUp(false)}
                                onYesClick={uploadFileToServer}
                                message={`Are you sure you want to upload data from ${selectedExcelFile?.name}`}
                            />
                        }
                        {
                            create && <CreatePastPaperModal classId={classId} onCancel={() => {
                                GetAllPastPaper()
                                setCreate(false)
                            }} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllPastPapers