# Frontend - Quan ly thiet bi phong hoc

## Cong nghe
- React
- Vite
- Nginx
- Docker

## Chay bang Docker

Tai image:

```bash
docker pull 235503nguyentantai/235503-frontend:latest
```

Chay container:

```bash
docker run -d --name frontend-container -p 8080:80 235503nguyentantai/235503-frontend:latest
```

Truy cap:
http://localhost:8080

## Docker Hub

https://hub.docker.com/r/235503nguyentantai/235503-frontend

## Backend API

Frontend su dung bien moi truong `VITE_API_URL` de ket noi Backend API.

Khi build Docker, truyen URL Backend bang `--build-arg VITE_API_URL=...`.