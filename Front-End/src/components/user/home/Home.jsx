// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { clearUser, setUser } from "../../../store/slices/userSlice.jsx"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from '../../../../constents/axios.js'

function Home() {
    const userDetails=useSelector((state)=>state?.user?.userDetails)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
      const fetchUserDetails=async()=>{
        try {
          const response = await axios.get('/getUserDetails',{role:"user"});
          if (response.status === 201) {
              dispatch(setUser(response.data.userDetails));
          }
        } catch (error) {
          console.log(error);
          navigate('/login');
        }
      }

      if (!userDetails) {
        fetchUserDetails();
    }
      
    },[dispatch,userDetails,navigate])

    const handleLogout=()=>{
        dispatch(clearUser())
        navigate('/login')
    }
    
  return (
    <div className="bodye">
      <div className="container">
        <div className="profile-card">
          <div className="profile-photo">
            <img src={`http://localhost:4040${userDetails?.image}`} alt="Profile Photo" id="profileImage" />
          </div>
          <h1 className="username">{userDetails?.name}</h1>
          <div className="buttons">
            <button className="btn edit-btn" onClick={()=>{navigate('/edit-profile')}}>Edit Profile</button>
            <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
