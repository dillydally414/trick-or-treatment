const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
require('dotenv')

const db = mysql.createPool({
  host: "lfmerukkeiac5y5w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "p4oftwdn6i4zbfnr",
  password: "agsu9ah1m26wll8b",
  database: "rl00u7zxjg70m26j",
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
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

  const sqlGetDisease = "SELECT * FROM disease WHERE name LIKE ?"
  db.query(sqlGetDisease, [queryField], (err, result) => {
    res.send(result)
  })

})

// Get the name, description, and disease class for a disease specified by id
app.post('/api/getDiseaseInfo', (req, res) => {

  const diseaseId = req.body.params.diseaseId

  const sqlGetDiseaseInfo = "SELECT d.name AS name, d.description AS description, c.name AS disease_class_name FROM disease d JOIN disease_class c USING(disease_class_id) WHERE d.disease_id = ?"
  db.query(sqlGetDiseaseInfo, [diseaseId], (err, result) => {
    res.send(result)
  })

})

// Get a list of known treatment options for a disease specified by id
// TODO: this returns only the known treatments - we should handle and render the reported treatment separately
app.post('/api/getKnownTreatmentOptions', (req, res) => {

  const diseaseId = req.body.params.diseaseId

  const sqlGetKnownTreatmentOptions = "SELECT m.medication_id, m.name FROM disease d JOIN known_treatment t USING(disease_id) JOIN medication m USING(medication_id) WHERE d.disease_id = ?"
  db.query(sqlGetKnownTreatmentOptions, [diseaseId], (err, result) => {
    res.send(result)
  })

})

// Get the records where name matches some variable (search parameter)
app.post('/api/getTreatment', (req, res) => {

  const searchForTreatment = req.body.params.searchForTreatment
  const queryField = '%' + searchForTreatment + '%'

  const sqlGetTreatment = "SELECT * FROM medication WHERE name LIKE ?"
  db.query(sqlGetTreatment, [queryField], (err, result) => {
    res.send(result)
  })

})

// Get the name and method for a medication specified by id
app.post('/api/getMedicationInfo', (req, res) => {

  const medicationId = req.body.params.medicationId

  const sqlGetMedicationInfo = "SELECT m.name AS name, m.method AS method FROM medication m WHERE m.medication_id = ?"
  db.query(sqlGetMedicationInfo, [medicationId], (err, result) => {
    res.send(result)
  })

})

// Get a list of the known side effects for a medication specified by id
// TODO: this returns only the known side effects - we should handle and render the reported side effects separately
app.post('/api/getMedicationKnownSideEffects', (req, res) => {

  const medicationId = req.body.params.medicationId

  const sqlGetMedicationKnownSideEffectsInfo = "SELECT s.name FROM medication m JOIN known_side_effect k USING(medication_id) JOIN side_effect s USING(side_effect_id) WHERE m.medication_id = ?"
  db.query(sqlGetMedicationKnownSideEffectsInfo, [medicationId], (err, result) => {
    res.send(result)
  })

})

// Get a list of the brand names for a medication specified by id
app.post('/api/getMedicationBrandNames', (req, res) => {

  const medicationId = req.body.params.medicationId

  const sqlGetMedicationBrandNames = "SELECT t.name AS name, m.medication_id AS medication_id, t.unit_price AS price FROM medication m JOIN trade_name t USING(medication_id) WHERE m.medication_id = ?"
  db.query(sqlGetMedicationBrandNames, [medicationId], (err, result) => {
    res.send(result)
  })

})

// Get a list of the diseases related to a medication specified by id, based on known treatments
app.post('/api/getMedicationRelevantDiseases', (req, res) => {

  const medicationId = req.body.params.medicationId

  const sqlGetMedicationRelevantDiseases = "SELECT d.name, d.disease_id FROM medication m JOIN known_treatment t USING(medication_id) JOIN disease d USING(disease_id) WHERE m.medication_id = ?"
  db.query(sqlGetMedicationRelevantDiseases, [medicationId], (err, result) => {
    res.send(result)
  })

})

app.listen(process.env.NODE_ENV !== "production" ? 3001 : process.env.VERCEL_URL, () => {
  console.log("running server on port 3001");
})
