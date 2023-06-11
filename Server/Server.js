const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

app.use(express.json());

const cors = require("cors");
app.use(cors("http://localhost:3000"));

const users = [
  {
    id: 1,
    username: "user@exemple.com",
    password: "user1234",
  },
  {
    id: 2,
    username: "marwamejbri@gmail.com",
    password: "marwa123",
  },
];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ error: "Invalid username" });
  }
  bcrypt.compare(password, user.password, (err, result) => {
    const user = users.find((u) => u.password === password);
    if (!user) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      "your_secret_key"
    );
    return res.json({ token});
  });
});

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is running on port ${PORT}`)
);
