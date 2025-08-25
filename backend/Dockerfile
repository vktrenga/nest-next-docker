# ---------- Stage 1: Build App ----------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- Stage 2: Run Tests and Coverage ----------
FROM node:18-alpine AS tester

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run test -- --coverage

# ---------- Stage 3: SonarScanner ----------
FROM node:18 AS sonar

# Install Java & required tools
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk wget unzip && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy code and coverage data from tester stage
COPY --from=tester /app /app

# Install SonarScanner
RUN wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip && \
    unzip sonar-scanner-cli-5.0.1.3006-linux.zip && \
    mv sonar-scanner-5.0.1.3006-linux /opt/sonar-scanner && \
    rm sonar-scanner-cli-5.0.1.3006-linux.zip

# Set SonarScanner environment
ENV SONAR_SCANNER_HOME=/opt/sonar-scanner
ENV PATH="${SONAR_SCANNER_HOME}/bin:${PATH}"

CMD ["sonar-scanner"]

# Note: sonar-project.properties must be included in your project root
