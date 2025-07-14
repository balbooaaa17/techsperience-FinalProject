// app.js
const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

const DB_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "kontratat";

app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function start() {
  try {
    // Connect to MongoDB
    const client = new MongoClient(DB_URI, { useUnifiedTopology: true });
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(DB_NAME);
    const kontratatekomunes = db.collection("kontratatekomunes");

    // Routes

    app.post("/kontrat/add", async (req, res) => {
      try {
        await kontratatekomunes.insertOne({
          title: req.body.title,
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
          emriiKontratDhenesit: req.body.emriiKontratDhenesit,
        });
        res.redirect("/");
      } catch (err) {
        console.error(err);
        res.status(500).send("Error adding contract");
      }
    });

    app.get("/", async (req, res) => {
      try {
        const docs = await kontratatekomunes.find({}).toArray();
        res.render("index", { docs });
      } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching contracts");
      }
    });

    app.get("/kontrat/kontra", async (req, res) => {
      try {
        const docs = await kontratatekomunes.find({}).toArray();
        res.render("kontratat", { docs });
      } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching contracts");
      }
    });

    app.get("/kontrat/:id", async (req, res) => {
      try {
        const doc = await kontratatekomunes.findOne({ _id: new ObjectId(req.params.id) });
        if (!doc) return res.status(404).send("Contract not found");
        res.render("show", { doc });
      } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching contract");
      }
    });

    app.get("/kontrat/edit/:id", async (req, res) => {
      try {
        const doc = await kontratatekomunes.findOne({ _id: new ObjectId(req.params.id) });
        if (!doc) return res.status(404).send("Contract not found");
        res.render("edit", { doc });
      } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching contract");
      }
    });

    app.post("/kontrat/update/:id", async (req, res) => {
      try {
        await kontratatekomunes.updateOne(
          { _id: new ObjectId(req.params.id) },
          {
            $set: {
              title: req.body.title,
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
              emriiKontratDhenesit: req.body.emriiKontratDhenesit,
            },
          }
        );
        res.redirect("/");
      } catch (err) {
        console.error(err);
        res.status(500).send("Error updating contract");
      }
    });

    app.get("/kontrat/delete/:id", async (req, res) => {
      try {
        await kontratatekomunes.deleteOne({ _id: new ObjectId(req.params.id) });
        res.redirect("/");
      } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting contract");
      }
    });

    // Start server
    app.listen(8080, () => {
      console.log("Server is running on port 3000");
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

start();
