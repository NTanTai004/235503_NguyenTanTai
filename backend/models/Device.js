
const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: [true, "Mã thiết bị không được để trống"],
      unique: true,
      trim: true
    },

    name: {
      type: String,
      required: [true, "Tên thiết bị không được để trống"],
      trim: true
    },

    deviceType: {
      type: String,
      required: [true, "Loại thiết bị không được để trống"],
      trim: true
    },

    room: {
      type: String,
      required: [true, "Phòng học không được để trống"],
      trim: true
    },

    brand: {
      type: String,
      trim: true,
      default: ""
    },

    model: {
      type: String,
      trim: true,
      default: ""
    },

    quantity: {
      type: Number,
      required: true,
      min: [0, "Số lượng không được âm"]
    },

    status: {
      type: String,
      required: true,
      enum: [
        "Đang sử dụng",
        "Hư hỏng",
        "Đang sửa chữa",
        "Ngừng sử dụng"
      ],
      default: "Đang sử dụng"
    },

    purchaseDate: {
      type: Date,
      default: Date.now
    },

    description: {
      type: String,
      default: "",
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Device", deviceSchema, "devices");
