import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import Home from '../Views/Home'
import CreatePost from '../Views/CreatePost'
import PostDetails from '../Views/PostDetails'
import EditPost from '../Views/EditPost'

const AdminRouter = ({setToken, role, username}) => {
    //Rutas a las cuales tendra acceso el administrador
    return (
        <Routes>
            <Route path="/home" element={<Home setToken={setToken} role={role} username={username}/>}/>
            <Route path="/new" element={<CreatePost/>}/>
            <Route path="/view/:idPost" element={<PostDetails activeUsername={username} role={role}/>}/>
            <Route path="/edit/:idPost" element={<EditPost/>}/>
            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes> 
    )
}

export default AdminRouter