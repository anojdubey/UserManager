const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const multer = require("multer");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const { urlencoded } = require("express");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(express.json());
app.use(urlencoded());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

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
  pic: Buffer,
});

const User = new mongoose.model("user", userSchema);

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});
app.post("/users", upload.single("pic"), async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    pic: req.file.buffer,
  });

  await user.save();
  res.status(201).json({ message: "User created successfully" });
});
app.put("/users/:id", upload.single("pic"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    
    if (req.file) {
      user.pic = req.file.buffer;
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
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
