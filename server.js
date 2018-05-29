var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");

//var restful = require('node-restful');
//var methodOverride = require('method-override')

var ObjectID = mongodb.ObjectID;

//////////////////////////////////////////
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = process.env.MONGODB_URI || "mongodb://localhost:27017/fit";
mongoose.connect(mongoDB)
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;



//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
///////////////////////////////////////////////////

var CONTACTS_COLLECTION = "contacts";

var app = express();
var fileUpload = require('express-fileupload');

app.use(bodyParser.json());
app.use(fileUpload());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({type:'application/vnd.api+json'}));
//app.use(methodOverride());

 

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
console.log("distDir", distDir);
var imagenes = __dirname + "/subidas/";
app.use(express.static(distDir));
app.use("/subidas", express.static(imagenes));

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port OK", port);
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}
app.get("/", function(req, res) {
  res.status(200).json("Soy una raiz");
});

///////////////////////////////////////////////
/////////////////////////////////////////////////////*
/*
var Category = app.resource = restful.model('category', mongoose.Schema({
  cat_name: String,
  cat_quantity: Number
}))
.methods(['get', 'post', 'put', 'delete']);
Category.register(app, '/cate');*/


//********************************************* */
//********************************************* */
//********************************************* */
//CARGA INICIAL DEL USER fit fit
var Usuario = require('./models/Usuario.js');
var query = {username: "fit", password: "fit"};    
Usuario.findOne(query, function(err, user){
  if (err) return next(err);
  if(user==null)
    Usuario.create({username: "fit", password: "fit", peso: 45.5, altura: 35.4});
});

/* LOGIN*/
app.post('/login', function(req, res, next) {
    var query = {'username':req.body.username, 'password':req.body.password};    
    var user = Usuario.findOne(query, function(err, user){
      if (err) return next(err);
      res.json(user);
    });
    
});

var products = require('./routes/products.js');
app.use('/prod', products);

var fotos = require('./routes/fotos.js');
app.use('/fotos', fotos);

var usuarios = require('./routes/usuarios.js');
app.use('/user', usuarios);

//********************************************* */
//********************************************* */
//********************************************* */
app.get("/fitlandia/fiok", function(req, res) {
  res.status(200).json("baila que ritmo te sobra");
});
app.post('/imageup', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.' + req.files + "_");
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});


app.get("/fitlandia/hola", function(req, res) {
  res.status(200).json("Fideos con salsa");

});
app.get("/fitlandia/chau", function(req, res) {
  res.status(200).json("ddfd");

});

app.get("/fiok", function(req, res) {
  res.status(200).json("baila que ritmo te sobra");

});

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/contacts", function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});





app.post("/api/contacts", function(req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/contacts/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
