
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

const emptyDevice = {
  deviceId: "",
  name: "",
  deviceType: "",
  room: "",
  brand: "",
  model: "",
  quantity: 1,
  status: "Đang sử dụng",
  purchaseDate: new Date().toISOString().slice(0, 10),
  description: "",
};

function App() {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [form, setForm] = useState(emptyDevice);
  const [saving, setSaving] = useState(false);

  async function loadDevices(keyword = search) {
    try {
      setLoading(true);
      setError("");

      const url = `${API_URL}/api/devices?search=${encodeURIComponent(keyword)}`;
      const response = await fetch(url);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Không thể tải danh sách thiết bị");
      }

      setDevices(result.data || []);
    } catch (err) {
      setError(err.message || "Không thể kết nối Backend");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDevices("");
  }, []);

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyDevice);
    setShowForm(true);
    setSelectedDevice(null);
  }

  function openEditForm(device) {
    setEditingId(device._id);
    setForm({
      ...emptyDevice,
      ...device,
      purchaseDate: device.purchaseDate
        ? new Date(device.purchaseDate).toISOString().slice(0, 10)
        : "",
    });
    setShowForm(true);
    setSelectedDevice(null);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const url = editingId
        ? `${API_URL}/api/devices/${editingId}`
        : `${API_URL}/api/devices`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Không thể lưu thiết bị");
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyDevice);
      await loadDevices("");
    } catch (err) {
      setError(err.message || "Có lỗi khi lưu thiết bị");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(device) {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa thiết bị ${device.deviceId} - ${device.name}?`
    );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(`${API_URL}/api/devices/${device._id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Không thể xóa thiết bị");
      }

      if (selectedDevice?._id === device._id) {
        setSelectedDevice(null);
      }

      await loadDevices();
    } catch (err) {
      setError(err.message || "Có lỗi khi xóa thiết bị");
    }
  }

  function getStatusClass(status) {
    if (status === "Đang sử dụng") return "status-active";
    if (status === "Đang sửa chữa") return "status-repair";
    if (status === "Hư hỏng") return "status-broken";
    return "status-inactive";
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">🏫</div>
          <div>
            <h1>QUẢN LÝ THIẾT BỊ</h1>
            <p>HỆ THỐNG QUẢN LÝ THIẾT BỊ PHÒNG HỌC</p>
          </div>
        </div>
        <span className="connection">● Hệ thống quản lý</span>
      </header>

      <main className="container">
        <section className="welcome">
          <div>
            <p className="eyebrow">TRANG QUẢN TRỊ</p>
            <h2>Danh sách thiết bị</h2>
            <p className="subtitle">
              Theo dõi và quản lý trang thiết bị trong nhà trường.
            </p>
          </div>
          <button className="primary-btn" onClick={openCreateForm}>
            + Thêm thiết bị
          </button>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Tổng thiết bị</span>
            <strong>{devices.length}</strong>
          </div>
          <div className="stat-card">
            <span>Đang sử dụng</span>
            <strong>
              {devices.filter((d) => d.status === "Đang sử dụng").length}
            </strong>
          </div>
          <div className="stat-card">
            <span>Đang sửa chữa</span>
            <strong>
              {devices.filter((d) => d.status === "Đang sửa chữa").length}
            </strong>
          </div>
          <div className="stat-card">
            <span>Hư hỏng</span>
            <strong>
              {devices.filter((d) => d.status === "Hư hỏng").length}
            </strong>
          </div>
        </section>

        {error && <div className="error-box">⚠ {error}</div>}

        <section className="panel">
          <div className="toolbar">
            <div>
              <h3>Danh sách thiết bị</h3>
              <p>Thông tin các thiết bị đã được lưu trong hệ thống</p>
            </div>
            <form
              className="search-form"
              onSubmit={(event) => {
                event.preventDefault();
                loadDevices(search);
              }}
            >
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Tìm mã, tên, loại, phòng..."
              />
              <button type="submit">Tìm kiếm</button>
              <button
                type="button"
                className="reset-btn"
                onClick={() => {
                  setSearch("");
                  loadDevices("");
                }}
              >
                Xóa lọc
              </button>
            </form>
          </div>

          {loading ? (
            <div className="empty-state">Đang tải dữ liệu...</div>
          ) : devices.length === 0 ? (
            <div className="empty-state">
              Không tìm thấy thiết bị nào.
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Mã thiết bị</th>
                    <th>Tên thiết bị</th>
                    <th>Loại thiết bị</th>
                    <th>Phòng học</th>
                    <th>Số lượng</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device) => (
                    <tr key={device._id}>
                      <td className="device-code">{device.deviceId}</td>
                      <td className="device-name">{device.name}</td>
                      <td>{device.deviceType}</td>
                      <td>{device.room}</td>
                      <td>{device.quantity}</td>
                      <td>
                        <span className={`status ${getStatusClass(device.status)}`}>
                          {device.status}
                        </span>
                      </td>
                      <td>
                        <div className="actions">
                          <button
                            className="view-btn"
                            onClick={() => setSelectedDevice(device)}
                          >
                            Xem
                          </button>
                          <button
                            className="edit-btn"
                            onClick={() => openEditForm(device)}
                          >
                            Sửa
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(device)}
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="table-footer">
            Hiển thị {devices.length} thiết bị
          </div>
        </section>
      </main>

      {showForm && (
        <div className="modal-backdrop">
          <section className="modal">
            <div className="modal-heading">
              <div>
                <h3>{editingId ? "Cập nhật thiết bị" : "Thêm thiết bị mới"}</h3>
                <p>Nhập đầy đủ thông tin thiết bị bên dưới.</p>
              </div>
              <button className="close-btn" onClick={() => setShowForm(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  Mã thiết bị *
                  <input
                    name="deviceId"
                    value={form.deviceId}
                    onChange={handleChange}
                    required
                    disabled={Boolean(editingId)}
                  />
                </label>
                <label>
                  Tên thiết bị *
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Loại thiết bị *
                  <input
                    name="deviceType"
                    value={form.deviceType}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Phòng học *
                  <input
                    name="room"
                    value={form.room}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Thương hiệu
                  <input name="brand" value={form.brand} onChange={handleChange} />
                </label>
                <label>
                  Model
                  <input name="model" value={form.model} onChange={handleChange} />
                </label>
                <label>
                  Số lượng *
                  <input
                    type="number"
                    min="0"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Ngày mua
                  <input
                    type="date"
                    name="purchaseDate"
                    value={form.purchaseDate}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Trạng thái *
                  <select name="status" value={form.status} onChange={handleChange}>
                    <option>Đang sử dụng</option>
                    <option>Hư hỏng</option>
                    <option>Đang sửa chữa</option>
                    <option>Ngừng sử dụng</option>
                  </select>
                </label>
                <label className="full-width">
                  Mô tả
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="3"
                  />
                </label>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Hủy
                </button>
                <button type="submit" className="primary-btn" disabled={saving}>
                  {saving ? "Đang lưu..." : editingId ? "Lưu thay đổi" : "Thêm thiết bị"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {selectedDevice && (
        <div className="modal-backdrop" onClick={() => setSelectedDevice(null)}>
          <section className="modal detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-heading">
              <div>
                <h3>Chi tiết thiết bị</h3>
                <p>Thông tin đầy đủ của thiết bị.</p>
              </div>
              <button className="close-btn" onClick={() => setSelectedDevice(null)}>
                ×
              </button>
            </div>
            <div className="detail-grid">
              {[
                ["Mã thiết bị", selectedDevice.deviceId],
                ["Tên thiết bị", selectedDevice.name],
                ["Loại thiết bị", selectedDevice.deviceType],
                ["Phòng học", selectedDevice.room],
                ["Thương hiệu", selectedDevice.brand],
                ["Model", selectedDevice.model],
                ["Số lượng", selectedDevice.quantity],
                ["Trạng thái", selectedDevice.status],
                [
                  "Ngày mua",
                  selectedDevice.purchaseDate
                    ? new Date(selectedDevice.purchaseDate).toLocaleDateString("vi-VN")
                    : "Chưa cập nhật",
                ],
                ["Mô tả", selectedDevice.description || "Không có mô tả"],
              ].map(([label, value]) => (
                <div className="detail-item" key={label}>
                  <span>{label}</span>
                  <strong>{value ?? "Chưa cập nhật"}</strong>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setSelectedDevice(null)}>
                Đóng
              </button>
              <button
                className="primary-btn"
                onClick={() => openEditForm(selectedDevice)}
              >
                Sửa thiết bị
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
