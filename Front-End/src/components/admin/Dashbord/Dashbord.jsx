import React from "react";
import "./Dashbord.css";
import { useDispatch, useSelector } from "react-redux";
import { clearAdmin, setAdmin } from "../../../store/slices/adminSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../../constents/axios";
import DeleteModal from "../DeleteModal/DeleteModal";
import { clearUser } from "../../../store/slices/userSlice";
import AddUserModal from "../AddUserModal/AddUserModal";
import EditUserModal from "../EditUserModal/EditUserModal";

function Dashbord() {
  const adminDetails = useSelector((state) => state?.admin?.adminDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAdduserModalOpen,setAdduserModalOpen]=useState(false)
  const [isEditModalOpen,setEditModalOpen]=useState(false)
  const [deleteId, setDeleteId] = useState(null);
  const [editId,setEditId]=useState(null)


useEffect(() => {

// for get users list
  const fetchUserList = async () => {
    try {
      const response = await axios.get("/admin/getUserList");
      if (response.status === 201) {
        setUserList(response.data.user);
        setFilteredList(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  fetchUserList();

    // for get admin details
const fetchAdminDetails = async () => {
  try {
      const response = await axios.get("/admin/getAdminDetails", {
        role: "admin",
      });
      if (response.status === 201) {
        dispatch(setAdmin(response.data.adminDetails));
      }
    } catch (error) {
      console.log(error);
      navigate("/admin/login");
    }
 };
 if (!adminDetails) {
    fetchAdminDetails();
  }
}, [dispatch, adminDetails, navigate,isAdduserModalOpen,isEditModalOpen]);


  //for handle search input
  const searchInput = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === "") {
      setFilteredList(userList);
      console.log("hai");
    } else {
      setFilteredList(
        userList.filter((user) => user.name.toLowerCase().includes(term))
      );
    }
  };


  //for handle logout
  const handlelogout = () => {
    dispatch(clearAdmin());
    navigate("/admin/login");
  };


  //for handling delete button
  const openModalDelete = (userId) => {
    setDeleteId(userId);
    setDeleteModalOpen(true);
  };
  const closeModalDelte = () => setDeleteModalOpen(false);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/admin/dashboard/deleteuser/${deleteId}`
      );
      if (response.status === 201) {
        setUserList(response.data.user);
        setFilteredList(response.data.user);
        dispatch(clearUser());
        closeModalDelte();
      }
    } catch (error) {
      console.log(error);
    }
  };
  
// for add user

const openModalAdduser=()=>setAdduserModalOpen(true)
const closeModalAdduser=()=>setAdduserModalOpen(false)

// for handling the edit
const openModalEdit=(userId)=>{
  setEditId(userId)
  setEditModalOpen(true)
}
const closeModalEdit=()=>setEditModalOpen(false)


  return (
    <div>
      <div className="dashboard-navbar">
        <div className="dashboard-logo">
          <img
            src="https://cdn-icons-png.freepik.com/512/8686/8686102.png"
            alt="Logo"
          />
          <a
            href="./dashbord"
            style={{ color: "white", textDecoration: "none" }}
          >
            Dashboard
          </a>
        </div>

        <div className="dashboard-perfil">
          <div className="dashboard-contenido-perfil">
            <p>{adminDetails?.name}</p>
            <img
              src={`http://localhost:4040${adminDetails?.image}`}
              alt="Usuario"
            />
          </div>
          <div className="dashboard-desplegable">
            <form action="adminLogout" method="post">
              <button onClick={handlelogout} className="dashboard-logout-btn">
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="dashboard-contenedor dashboard-contenido-principal">
        <div className="dashboard-usuarios-barra">
          <h2>Users List</h2>
            <button id="nuevoUsuario" onClick={openModalAdduser} className="dashboard-add-user-btn">
              <i className="fas fa-plus"></i> Add User
            </button>
        </div>

        
        <div className="dashboard-busqueda-barra">
          <input
            id="nombre"
            name="search"
            type="search"
            value={searchTerm}
            onChange={searchInput}
            placeholder="Search User"
            className="dashboard-search-input"
          />
          <button
            onClick={() => {
              window.history.back();
            }}
            id="busquedaUsuario"
            className="dashboard-search-btn"
          >
            Reset
          </button>
        </div>
      

        <table className="dashboard-table table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Profile</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td scope="row">{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <img
                      style={{ height: 35, width: 55 }}
                      src={`http://localhost:4040/images/${user.image}`}
                      alt="no profile"
                    />
                  </td>
                  <td>
                    <button className="dashboard-edit-btn"
                    onClick={()=>openModalEdit(user._id)}
                    >Edit</button>
                    <button
                      className="dashboard-delete-btn"
                      onClick={() => openModalDelete(user._id)}
                    >
                      Delete
                    </button>
                    
                  </td>
                </tr>
              );
            })}
            <DeleteModal
              isOpen={isDeleteModalOpen}
              onClose={closeModalDelte}
              confirmDelete={handleDelete}
            />
            <AddUserModal isOpen={isAdduserModalOpen} onClose={closeModalAdduser} />
            <EditUserModal isOpen={isEditModalOpen} onClose={closeModalEdit} userId={editId}/>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashbord;
