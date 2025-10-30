#!/bin/bash

# Script to start the Raphexpress Cargo frontend application
# This script will:
# 1. Kill any existing process on port 5173
# 2. Start the development server

echo "🚀 Starting Raphexpress Cargo Frontend..."
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$( cd "$SCRIPT_DIR/.." && pwd )"

# Change to project directory
cd "$PROJECT_DIR"

# Kill any existing process on port 5173
echo "🔍 Checking for existing processes on port 5173..."
PID=$(lsof -ti:5173)

if [ ! -z "$PID" ]; then
    echo "⚠️  Found existing process $PID on port 5173"
    echo "🔪 Killing process..."
    kill -9 $PID
    sleep 1
    echo "✅ Process killed"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 node_modules not found. Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
fi

# Clear terminal
clear

# Start the development server
echo "🚀 Starting development server..."
echo "📍 Project: Raphexpress Cargo Frontend"
echo "🌐 URL: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop the server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Run the dev server
npm run dev
