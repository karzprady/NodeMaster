const express = require('express')
const ConnectToDB = require('./database/db')
const router = require("./routes/auth-routes")
const homerouter = require("./routes/home-routes")
const AdminRoutes = require('./routes/admin-routes')
const cors = require('cors')
const imagerouter = require('./routes/image-routes')

const app = express()

//database
ConnectToDB()

//middleware

app.use(cors({
  origin: 'http://localhost:3000',  // Allow React frontend
  credentials: true,  // Allow cookies to be sent
}));


app.use(express.json())

app.use("/api/auth",router)
app.use("/api/home",homerouter)
app.use("/api/admin",AdminRoutes)
app.use("/api/asset", imagerouter)

//start

PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("Server is Running");
    
})