require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { checkForAuthentication } = require("./middleware/authentication");

const Blog = require("./models/blog");

const app = express();
const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));

app.use(checkForAuthentication("token"));

app.get("/", async (req, res) => {
  const allblogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allblogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
