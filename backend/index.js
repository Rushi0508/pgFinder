const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);


//DB CONNECT
const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/pgFinderDB';
mongoose.connect(dbURL).then(()=>{
    console.log("Mongo Connected");
}).catch((err)=>{
    console.log(err);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
})