# ĐỒ ÁN THỰC HÀNH ĐIỆN TOÁN ĐÁM MÂY
## HỆ THỐNG QUẢN LÝ THIẾT BỊ

---

## THÔNG TIN SINH VIÊN

- **Mã số sinh viên:** 235503
- **Họ và tên:** Nguyễn Tấn Tài
- **GitHub:** [NTanTai004](https://github.com/NTanTai004)
- **Repository:** [235503_NguyenTanTai](https://github.com/NTanTai004/235503_NguyenTanTai)

---

# CÂU 1. TẠO REPOSITORY VÀ QUẢN LÝ MÃ NGUỒN BẰNG GITHUB

Tạo repository trên GitHub để quản lý mã nguồn dự án.

**Thông tin repository:**

- Repository name: `235503_NguyenTanTai`
- GitHub username: `NTanTai004`
- Branch chính: `main`
- Repository URL: https://github.com/NTanTai004/235503_NguyenTanTai

**Cấu trúc thư mục dự án:**

```text
235503_NguyenTanTai/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── .gitignore
└── README.md
```

Sử dụng Git để quản lý phiên bản mã nguồn và cập nhật dự án lên GitHub.

Các lệnh Git cơ bản:

```bash
git add .
git commit -m "Mo ta noi dung cap nhat"
git push origin main
git pull origin main
```

File `.gitignore` được sử dụng để loại trừ các thư mục và file không cần thiết như `node_modules`, `.env`, `dist` và các file tạm.

---

# CÂU 2. TẠO CƠ SỞ DỮ LIỆU MONGODB ATLAS

Sử dụng MongoDB Atlas để tạo cơ sở dữ liệu trực tuyến lưu trữ thông tin thiết bị.

**Thông tin MongoDB Atlas:**

- Project: `235503_NguyenTanTai`
- Cluster: `Cluster0`
- Database: `235503_NguyenTanTai`
- Collection: `devices`
- Database User: `s235503_db_user`
- MongoDB version: 8.0.36

**Cấu trúc dữ liệu thiết bị:**

| Trường | Kiểu dữ liệu | Mô tả |
|---|---|---|
| deviceId | String | Mã thiết bị |
| name | String | Tên thiết bị |
| deviceType | String | Loại thiết bị |
| room | String | Phòng sử dụng |
| brand | String | Thương hiệu |
| model | String | Model thiết bị |
| quantity | Number | Số lượng |
| status | String | Trạng thái |
| purchaseDate | Date | Ngày mua |
| description | String | Mô tả |

**Dữ liệu mẫu:**

| Mã thiết bị | Tên thiết bị | Loại thiết bị | Phòng | Trạng thái |
|---|---|---|---|---|
| TB001 | Máy chiếu Epson | Máy chiếu | A101 | Đang sử dụng |
| TB002 | Máy tính Dell | Máy tính | A102 | Đang sử dụng |
| TB003 | Loa Sony | Thiết bị âm thanh | A103 | Đang sửa chữa |

MongoDB Atlas được kết nối với Backend thông qua biến môi trường `MONGODB_URI`.

**Lưu ý bảo mật:** Không đưa mật khẩu hoặc chuỗi kết nối MongoDB thật vào GitHub. Sử dụng file `.env` để lưu thông tin kết nối trong môi trường phát triển và cấu hình Environment Variables trên Render.

---

# CÂU 3. XÂY DỰNG BACKEND REST API VÀ KẾT NỐI MONGODB ATLAS

Sử dụng Node.js, Express.js và Mongoose để xây dựng REST API quản lý thiết bị.

**Các công nghệ sử dụng:**

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS
- dotenv

**Các chức năng chính:**

1. Lấy danh sách thiết bị.
2. Lấy thông tin chi tiết thiết bị theo ID.
3. Thêm thiết bị mới.
4. Cập nhật thông tin thiết bị.
5. Xóa thiết bị.
6. Tìm kiếm thiết bị.
7. Kiểm tra trạng thái hoạt động của Backend.
8. Kiểm tra dữ liệu đầu vào và xử lý lỗi.

**Các API Endpoint:**

| Method | Endpoint | Chức năng |
|---|---|---|
| GET | `/api/devices` | Lấy danh sách thiết bị |
| GET | `/api/devices/:id` | Lấy chi tiết thiết bị |
| POST | `/api/devices` | Thêm thiết bị |
| PUT | `/api/devices/:id` | Cập nhật thiết bị |
| DELETE | `/api/devices/:id` | Xóa thiết bị |
| GET | `/health` | Kiểm tra trạng thái Backend |

**Tìm kiếm thiết bị:**

```http
GET /api/devices?search=Epson
```

Backend sử dụng biến môi trường:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Chạy Backend tại máy local:

```bash
cd backend
npm install
npm start
```

Backend mặc định chạy tại:

```text
http://localhost:5000
```

---

# CÂU 4. XÂY DỰNG GIAO DIỆN FRONTEND BẰNG REACT

Sử dụng React và Vite để xây dựng giao diện quản lý thiết bị.

**Công nghệ sử dụng:**

- React
- Vite
- JavaScript
- CSS
- Fetch API

**Các chức năng giao diện:**

1. Hiển thị danh sách thiết bị từ MongoDB Atlas thông qua Backend API.
2. Xem thông tin chi tiết thiết bị.
3. Thêm thiết bị mới.
4. Chỉnh sửa thông tin thiết bị.
5. Xóa thiết bị.
6. Tìm kiếm thiết bị.
7. Hiển thị trạng thái thiết bị.
8. Hiển thị thông báo khi tải dữ liệu hoặc xảy ra lỗi.

Frontend sử dụng biến môi trường:

```env
VITE_API_URL=http://localhost:5000
```

Khi triển khai thực tế, biến này được thay bằng URL Backend Render.

**Chạy Frontend tại máy local:**

```bash
cd frontend
npm install
npm run dev
```

Frontend mặc định chạy tại:

```text
http://localhost:5173
```

---

# CÂU 5. DOCKER HÓA BACKEND VÀ PUSH LÊN DOCKER HUB

Sử dụng Docker để đóng gói Backend thành Docker Image.

**Docker Image Backend:**

```text
235503nguyentantai/235503-backend:latest
```

Docker Hub:

https://hub.docker.com/r/235503nguyentantai/235503-backend

**Các bước thực hiện:**

Build Docker Image:

```bash
cd backend
docker build -t 235503-backend .
```

Chạy Docker Container:

```bash
docker run -d --name backend-container -p 5001:5000 --env-file .env 235503-backend
```

Đăng nhập Docker Hub:

```bash
docker login
```

Gắn thẻ Image:

```bash
docker tag 235503-backend:latest 235503nguyentantai/235503-backend:latest
```

Push Image:

```bash
docker push 235503nguyentantai/235503-backend:latest
```

Kiểm tra Container:

```bash
docker ps
```

Xem log:

```bash
docker logs backend-container
```

---

# CÂU 6. DOCKER HÓA FRONTEND VÀ PUSH LÊN DOCKER HUB

Sử dụng Docker để đóng gói ứng dụng React thành Docker Image.

Frontend sử dụng Nginx để phục vụ các file giao diện sau khi build.

**Docker Image Frontend:**

```text
235503nguyentantai/235503-frontend:latest
```

Docker Hub:

https://hub.docker.com/r/235503nguyentantai/235503-frontend

**Các bước thực hiện:**

Build Docker Image:

```bash
cd frontend
docker build --build-arg VITE_API_URL=https://api-235503.onrender.com -t 235503-frontend .
```

Chạy Docker Container:

```bash
docker run -d --name frontend-container -p 8080:80 235503-frontend
```

Gắn thẻ Image:

```bash
docker tag 235503-frontend:latest 235503nguyentantai/235503-frontend:latest
```

Push Image lên Docker Hub:

```bash
docker push 235503nguyentantai/235503-frontend:latest
```

Kiểm tra giao diện:

```text
http://localhost:8080
```

---

# CÂU 7. DEPLOY FRONTEND LÊN RENDER

Sử dụng Render để triển khai ứng dụng React dưới dạng Static Site.

**Cấu hình triển khai:**

| Thuộc tính | Giá trị |
|---|---|
| Service Type | Static Site |
| Repository | `NTanTai004/235503_NguyenTanTai` |
| Branch | `main` |
| Root Directory | `frontend` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |

**Environment Variable:**

```env
VITE_API_URL=https://api-235503.onrender.com
```

Sau khi cấu hình, Render tiến hành build và deploy Frontend.

**Frontend Render URL:**

`[CẬP NHẬT URL FRONTEND RENDER TẠI ĐÂY]`

Frontend được kết nối với Backend thông qua API URL đã cấu hình.

---

# CÂU 8. DEPLOY BACKEND LÊN RENDER VÀ KIỂM TRA HỆ THỐNG

Triển khai Backend lên Render để ứng dụng có thể hoạt động trực tuyến và kết nối với MongoDB Atlas.

**Thông tin Backend Render:**

- Service Name: `api-235503`
- Repository: `NTanTai004/235503_NguyenTanTai`
- Branch: `main`
- Root Directory: `backend`
- Backend URL: https://api-235503.onrender.com

**Environment Variables trên Render:**

| Tên biến | Giá trị |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `PORT` | `10000` |

**Kiểm tra Backend:**

Health Check:

https://api-235503.onrender.com/health

Kết quả kiểm tra:

```json
{
  "success": true,
  "message": "Backend is running",
  "database": "Connected"
}
```

Kiểm tra danh sách thiết bị:

https://api-235503.onrender.com/api/devices

**Kiểm tra Frontend và Backend:**

- Frontend truy cập được từ trình duyệt.
- Frontend kết nối được với Backend Render.
- Backend kết nối thành công với MongoDB Atlas.
- Danh sách thiết bị được hiển thị.
- Chức năng tìm kiếm hoạt động.
- Chức năng thêm thiết bị hoạt động.
- Chức năng cập nhật thiết bị hoạt động.
- Chức năng xóa thiết bị hoạt động.

---

# TỔNG KẾT DỰ ÁN

Dự án đã thực hiện các nội dung từ Câu 1 đến Câu 8 của bài thực hành Điện toán đám mây.

| Câu | Nội dung | Trạng thái |
|---|---|---|
| 1 | Tạo GitHub Repository | Hoàn thành |
| 2 | Tạo MongoDB Atlas | Hoàn thành |
| 3 | Xây dựng Backend REST API | Hoàn thành |
| 4 | Xây dựng Frontend React | Hoàn thành |
| 5 | Docker hóa Backend | Hoàn thành |
| 6 | Docker hóa Frontend | Hoàn thành |
| 7 | Deploy Frontend Render | Hoàn thành |
| 8 | Deploy Backend Render | Hoàn thành |

## CÁC ĐƯỜNG DẪN NỘP BÀI

**1. GitHub Repository**

https://github.com/NTanTai004/235503_NguyenTanTai

**2. Docker Hub Backend**

https://hub.docker.com/r/235503nguyentantai/235503-backend

**3. Docker Hub Frontend**

https://hub.docker.com/r/235503nguyentantai/235503-frontend

**4. Render Backend**

https://api-235503.onrender.com

**5. Backend Health Check**

https://api-235503.onrender.com/health

**6. Render Frontend**

`[CẬP NHẬT URL FRONTEND RENDER TẠI ĐÂY]`

---

**Sinh viên thực hiện: Nguyễn Tấn Tài**

**MSSV: 235503**