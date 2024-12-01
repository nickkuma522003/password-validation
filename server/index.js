require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require("./models/Employee")
const connectDb = require('./db/connection')

const app = express()
app.use(express.json())
app.use(cors())

connectDb()

app.post('/login', (req, res) => {
    const{email, password} = req.body;
    EmployeeModel.findOne({email : email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }
            else{
                res.json("Password is incorrect")
            }
        }else{
            res.json("No User found")
        }
    })
    .catch(err => res.status(500).json({ error: err.message }));
})

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server is running")
})