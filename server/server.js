import express from 'express'
import {config} from 'dotenv'
import DBConfig from './db/db.config.js'

config()
const app = express()
const port = process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.status(200)
    .json({
        message : "Welcome to Tutor App"
    })
})

app.listen(port,()=>{
    console.log("server running Successfully on PORT" ,port)
    DBConfig()
    
})