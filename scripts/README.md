# 🛠️ Utility Scripts

This folder contains helpful scripts for managing the Raphexpress Cargo frontend application.

## 📜 Available Scripts

### 1. **kill-port.sh** - Kill Process on Port

Kills any process running on a specific port.

**Usage:**
```bash
# Kill process on default port (5173)
./scripts/kill-port.sh

# Kill process on custom port
./scripts/kill-port.sh 3000
```

**What it does:**
- ✅ Finds process ID using the specified port
- ✅ Kills the process
- ✅ Verifies the port is free
- ✅ Provides clear feedback

**Example:**
```bash
./scripts/kill-port.sh 5173

# Output:
# 🔍 Checking for processes on port 5173...
# ⚠️  Found process 12345 running on port 5173
# 🔪 Killing process...
# ✅ Successfully killed process on port 5173
# ✅ Port 5173 is now free
```

---

### 2. **start-app.sh** - Start Development Server

Starts the Raphexpress Cargo frontend development server with automatic cleanup.

**Usage:**
```bash
./scripts/start-app.sh
```

**What it does:**
- ✅ Checks for existing processes on port 5173
- ✅ Kills any existing processes automatically
- ✅ Checks if dependencies are installed
- ✅ Installs dependencies if needed
- ✅ Starts the Vite dev server
- ✅ Opens at http://localhost:5173

**Example:**
```bash
./scripts/start-app.sh

# Output:
# 🚀 Starting Raphexpress Cargo Frontend...
# 🔍 Checking for existing processes on port 5173...
# ✅ Process killed
# 🚀 Starting development server...
# 📍 Project: Raphexpress Cargo Frontend
# 🌐 URL: http://localhost:5173
```

---

## 🚀 Quick Start

### First Time Setup
```bash
# Make scripts executable (already done)
chmod +x scripts/*.sh

# Start the app
./scripts/start-app.sh
```

### Daily Usage
```bash
# Just run this to start working
./scripts/start-app.sh
```

### Troubleshooting
```bash
# If port is stuck, kill it manually
./scripts/kill-port.sh 5173

# Then start the app
npm run dev
```

---

## 📝 Notes

- **Port 5173**: Default Vite development server port
- **Automatic Cleanup**: `start-app.sh` handles port conflicts automatically
- **Cross-Platform**: These scripts work on macOS and Linux
- **Windows Users**: Use Git Bash or WSL to run these scripts

---

## 🔧 Customization

### Change Default Port

Edit `vite.config.ts`:
```typescript
server: {
  port: 3000, // Change to your preferred port
  open: true,
}
```

Then update the scripts to use the new port:
```bash
./scripts/kill-port.sh 3000
```

---

## 🆘 Common Issues

### "Permission Denied"
```bash
chmod +x scripts/*.sh
```

### "Command Not Found: lsof"
Install lsof:
```bash
# macOS (should be pre-installed)
brew install lsof

# Linux
sudo apt-get install lsof
```

### Port Still in Use
```bash
# Force kill all node processes
pkill -9 node

# Or kill specific port
sudo lsof -ti:5173 | xargs kill -9
```

---

## 💡 Pro Tips

1. **Add to package.json** for easier access:
   ```json
   {
     "scripts": {
       "start": "./scripts/start-app.sh",
       "kill": "./scripts/kill-port.sh"
     }
   }
   ```

2. **Create alias** in your shell:
   ```bash
   # Add to ~/.zshrc or ~/.bashrc
   alias raph-start="cd /path/to/raphexpress-frontend && ./scripts/start-app.sh"
   alias raph-kill="cd /path/to/raphexpress-frontend && ./scripts/kill-port.sh"
   ```

3. **Use with tmux/screen** for persistent sessions

---

**Happy Coding! 🚀**
