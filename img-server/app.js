
import express from 'express'
import multer from 'multer'
import path from 'path'
import cors from 'cors'
import mongoose from 'mongoose';
import UserModel from './model/Users.js';

const app = express();
app.use(cors())
app.use(express.json())

const PORT = 3000;

app.use(express.static("public"))

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/Images") },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }})
const upload=multer({ storage:storage})


app.post("/uploads",upload.single('file'),(req,res)=>{
    const {user}=req.body
        UserModel.create({image:req.file.filename,name:user})
        .then(result=>{res.json(result)})
        .catch(err=>console.log("err"))
})

app.get("/getImg",(req,res)=>{
    UserModel.find({})
    .then(users=>res.status(200).json(users))
    .catch(err=> res.json(err))
})
mongoose.connect("mongodb://localhost:27017/employee")
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });  
})
 
