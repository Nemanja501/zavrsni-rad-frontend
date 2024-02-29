import React from 'react'
import { Link } from 'react-router-dom'

function Navigation({isLoggedIn}) {
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
                </>}
            </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navigation