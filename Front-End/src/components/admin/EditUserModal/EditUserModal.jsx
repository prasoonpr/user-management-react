import React, { useEffect, useState } from "react";
import "./EditUserModal.css";
import axios from "../../../../constents/axios";

const EditUserModal = ({ isOpen, onClose, userId }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const reset=()=>{
    setImagePreview(null)
    onClose()
  }
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/admin/edit-user-details/${userId}`);
        if (response.status === 201) {
          setUser(response.data.user);
          if (response.data.user.image) {
            setImagePreview(`http://localhost:4040/images/${response.data.user.image}`);
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (isOpen && userId) {
      fetchUserDetails();
    }
  }, [userId, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', user.name);
      formData.append('email', user.email);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.put(`/admin/edit-user/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        reset()
        // You might want to add some success feedback here
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // You might want to add some error feedback here
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={reset} aria-label="Close">
          &times;
        </button>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="User profile preview" />
            </div>
          )}

          <button type="submit" className="submit-button">
            Edit User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;