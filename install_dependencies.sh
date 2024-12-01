#!/bin/bash

# Backend dependencies
cd ecommerce-project/backend
echo "Installing backend dependencies..."
npm install
echo "Backend dependencies installed!"

# Frontend dependencies
cd ../frontend
echo "Installing frontend dependencies..."
npm install
echo "Frontend dependencies installed!"

# Navigate back to project root
cd ../..

echo "All dependencies installed successfully!"
