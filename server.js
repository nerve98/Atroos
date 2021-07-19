const express = require('express')
var fs = require('fs');
const json_directory = './JsonData/'
const app = express()

app.use(express.static('./frontend/dist/'))

app.get('/negozio/options/', function (req, res) {
  res.send(JSON.stringify(readFile(json_directory+"negozio.json")))
  console.log('risposta inoltrata')
})

app.get('/negozio/articles/', function (req, res) {
  res.send(JSON.stringify(readFile(json_directory+"articles.json")))
  console.log('risposta inoltrata')
})

app.get('/carrello/options/', function (req, res) {
  res.send(JSON.stringify(readFile(json_directory+"carrello.json")))
  console.log('risposta inoltrata')
})

function readFile(file){
  try {
    const data = fs.readFileSync(file, 'utf8')
    console.log(data)
    return data
  } catch (err) {
    console.error(err)
  }
}

app.listen(3000,initServer())

function initServer(){
  console.log("Server in ascolto sulla porta 3000")
}
