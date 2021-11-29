import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import Login from '../Views/Login'

const AuthRouter = ({setToken}) => {
    //Ruta para el login
    return (
        <Routes>
            <Route path="/login" element={<Login setToken={setToken}/>}/>
            <Route path="*" element={<Navigate to="/login"/>}/>
        </Routes> 
    )
}

export default AuthRouter
