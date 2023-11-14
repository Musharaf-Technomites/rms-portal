import React, { useEffect, useState } from 'react'
import * as MdIcon from "react-icons/md"
import Paragraph from './Paragraph'
import MyLoader from './MyLoader'
const WarningPopUp = (props) => {

    return (
        <div className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center'>
            <div className=' w-[30%] bg-white p-4 rounded-xl' >
                <div className='flex flex-col justify-center p-2 items-center'>

                    <div className='flex ustify-center items-center'>
                        <h4 className=' text-red-500 font-bold'>{props.title ? props.title : "DELETE STUDENT"}</h4>
                    </div>

                    <div className='text-center'>
                        <Paragraph
                            text={props.message ? props.message : `Are you sure you want to delete ${props.Name} account?`}
                        />

                        <div className='mt-2 flex justify-between'>
                            <div
                                onClick={props.onNoClick}
                                className='h-10 w-[40%] bg-yellow rounded-md flex justify-center items-center cursor-pointer'>
                                <Paragraph
                                    className="text-white"
                                    text="NO"
                                />
                            </div>
                            {
                                props.loading ? <div
                                    className='h-10 w-[40%]  rounded-md flex justify-center items-center'
                                > <MyLoader /> </div> : <div
                                    onClick={props.onYesClick}
                                    className='h-10 w-[40%] bg-fontColor rounded-md flex justify-center items-center cursor-pointer'>
                                    <Paragraph
                                        className="text-white"
                                        text="YES"
                                    />
                                </div>
                            }

                        </div>
                    </div>



                </div>


            </div>
        </div>
    )
}

export default WarningPopUp