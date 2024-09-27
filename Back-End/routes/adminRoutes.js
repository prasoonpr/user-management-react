const express=require('express')
const admin_route=express()
admin_route.use(express.json());
const adminController=require('../controllers/adminController')
const {upload}=require('../middlewares/userMiddleware')
const userMiddleware=require("../middlewares/userMiddleware")

admin_route.post('/login',adminController.adminLogin)
admin_route.get('/getAdminDetails',adminController.getAdminDetails)
admin_route.get('/getUserList',adminController.getUserList)
admin_route.delete('/dashboard/deleteuser/:id',adminController.deleteUser)
admin_route.post('/adduser',upload.single('image'),userMiddleware.existUser,adminController.adduser)
admin_route.get('/edit-user-details/:id',adminController.getEditUserDetails)
admin_route.put('/edit-user/:id',upload.single('image'),adminController.editByAdmin)


module.exports=admin_route;