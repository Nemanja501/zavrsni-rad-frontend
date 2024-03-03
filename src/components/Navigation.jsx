import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../services/auth.service';
import {tokenContext} from '../contexts/tokenContext'

function Navigation({isLoggedIn}) {
    const {token, setToken} = useContext(tokenContext)
    const navigate = useNavigate();

  async function logout(){
    try{
        const response = await AuthService.logout();
        if(response){
            localStorage.removeItem('token');
            setToken('');
            navigate("/");
        }
    }catch(err){
        console.log(err);
    }
  }  

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to={'/'}>All Galleries</Link>
                </li>
                {!isLoggedIn ? 
                    <>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/login'}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/register'}>Register</Link>
                    </li>
                    </>
                :                     
                <>
                <li className="nav-item">
                    <Link className="nav-link" to={'/my-galleries'}>My Galleries</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={'/create'}>Create New Gallery</Link>
                </li>
                <li className="nav-item">
                    <button className="nav-link" onClick={logout}>Logout</button>
                </li>
                </>}
            </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navigation