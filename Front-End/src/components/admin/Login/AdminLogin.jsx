import React, { useState } from 'react';
import axios from '../../../../constents/axios.js'
import './AdminLogin.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAdmin } from '../../../store/slices/adminSlice.jsx';

function AdminLogin() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [emailvalid,setEmailvalid]=useState(true)
  const [passvalid,setPassvalid]=useState(true)
  const [message,setMessage]=useState('')
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleSubit=async(e)=>{
    e.preventDefault()

    const isEmail=email.trim()!=="";
    const isPassword=password.trim()!=="";
    setEmailvalid(isEmail)
    setPassvalid(isPassword)
    if(!isEmail ||!isPassword){
      return;
    }
    const userCredentails={email,password}
    try {
      const response=await axios.post('/admin/login',userCredentails)
      
      setMessage(response.data.message)

      if(response.status==201){
        const admin=response.data.adminDetails;
        const adminToken=response.data.adminToken;
        localStorage.setItem("adminToken",adminToken)
        
        
        dispatch(setAdmin(admin))
        navigate('/admin/dashbord')

      }
      
    } catch (error) {
      console.log(error);
      
    }


  }

  return (
    <div className="admin-login-body">
      <div className="admin-login-container">
        <div className="admin-login-row">
          <div className="admin-login-box">
            <div className="admin-login-icon">
              <i className="bi bi-shield-lock"></i>
            </div>
            {message? <div className="admin-login-title" style={{color:"red"}}>
              {message}
            </div>:<div className="admin-login-title">
              ADMIN PANEL
            </div> }
            
            <form onSubmit={handleSubit} className="admin-login-form">
              <div className="admin-form-group">
              {emailvalid?<label className="admin-form-label">EMAIL</label>:<label style={{color:"red"}} className="admin-form-label" >Email cannot be empty</label>}

                <input type="text" className="admin-input" onChange={(e)=>{setEmail(e.target.value)}}/>
              </div>
              <div className="admin-form-group">
                {passvalid?<label className="admin-form-label" >PASSWORD</label>:<label style={{color:"red"}} className="admin-form-label" >Password cannot be empty</label>}
                
                <input  type="password" className="admin-input" onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
              <div className="admin-login-button-container">
                <button type="submit" className="admin-login-button">
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
