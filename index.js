require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router");
//connect database
connectDB();
//Initialise middleware
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

//Serve Static Assets
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// Hosting upload files
app.use("/upload", express.static("upload"));

// Define controller
app.use("/api/", router);

app.use((error, req, res, next) => {
  res.status(500).send({ error: error });
});

app.use((req, res, next) => {
  res.status(404).send({ error: "Not Found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
