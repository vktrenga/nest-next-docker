# Docker Installation & Running with Docker Compose

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) (included with Docker Desktop).

## Steps

### 1. Build and Start All Services

From the project root, run:

```sh
docker-compose up --build
```

This will:
- Build the backend NestJS service ([backend/Dockerfile](backend/Dockerfile))
- Build the Nginx reverse proxy ([nginx/Dockerfile](nginx/Dockerfile))
- Start SonarQube for code analysis

### 2. Access Services

- **Backend API:** [http://localhost:3000](http://localhost:3000)
- **Nginx Proxy:** [http://localhost](http://localhost) (routes `/api/` to backend)
- **SonarQube:** [http://localhost:9000](http://localhost:9000)

### 3. Stopping Services

Press `Ctrl+C` in the terminal, or run:

```sh
docker-compose down
```

### 4. Rebuilding

If you change Dockerfiles or dependencies, rebuild with:

```sh
docker-compose up --build
```

## Troubleshooting

- Ensure Docker Desktop is running.
- Check port conflicts (3000, 80, 9000).
- For logs, use:

```sh
docker-compose logs
```

## More

See [docker-compose.yml](docker-compose.yml) for