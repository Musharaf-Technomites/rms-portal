import React, { useEffect, useState } from 'react'
import * as MdIcon from "react-icons/md"
import * as AiIcon from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import { BaseUrl } from "../Constants/BaseUrl"
import * as DataAction from "../Store/DataAction"
const AllStudentByClassIdPopUp = (props) => {
    const AllStudents = useSelector((state) => state.date.allStudentByClassId)
    const dispatch = useDispatch()






    return (
        <div className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center'>
            <div className=' w-[30%] bg-white p-4'>
                <div className='flex flex-row justify-between '>
                    <div className='flex justify-center items-center mb-2'>
                        <h4 className=' text-fontColor font-bold'>All Students</h4>
                    </div>

                    {/* <div onClick={props.onClick} className='cursor-pointer text-fontColor text-[30px]'>
                        <MdIcon.MdCancel />
                    </div> */}



                </div>

                <div className='overflow-scroll	'>
                    {
                        AllStudents?.map((i) => {
                            return (
                                <div onClick={() => {
                                    console.log(i)
                                    dispatch(DataAction.SelectQuizStudentAction(i?._id))

                                }} className='h-12 hover:drop-shadow-md w-full mb-2 rounded-lg bg-slate-200 flex p-2 items-center justify-between'>
                                    <p>
                                        {i?.firstName + " " + i?.lastName}

                                    </p>
                                    {
                                        i?.isSelected ? <div className='cursor-pointer text-fontColor text-[30px]'>
                                            <AiIcon.AiFillCheckCircle />
                                        </div> : <div className='cursor-pointer text-fontColor text-[30px]'>
                                            <AiIcon.AiOutlineCheckCircle />
                                        </div>
                                    }



                                </div>
                            )
                        })
                    }
                </div>

                <div className='w-100'>

                    <div onClick={props.onClick} className="h-12 w-full bg-fontColor mt-2 rounded flex justify-center items-center cursor-pointer" >
                        <p className='text-white bold '>Close</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllStudentByClassIdPopUp