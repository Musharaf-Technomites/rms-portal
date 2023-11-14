import React from 'react'

const Paragraph = (props) => {
    return (
        <h1 className={`font-bold text-fontColor text-[0.8rem] ${props.className}`}>
            {props.text}
        </h1>
    )
}

export default Paragraph