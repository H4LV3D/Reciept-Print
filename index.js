const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(
  cors({
    methods: ["GET", "POST"],
    origin: [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "https://cabifyapp.up.railway.app/",
    ],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// Use body-parser middleware to parse request bodies
app.use(express.json());
app.use(bodyParser.json());

const database = {
  user1: {
    username: "gift",
    password: "my_new_password",
  },
  user2: {
    username: "gifted",
    password: "your_new_password",
  },
};

// Define a route for logging in
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password are valid
  if (username === "admin" && password === "password") {
    // Hash the password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(hashedPassword);

    // Compare the hashed password to the original password
    if (bcrypt.compareSync(password, hashedPassword)) {
      // The password is correct
      res.send("Logged in successfully");
    } else {
      // The password is incorrect
      res.status(401).send("Incorrect password");
    }
  } else {
    // The username is invalid
    res.status(401).send("Invalid username");
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
