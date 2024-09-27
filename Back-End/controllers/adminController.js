const User=require('../models/user')
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// for admin login
const adminLogin=async(req,res)=>{
    try {
        const admin = await User.findOne({ email: req.body.email });
        if (admin) {
            const adminPass = await admin.password == req.body.password;
            
            if (adminPass && admin.isAdmin) {
              const adminToken = jwt.sign(
                { id: admin._id, email: admin.email },
                JWT_SECRET,
                { expiresIn: "1d" }
              );
              return res.status(201).json({
                message: "success",
                adminToken,
                adminDetails: {
                  name: admin.name,
                  email: admin.email,
                  image: `/images/${admin.image}`,
                },
              });
            } else {
              return res.json({ message: "Password not match" });
            }
          } else {
            return res.json({ message: "Email not match" });
          }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error registering user", error });
        
    }
}

// for get admin details
const getAdminDetails = async (req, res) => {
    const adminToken = req.headers["authorization"]?.split(" ")[1];
    if (!adminToken) {
        
      return res.status(401).json({ message: "Token missing" });
      
    }
    try {
      const decoded = jwt.verify(adminToken, JWT_SECRET);
      const admin = await User.findById(decoded.id);
      
      if (admin) {
        return res.status(201).json({
          adminDetails: {
            name: admin.name,
            email: admin.email,
            image: `/images/${admin.image}`,
          },
        });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(error);
    }
  };

//for get users list
const getUserList=async(req,res)=>{
    try {
        const user=await User.find({isAdmin:{$ne:true}})
    res.status(201).json({user})
    
    } catch (error) {
        console.log(error);
        
    }
}

//for delete a user
const deleteUser=async(req,res)=>{
  
  
  try {
    const id=req.params.id;
    await User.deleteOne({_id:id})
    const user=await User.find({isAdmin:{$ne:true}})
    res.status(201).json({user})
  } catch (error) {
    console.log(error);
    
  }
}

//for add user from admin
const adduser = async (req, res) => {
  
  
  try {
    
    const image = req.file ? req.file.filename : null;
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image,
    });

    await user.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error registering user", error });
  }
};

//for edit by admin

const editByAdmin=async(req,res)=>{
  try {
    const id=req.params.id
    
    const { name, email } = req.body;
    const image = req.file ? req.file.filename : null; // if a new image is uploaded

    const user = await User.findById(id);
    // const existEmail=await User.findOne({email:email})

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    if (image) {
        user.image = image;
    }

    await user.save(); // Save updated user data to the database

    return res.status(200).json({
        message: 'Profile updated successfully',
        userDetails: {
            name: user.name,
            email: user.email,
            image: `/images/${user.image}`
        }
    });
  } catch (error) {
    console.log(error);
    
  }
}


//for get editUser
const getEditUserDetails=async(req,res)=>{
  
  try {
    const id=await req.params.id;
    if(id){
      const user=await User.findOne({_id:id})
      await res.status(201).json({user})
    }
  } catch (error) {
    console.log(error);
    
  }
}

module.exports={
    adminLogin,
    getAdminDetails,
    getUserList,
    deleteUser,
    adduser,
    editByAdmin,
    getEditUserDetails
}