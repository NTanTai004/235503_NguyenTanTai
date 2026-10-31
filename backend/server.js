
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const deviceRoutes = require("./routes/deviceRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kiểm tra trạng thái Backend
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
    database:
      mongoose.connection.readyState === 1
        ? "Connected"
        : "Disconnected"
  });
});

// API quản lý thiết bị
app.use("/api/devices", deviceRoutes);

// Không tìm thấy đường dẫn
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API không tồn tại"
  });
});

// Xử lý lỗi chung
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Lỗi máy chủ"
  });
});

// Kết nối MongoDB và khởi chạy server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB Atlas connected successfully!");

    console.log("DATABASE:", mongoose.connection.name);

    const total = await mongoose.connection.db
      .collection("devices")
      .countDocuments();

    console.log("SO LUONG THIET BI:", total);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });
