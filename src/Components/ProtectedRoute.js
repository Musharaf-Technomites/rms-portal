import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
const ProtectedRoute = (props) => {

    const { Component } = props
    const navigate = useNavigate()

    useEffect(() => {
        const getLocalData = async () => {
            let userData = await JSON.parse(localStorage.getItem('userSuccData'))
            if (!userData) {
                navigate('/login')
            }
        }
        getLocalData()


    })


    return (
        <Component />
    )
}

export default ProtectedRoute