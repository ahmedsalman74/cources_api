const express = require('express')
const app = express();
const path = require('path')
var cors = require('cors')
require('dotenv').config();
const mongoose = require('mongoose');
const coursesRouter = require('./routs/courses.rout');
const usersRouter = require('./routs/users.rout');
const uri=process.env.MONGO_URL;
mongoose.connect(uri).then(()=>{
console.log("DB connection established")

});

app.use(express.json());
app.use(cors())
// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/courses',coursesRouter);
app.use('/api/users',usersRouter);


// glopal middleware for routs error 

app.all("*",(req, res,next)=>{
    return res.status(404).json({status : "Error", message:"this route not found"});
})
//glopal meddileware for error hundeller 
app.use((error,req,res,next)=>{
    res.status(error.statusCode||500).json({status :error.statusText|| "error",message:error.message ,code :error.statusCode , data:null});
}
)




app.listen(process.env.port||5000,(req, res)=>{
    console.log("listening to port ",process.env.port||5000);
});