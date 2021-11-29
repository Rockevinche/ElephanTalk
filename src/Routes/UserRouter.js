import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import Home from '../Views/Home'
import PostDetails from '../Views/PostDetails'


const UserRouter = ({setToken, role, username}) => {
    //Rutas a las cuales tendra acceso el usuario
    return (
        <Routes>
            <Route path="/home" element={<Home setToken={setToken} role={role} username={username}/>}/>
            <Route path="/view/:idPost" element={<PostDetails activeUsername={username} role={role}/>}/>
            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes> 
    )
}

export default UserRouter