#!/bin/bash

# Script to kill processes running on specific ports
# Usage: ./kill-port.sh [port_number]
# Example: ./kill-port.sh 5173

PORT=${1:-5173}  # Default to port 5173 if no argument provided

echo "🔍 Checking for processes on port $PORT..."

# Find process ID using the port
PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
    echo "✅ No process found running on port $PORT"
    exit 0
fi

echo "⚠️  Found process $PID running on port $PORT"
echo "🔪 Killing process..."

# Kill the process
kill -9 $PID

if [ $? -eq 0 ]; then
    echo "✅ Successfully killed process on port $PORT"
else
    echo "❌ Failed to kill process on port $PORT"
    exit 1
fi

# Verify the port is free
sleep 1
NEW_PID=$(lsof -ti:$PORT)

if [ -z "$NEW_PID" ]; then
    echo "✅ Port $PORT is now free"
else
    echo "⚠️  Warning: Port $PORT still appears to be in use"
fi
