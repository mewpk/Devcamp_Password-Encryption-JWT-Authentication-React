import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'

export default function Navbar() {
  return (
    <div style={{display: "flex", alignItems : "center" ,width : "100%" , justifyContent: "center" , gap : "20px" , backgroundColor:  "black" , padding : "20px 20px"}}> 
          <Link to="/" component={<Profile />}>Profile</Link>
          <Link to="/login" component={<Login />}>Login</Link>
          <Link to="/register" component={<Register />}>Register</Link>

    </div>
  )
}
