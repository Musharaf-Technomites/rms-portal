import React from 'react'
import "./SideBar.css"
const SideBar = (props) => {
    return (
        <div className='MainDiv'>
            <div style={{ height: "100%", width: '20%', backgroundColor: 'blue' }}>

            </div>

            <div style={{ height: "100%", width: '80%', backgroundColor: 'green' }}>
                {
                    props.children
                }
            </div>
        </div>
    )
}
export default SideBar
