import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../../constents/axios'; // Adjust the import path as necessary
import { setUser } from '../../../store/slices/userSlice';
import './EditProfile.css'; // Create this CSS file for styling

function EditProfile() {
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.user.userDetails);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [con,setCon]=useState(false)

    useEffect(() => {
        
        const fetchUserDetails=async()=>{
            try {
              const response = await axios.get('/getUserDetails');
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
        }else{
            setName(userDetails.name);
            setEmail(userDetails.email);
            setImagePreview(`http://localhost:4040${userDetails.image}`);
        }
        
    }, [userDetails,dispatch]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Create a preview of the image
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.put('/updateProfile', formData); // Adjust the endpoint as necessary
            dispatch(setUser(response.data.userDetails)); // Update the user details in Redux store
            if (response){

                setCon(true)
            }else{
                setCon(false)
                alert('this user alredy exist')
            }
            
        } catch (error) {
            console.error(error);
            alert('Error updating profile');
        }
    };

    return (
        <div className="edit-profile-container">
            <form className="edit-profile-form" onSubmit={handleSubmit}>
            
            {con?<h3 style={{color:"green"}}>Profile Updated</h3>:<h2 style={{color:"#333"}}>Edit Profile</h2>}
                <div className="edit-profile-form-group">
                    <label className='edit-profile-label'>Name:</label>
                    <input
                    className='edit-profile-input'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="edit-profile-form-group">
                    <label className='edit-profile-label'>Email:</label>
                    <input
                    className='edit-profile-input'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="edit-profile-form-group">
                    <label className='edit-profile-label'>Profile Image:</label>
                    <input
                    className='edit-profile-file-input'
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Profile Preview"
                            className="edit-profile-image"
                        />
                    )}
                </div>
                <div className="edit-profile-buttons">
                    <button className='edit-profile-back-btn' type="button" onClick={() => window.history.back()}>
                        Back
                    </button>
                    <button className="edit-profile-save-btn" type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;
