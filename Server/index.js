const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api", require("./routes/api.js"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}/`);
});
