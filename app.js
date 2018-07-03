//define consts that we need in order to run this app
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");




// MongoDB setup code 
const MongoClient = require("mongodb").MongoClient;
const DB_URI = "mongodb://localhost:27017/kontratat"; //mongodb URL 
const router = express.Router();
const fs = require("fs");
const bodyParser = require("body-parser");
const ObjectID = require("mongodb").ObjectID;

MongoClient.connect(DB_URI, (err, db) =>  {
	if(err) {
		console.log("Error connecting to db:" + err);
		return;
	}
	kontratatekomunes = db.collection("kontratatekomunes");
	console.log("Connected to:" + DB_URI);
})



app.use(express.static(path.join(__dirname, "/public"))); 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));


app.post('/kontrat/add', (req,res,next)=>{
  kontratatekomunes.insert({title: req.body.title, 
  	description: req.body.description, 
  	aktiviteti: req.body.aktiviteti, 
  	dataInicimit: req.body.dataInicimit,
  	publikimiShpalljes: req.body.publikimiShpalljes, 
   	dataNenshkrimit: req.body.dataNenshkrimit, 
   	afatetPerImplementim: req.body.afatetPerImplementim,
	afatetPerImplementim1: req.body.afatetPerImplementim1, 
	dataPermbylljes: req.body.dataPermbylljes, 
	cmimiKontrates: req.body.cmimiKontrates,
	cmimiTotalipaguar: req.body.cmimiTotalipaguar, 
	emriiKontratDhenesit: req.body.emriiKontratDhenesit}, 
  	(err,document)=>{
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/');
  })
})





app.get('/',function(req,res){
  kontratatekomunes.find({}).toArray(function(err,docs){
    if (err) {
      console.log(err);
    }
    res.render('index',{docs:docs});
  });
});





app.get("/kontrat/:id", function(req, res) {
	console.log(req.params.id);
	kontratatekomunes.findOne({_id: ObjectID(req.params.id)}, function(err, doc)
	{
		if(err) {
			console.log(err);
		}
		res.render("show", {doc: doc});
	})
});



app.get("/kontrat/edit/:id", function(req, res) {
	kontratatekomunes.findOne({_id: ObjectID(req.params.id)}, function(err, doc)
	{
		if (err) {
			console.log(err);
		}
		res.render("edit", {doc: doc});
	});
});



app.post("/kontrat/update/:id", function(req, res) {
	kontratatekomunes.updateOne({_id: ObjectID(req.params.id)},
		{$set: {title: req.body.title, 
			description: req.body.description, 
			aktiviteti: req.body.aktiviteti, 
			dataInicimit: req.body.dataInicimit,
		   	publikimiShpalljes: req.body.publikimiShpalljes, 
		   	dataNenshkrimit: req.body.dataNenshkrimit, 
		   	afatetPerImplementim: req.body.afatetPerImplementim,
			afatetPerImplementim1: req.body.afatetPerImplementim1, 
			dataPermbylljes: req.body.dataPermbylljes, 
			cmimiKontrates: req.body.cmimiKontrates,
			cmimiTotalipaguar: req.body.cmimiTotalipaguar, 
			emriiKontratDhenesit: req.body.emriiKontratDhenesit}}, function(err, doc) {
		if(err) {
			console.log(err);
		}
		res.redirect("/");
	});
});



app.get("/kontrat/delete/:id", function(req, res) {
	kontratatekomunes.remove({_id: ObjectID(req.params.id)},
		function(err, doc) {
		if(err) {
			console.log(err);
		}
		res.redirect("/");
	});
});


app.listen(3000, 'localhost', (err)=>{
  if (err) {
    console.log('Something is wrong '+ err);
    return;
  }
  console.log("Server is running at port 3000 ");
})



