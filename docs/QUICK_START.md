# ⚡ Quick Start Guide

## 🚀 Start Working in 3 Steps

### 1. Install Dependencies (First Time Only)
```bash
npm install
```

### 2. Start the App
```bash
npm run start
```
This will:
- ✅ Kill any existing process on port 5173
- ✅ Start the development server
- ✅ Open at http://localhost:5173

### 3. Start Coding! 🎉

---

## 📝 Common Commands

### Development
```bash
# Start dev server (recommended)
npm run start

# Or use standard Vite command
npm run dev
```

### Port Management
```bash
# Kill process on default port (5173)
npm run kill-port

# Kill process on custom port
./scripts/kill-port.sh 3000
```

### Build & Preview
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🛠️ Troubleshooting

### Port Already in Use
```bash
npm run kill-port
# Then
npm run dev
```

### Dependencies Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf dist
npm run build
```

---

## 📂 Project Structure

```
src/
├── components/     # UI components
│   ├── common/     # Reusable (Button, Input, etc.)
│   └── layout/     # Layout (Navbar, Footer)
├── pages/          # Page components
├── utils/          # Helper functions
└── App.tsx         # Main app component
```

---

## 🎨 Key Files to Edit

- **Landing Page**: `src/pages/Home.tsx`
- **Navbar**: `src/components/layout/Navbar.tsx`
- **Footer**: `src/components/layout/Footer.tsx`
- **Styles**: `src/index.css`
- **Constants**: `src/utils/constants.ts`
- **Colors**: `tailwind.config.js`

---

## 🌐 URLs

- **Dev Server**: http://localhost:5173
- **API (when ready)**: http://localhost:3000/api/v1

---

## 💡 Pro Tips

1. **Hot Reload**: Changes auto-refresh in browser
2. **TypeScript**: Use types for better autocomplete
3. **Tailwind**: Use utility classes for styling
4. **Components**: Keep them small and reusable
5. **Images**: Update `src/utils/constants.ts` for custom images

---

## 🆘 Need Help?

- **Documentation**: See `README.md`
- **Scripts Guide**: See `scripts/README.md`
- **Assets Guide**: See `ASSETS_GUIDE.md`
- **Project Status**: See `PROJECT_STATUS.md`

---

**Happy Coding! 🚀**
