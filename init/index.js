const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://prabhatkumar:YM6RYWKZCytGxpAL@cluster0.vpalz12.mongodb.net/?retryWrites=true&w=majority";

// const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "653c0ef187da8ec8cffbf9da",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
