const express = require("express");
const mongoose = require("mongoose");

const app = express();

// مهم
app.use(express.json());
app.use(express.static(".")); // يعرض index.html

// الاتصال بـ MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// نموذج المستخدم
const User = mongoose.model("User", {
  username: String,
  password: String
});

// تسجيل حساب
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existing = await User.findOne({ username });
  if (existing) {
    return res.send("المستخدم موجود");
  }

  await User.create({ username, password });
  res.send("تم التسجيل");
});

// تسجيل دخول
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user) {
    return res.send("بيانات غلط");
  }

  res.send("تم تسجيل الدخول");
});

// تشغيل السيرفر (مهم لـ Render)
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
