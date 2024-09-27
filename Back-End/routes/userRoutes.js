const express=require('express')
const user_routes=express()
user_routes.use(express.json());
const userController=require('../controllers/userController')
const {upload}=require('../middlewares/userMiddleware')
const userMiddleware=require("../middlewares/userMiddleware")

user_routes.post('/',upload.single('image'),userMiddleware.existUser,userController.registerUser)
user_routes.post('/login',userController.loginUser)
user_routes.get('/getUserDetails',userController.getUserDetails)
user_routes.put('/updateProfile',upload.single('image'),userController.updateProfile)

module.exports=user_routes;