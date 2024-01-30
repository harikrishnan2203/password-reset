const express = require("express")
const bodyparser = require("body-parser")
const cors = require('cors')
const { connectToDB } = require("./Database/db")
const AppRouter = require('./Router/router')
require('dotenv').config();

const app = express()
app.use(bodyparser.json())

const PORT = 5000;

// ENABLE CORS
app.use(cors());

//Iniating DB Connection
connectToDB()

// Use the defined router for all routes
app.use('/', AppRouter)

app.listen(process.env.PORT,"0.0.0.0", () => {
    console.log(`Server started at http://localhost:${PORT}`)
})

