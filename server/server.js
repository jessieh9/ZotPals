require("dotenv").config();

const express = require("express");
const { MongoError } = require("mongodb");
const app = express();
const mongoose = require("mongoose");
const { reset } = require("nodemon");
const itemListing = require("./models/itemListing_model");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const itemListingRouter = require("./routes/itemListing");
app.use("/itemListing", itemListingRouter);

app.get("/explore", async function (req, res) {
  const items = await itemListing.find({});
  res.send(items);
});

app.post("/post", async function (req, res) {
  const currentDate = new Date();

  const newItem = new itemListing({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    contact: req.body.contact,
    duration: req.body.duration,
    date: currentDate.getDate().toString(),
  });

  await newItem.save();
  res.status(200).send(newItem);
});

// app.get("/product/:productId", async function (req, res) {});

app.get("/home", async function (req, res) {
  // get the top three
  const items = await itemListing.find({})
  let first, second, third;
  for (let i = 0; i < items.length; i++) {
    if (i == items.length - 3) { first = items[i]; }
    if (i == items.length - 2) { second = items[i]; }
    if (i == items.length - 1) {
      third = items[i];
    }
  }

  let top_three = [first, second, third];
  res.send(top_three);

});

app.listen(3001, function () {
  console.log("Server Started");
});
