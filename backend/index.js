const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const { urlencoded } = require("express");

app.use(express.json());
app.use(urlencoded());

app.use(cors());

dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.DatabaseLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const User = new mongoose.model("user", userSchema);

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ message: "User created successfully" });
});
app.put("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.phone = req.body.phone;
  await user.save();
  res.status(200).json({ message: "User updated successfully" });
});
app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ user });
});
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "User deleted successfully" });
});
app.listen(process.env.PORT || 5000, () => {
  console.log("===== Server is running =====");
});
