const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/react-usermanagementsystem')
require('dotenv').config();
const path=require('path')
const express=require('express')
const app=express()
const cors=require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// console.log(path.join(__dirname, 'public', 'images'))

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

//for user routes
const userRoutes=require('./routes/userRoutes')
app.use('/',userRoutes)

// for admin routes
const admin_route=require('./routes/adminRoutes')
app.use('/admin',admin_route)


app.listen(4040,()=>{
    console.log('server is running on the port 4040');
    
})