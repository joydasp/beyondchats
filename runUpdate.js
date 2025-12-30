require("dotenv").config();
const mongoose = require("mongoose");
const updateArticles = require("./src/scripts/updateArticles");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await updateArticles();
  console.log("All articles updated");
  process.exit();
});
