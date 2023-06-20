import React from 'react'
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"
const StudentAddToClass = () => {
    const { classId } = useParams();
    return (
        <div>
            <p>{classId}</p>
        </div>
    )
}

export default StudentAddToClass