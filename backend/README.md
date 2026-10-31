# Backend - Quan ly thiet bi phong hoc

## Cong nghe
- Node.js
- Express.js
- MongoDB Atlas
- Docker

## Chay bang Docker

Tai Docker image:

```bash
docker pull 235503nguyentantai/235503-backend:latest
```

Chay container:

```bash
docker run -d --name backend-container -p 5000:5000 --env-file .env 235503nguyentantai/235503-backend:latest
```

## Bien moi truong

Tao file `.env` va cau hinh:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Khong chia se file `.env` chua thong tin ket noi that.

## API
- GET `/api/devices`
- GET `/api/devices/:id`
- POST `/api/devices`
- PUT `/api/devices/:id`
- DELETE `/api/devices/:id`
- GET `/health`

## Docker Hub

https://hub.docker.com/r/235503nguyentantai/235503-backend