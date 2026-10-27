import express from "express";
import bodyParser from "body-parser";
import bandname from "bandname";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const date = new Date();
const year = date.getFullYear() + "";

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { thisYear: year });
});

app.post("/submit", (req, res) => {
  let name = bandname();
  res.render("index.ejs", { bandName: name, thisYear: year });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
