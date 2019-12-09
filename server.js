//! Express Setting
const express = require('express')
const app = express()
const port = 3000

//# GET METHOD (All)
app.get('/', function (req, res) {
    res.send('GET request to homepage')
})

//# GET METHOD (One)

//# POST METHOD
app.post('/', function (req, res) {
    res.send('POST request to homepage')
})

//# PUT METHOD
app.put('/', function (req, res) {
    res.send('PUT request to homepage')
})

//# DELETE METHOD
app.delete('/', function (req, res) {
    res.send('DELETE request to homepage')
})

app.listen(port, () => console.log(`App running at port ${port}!`))