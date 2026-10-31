
const express = require("express");
const router = express.Router();
const Device = require("../models/Device");

// GET /api/devices - Lấy danh sách và tìm kiếm thiết bị
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};

    if (search && search.trim() !== "") {
      const keyword = search.trim();
      filter = {
        $or: [
          { deviceId: { $regex: keyword, $options: "i" } },
          { name: { $regex: keyword, $options: "i" } },
          { deviceType: { $regex: keyword, $options: "i" } },
          { room: { $regex: keyword, $options: "i" } }
        ]
      };
    }

    const devices = await Device.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: devices.length,
      data: devices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi lấy danh sách thiết bị",
      error: error.message
    });
  }
});

// GET /api/devices/:id - Xem chi tiết thiết bị
router.get("/:id", async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thiết bị"
      });
    }

    res.status(200).json({
      success: true,
      data: device
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ID thiết bị không hợp lệ"
    });
  }
});

// POST /api/devices - Thêm thiết bị
router.post("/", async (req, res) => {
  try {
    const device = new Device(req.body);
    const savedDevice = await device.save();

    res.status(201).json({
      success: true,
      message: "Thêm thiết bị thành công",
      data: savedDevice
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Mã thiết bị đã tồn tại"
      });
    }

    res.status(400).json({
      success: false,
      message: "Dữ liệu thiết bị không hợp lệ",
      error: error.message
    });
  }
});

// PUT /api/devices/:id - Cập nhật thiết bị
router.put("/:id", async (req, res) => {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedDevice) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thiết bị"
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật thiết bị thành công",
      data: updatedDevice
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Mã thiết bị đã tồn tại"
      });
    }

    res.status(400).json({
      success: false,
      message: "Dữ liệu cập nhật không hợp lệ",
      error: error.message
    });
  }
});

// DELETE /api/devices/:id - Xóa thiết bị
router.delete("/:id", async (req, res) => {
  try {
    const deletedDevice = await Device.findByIdAndDelete(req.params.id);

    if (!deletedDevice) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thiết bị"
      });
    }

    res.status(200).json({
      success: true,
      message: "Xóa thiết bị thành công"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ID thiết bị không hợp lệ"
    });
  }
});

module.exports = router;
