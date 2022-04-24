const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: "lfmerukkeiac5y5w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "p4oftwdn6i4zbfnr",
    password: "agsu9ah1m26wll8b",
    database: "rl00u7zxjg70m26j",
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())

// Get all records from disease table
app.get('/', (req, res) => {

    const sqlGetDiseases = "SELECT * FROM disease"
    db.query(sqlGetDiseases, (err, result) => {
        res.send(result)
    })

})

// Get the records where name or description matches some variable (search parameter)
app.post('/api/getDisease', (req, res) => {

    const searchForDisease = req.body.params.searchForDisease
    const queryField = '%' + searchForDisease + '%'

    const sqlGetDisease = "SELECT * FROM disease WHERE name LIKE ? OR description LIKE ?"
    db.query(sqlGetDisease, [queryField, queryField], (err, result) => {
        res.send(result)
        console.log(err)
    })

})

app.listen(3001, () => {
    console.log("running server on port 3001");
})
