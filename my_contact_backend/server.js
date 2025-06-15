const express = require("express");
const app = express()
require("dotenv").config();
const contactRoute = require("./routes/contactRoute");
const dbConnect = require("../db/dbConfig");
const cors = require('cors');
const errorHandler = require("./middleware/errorHandler");
const userRoute = require("./routes/userRoute");

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 6001

dbConnect();

app.use('/api/contacts', contactRoute)
app.use('/api/user', userRoute)

app.use(errorHandler)

// app.get("/", (req, res)=>{
//     res.json({
//         message: "This is the Home Page"
//     });
// })

// app.get("/users", (req, res)=>{
//     res.json({
//         message: "Get all users"
//     });
// })

// app.get("/users/:id", (req, res)=>{
//     res.json({
//         message: `Get user with ID  ${req.params.id}`
//     });
// })

// app.post("/users", (req, res)=>{
//     res.json({
//         message: "Create new user"
//     });
// })

// app.put("/users/:id", (req, res)=>{
//     res.json({
//         message: `Update user with ID  ${req.params.id}`
//     });
// })

// app.get("/delete/:id", (req, res)=>{
//     res.json({
//         message: `Delete user with ID  ${req.params.id}`
//     });
// })


app.listen(PORT,()=>{
    console.log(`Server is listening to port  ${PORT}`);  
})