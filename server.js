const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.static(".")); // يعرض index.html

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const User = mongoose.model("User", {
  username: String,
  password: String
});

app.post("/register", async (req, res) => {
  await User.create(req.body);
  res.send("تم حفظ المستخدم");
});

app.listen(3000, () => {
  console.log("Server running");
});
