import React from 'react'

const MainHeading = (props) => {
    return (
        <h1 className='font-bold text-fontColor text-[1.2rem]'>
            {props.text}
        </h1>
    )
}

export default MainHeading