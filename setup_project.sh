#!/bin/bash

# Root directory
mkdir -p ecommerce-project && cd ecommerce-project

# Architecture
mkdir architecture
touch architecture/architecture-diagram.drawio
touch architecture/architecture-diagram.png
echo "# Architecture Documentation" > architecture/README.md

# Backend
mkdir -p backend/src/routes
mkdir -p backend/src/models
touch backend/src/app.ts
touch backend/src/routes/products.ts
touch backend/src/models/product.ts
cat <<EOF > backend/package.json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "dist/app.js",
  "scripts": {
    "start": "node dist/app.js",
    "build": "tsc",
    "dev": "ts-node-dev src/app.ts"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.14",
    "typescript": "^4.9.4",
    "ts-node-dev": "^2.0.0"
  }
}
EOF
touch backend/tsconfig.json
cat <<EOF > backend/tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
EOF
touch backend/Dockerfile

# Frontend
mkdir -p frontend/src/components
mkdir -p frontend/src/styles
touch frontend/src/App.tsx
cat <<EOF > frontend/package.json
{
  "name": "frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "autoprefixer": "^10.4.7",
    "postcss": "^8.4.14",
    "tailwindcss": "^3.1.8",
    "typescript": "^4.9.4",
    "vite": "^3.1.8"
  }
}
EOF
touch frontend/tsconfig.json
touch frontend/tailwind.config.js
touch frontend/Dockerfile

# Database
mkdir database
touch database/init.sql
touch database/Dockerfile

# Deployment
mkdir -p deployment/terraform
touch deployment/terraform/main.tf
touch deployment/terraform/variables.tf
touch deployment/terraform/outputs.tf

mkdir -p deployment/kubernetes
touch deployment/kubernetes/namespace.yaml
touch deployment/kubernetes/frontend-deployment.yaml
touch deployment/kubernetes/backend-deployment.yaml
touch deployment/kubernetes/database-deployment.yaml
touch deployment/kubernetes/ingress.yaml

mkdir -p deployment/ansible
touch deployment/ansible/playbook.yml
touch deployment/ansible/inventory.ini

# Monitoring
mkdir -p monitoring/grafana-dashboards
touch monitoring/prometheus-config.yaml
touch monitoring/grafana-dashboards/dashboard.json
echo "# Monitoring Setup Instructions" > monitoring/README.md

# Initialize Git
git init
echo "node_modules/" > .gitignore
echo "# E-commerce Project" > README.md
git add .
git commit -m "Initial project setup with directory structure"

echo "Project setup complete!"
