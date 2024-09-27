import React, { useState } from 'react'
import './AddUserModal.css'
import axios from '../../../../constents/axios'

const AddUserModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState(null)
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);

  const reset=async()=>{
    setName('')
    setEmail('')
    setPassword('')
    setImage(null)
    onClose()
  }
  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5 && password.length <= 10;
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isNameValid = name.trim() !== ''; 
    
    setEmailValid(isEmailValid);
    setPasswordValid(isPasswordValid);
    setNameValid(isNameValid);
    
    if (!isEmailValid || !isPasswordValid || !isNameValid ) {
        return; 
      }
      const formData=new FormData();
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      if(image){
        formData.append('image',image)
      }
    
    try {
        console.log(formData);
        
      const response= await axios.post('/admin/adduser',formData)

      if(response.status===201){
        reset()
      }
      else{
        alert("the user alredy exist")
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={reset} aria-label="Close">
          &times;
        </button>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            {nameValid?<label htmlFor="name">Name</label>:<label style={{color:"red"}} htmlFor="name">Name cannot be empty</label>}
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
             
            />
          </div>

          <div className="form-group">
            {emailValid?<label htmlFor="email">E-mail</label>:<label style={{color:"red"}} htmlFor="email">Email not correct format</label>}
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            {passwordValid?<label htmlFor="password">Password</label>:<label style={{color:"red"}} htmlFor="password">Password must be between 5-10 characters</label>}
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button type="submit" className="submit-button">
            Add User
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddUserModal