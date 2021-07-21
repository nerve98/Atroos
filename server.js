const express = require('express')
var fs = require('fs');
const json_directory = './JsonData/'
const app = express()
const MongoClient = require("mongodb").MongoClient;
const uri ="mongodb://localhost:27017";
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(express.static(__dirname+'/frontend/dist/'))

app.get('/user/:id', function (req, res) {
  var id=req.params.id
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("job");
    //var query = { address: "Park Lane 38" };
    dbo.collection("users").find({user_id: id}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(JSON.stringify(result))
      db.close();
    });
  });
  console.log('risposta inoltrata')
})

/*app.get('/negozio/options/', function (req, res) {
res.send(JSON.stringify(readFile(json_directory+"negozioTest.json")))
console.log('risposta inoltrata')
})*/

app.get('/negozio/articles/', function (req, res) {
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("job");
    //var query = { address: "Park Lane 38" };
    dbo.collection("articlesTest").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(JSON.stringify(result))
      db.close();
    });
  });

  console.log('risposta inoltrata')
})

app.get('/negozio/carrello/:id', function (req, res) {
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("job");
    //var query = { address: "Park Lane 38" };
    dbo.collection("ordersTest").find({"status": "pending", "user_id": req.params.id}).toArray(function(err, result) {
      if (err) throw err;

      /*result.forEach((item,index,array) => {
      array[index]._id=array[index]._id.toString()
    });*/
    console.log(result);
    res.json(JSON.stringify(result))
    db.close();
  });
});

console.log('risposta inoltrata')
})

/*app.get('/carrello/options/', function (req, res) {
res.send(JSON.stringify(readFile(json_directory+"carrelloTest.json")))
console.log('risposta inoltrata')
})*/

app.delete('/negozio/carrello/', jsonParser, function (req, res) {
  console.log(req.body)
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("job");
    var myquery = { _id: ObjectId(req.body.id), user_id: req.body.user_id};
    dbo.collection("ordersTest").deleteOne(myquery, function(err, obj) {
      if (err) {
        console.error(err);
        res.statusCode = 400;
        res.send('Error delete');
      }
      else{
        console.log("1 document deleted");
        res.statusCode = 200;
        res.send('Successful delete');
      }
      db.close();
    });
  });
})

app.get('/checkout/:id', function(req,res){
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("job");
    //var query = { address: "Park Lane 38" };
    dbo.collection("ordersTest").updateMany({"status": "pending", "user_id": req.params.id}, {$set: {"status": "done"} }, function(err, res2) {
      if (err) throw err;
      res.statusCode = 200;
      res.send('Successful checkout');
      db.close();
    });



  })
})

app.post('/ordersTest',jsonParser, function (req, res) {
  console.log(req.body)
  var body=req.body
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("job");



    dbo.collection("ordersTest").insertOne({"user_id":body.user_id,"name": body.name, "qty": body.quantity, "price": body.price, "status":"pending"}, function(err, res2) {
      if (err){
        console.error(err);
        res.statusCode = 400;
        res.send('Error insert');
      }
      else{
        console.log("1 document inserted");
        res.statusCode = 200;
        res.send('Successful insert');
      }
      db.close();
    });
    /*}
    else{
    dbo.collection("ordersTest").updateOne({ status:"pending"},
    { $push: { "articles": {"name": body.name, "qty": body.quantity}}}, function(err, res) {
    if (err){
    console.error(err);
  }
  else{
  console.log("1 document updated");
}

db.close();
});
}*/


});

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
