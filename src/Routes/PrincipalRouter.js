import React,{useState, useEffect} from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import UserServices from '../Services/UserServices'
import AdminRouter from './AdminRouter'
import UserRouter from './UserRouter'
import AuthRouter from './AuthRouter'

const PrincipalRouter = () => {
    const verifyToken = UserServices.verifyToken;
    const [token, setToken] = useState(localStorage.getItem('token') || undefined);
    const [role, setRole] = useState(localStorage.getItem('role') || undefined);
    const [username, setUserName] = useState(undefined);

    useEffect(() => {
        async function getUser(){
            if(token){
                localStorage.setItem('token', token);
                if(!role || !username){
                    const user = await verifyToken(token);
                    localStorage.setItem('role', user.role);
                    setRole(user.role); 
                    setUserName(user.username);
                }
            }else{
                setRole(undefined);
            }
        }

        getUser();
    }, [token])

    //Renderireccionar al usuario a su respectivo router dependiendo de su rol y sino al lagin
    return (
        <Router>
            {role === "user" && <UserRouter setToken={setToken} username={username} role={role}/>}
            {role === "admin" && <AdminRouter setToken={setToken} username={username} role={role}/>}
            {(!token || !role) && <AuthRouter setToken={setToken} />}
        </Router>
    )
}

export default PrincipalRouter
