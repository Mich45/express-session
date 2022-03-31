import express from "express";
import session from "express-session";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import User from "./models/userModel.js";
import Account from "./models/accountModel.js";
import bcrypt from "bcryptjs";

const __dirname = path.resolve();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "superSecretKey",
    resave: false,
    saveUninitialized: false,
    httpOnly: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/express-session",
      collectionName: "sessions",
    }),
  })
);

mongoose.connect("mongodb://localhost:27017/express-session", (err) => {
  console.log("Database connected successfully");
  if (err) {
    console.log(err);
  }
});

app.use(express.static(__dirname + "/public"));

//Middleware to check if cookie exists
const isAuthenticated = (req, res, next) => {
  if (req.session.user_id) {
    next();
  } else {
    res.redirect("/login");
  }
};

app.get("/", async (req, res) => {
  console.log(req.session);
  let users = await User.find({});

  res.format({
    "application/json": () => {
      res.json({ users });
    },

    "text/html": () => {
      res.sendFile(__dirname + "/public/assets/views/index.html");
    },
  });
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/assets/views/login.html");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.redirect("/login");
  }

  //Check if password matches
  const checkPasswordMatch = await bcrypt.compare(password, user.password);
  if (!checkPasswordMatch) {
    return res.redirect("/login");
  }
  // Set a session to the user id
  req.session.user_id = user._id;
  res.json({
    name: user.name,
    username: user.username,
    email: user.email,
    id: user._id,
    message: "Login successful!",
  });
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/public/assets/views/signup.html");
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { name, username, email, password } = req.body;

  // Check if user already exists.
  let user = await User.findOne({ email });

  if (user) {
    res.send("User already exists");
  }

  // Hash password

  const hashedPassword = await bcrypt.hash(password, 10);

  // Else create new user
  user = new User({
    name,
    username,
    email,
    password: hashedPassword
  });

  try {
    await user.save();
    res.status(200).json({
      user,
      message: `User: ${user.username} created successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred, please try again",
    });
  }
});

app.get("/dashboard", isAuthenticated, (req, res) => {
  console.log("User ID is: " + req.session.user_id);
  res.sendFile(__dirname + "/public/assets/views/dashboard.html");
});

app.get("/:username", async (req, res) => {
  const username = req.params.username;

  // Database find by username
  let user = await User.findOne({ username: username });

  res.format({
    "application/json": () => {
      res.json({ user });
    },

    "text/html": () => {
      res.sendFile(__dirname + "/public/assets/views/user.html");
    },
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/login");
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
