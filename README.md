# 🎨 ThemeX

> **Create stunning iOS home screen themes with an intuitive visual editor**

ThemeX is a powerful web-based design tool that lets you create, customize, and preview iOS home screen themes in real-time. Design beautiful app icons, photo widgets, and device widgets with a drag-and-drop interface that makes theme creation effortless.

---

## ✨ Features

### 🎯 Visual Canvas Editor
- **iPad Preview** - Real-time preview of your theme on an iPad-style canvas
- **Drag & Drop** - Intuitive drag-and-drop interface for icon placement
- **Live Editing** - See changes instantly as you design
- **Background Support** - Upload custom wallpapers for your theme

### 🖼️ Icon Types
- **App Icons** - Classic iOS-style app icons with customizable shapes and colors
- **Photo Widgets** - Display your favorite photos in beautiful widget frames
- **Device Widgets** - Show connected devices with battery indicators

### 🎨 Powerful Customization
- **Color Picker** - Full spectrum color selection with live preview
- **Filters & Effects** - Adjust brightness, contrast, saturation, blur, and hue
- **Shape Controls** - Customize border radius for perfect rounded corners
- **Shadow Effects** - Add depth with customizable shadows
- **Transparency** - Fine-tune opacity for layered designs

### 📚 Icon Library
- **Centralized Storage** - All your created icons in one organized library
- **Quick Access** - Instantly drag icons from library to canvas
- **Favorites** - Mark frequently used icons as favorites
- **Presets** - Start with professional design templates

### 🛍️ Theme Marketplace
- **Browse Themes** - Explore themes from the community
- **Category Filters** - Find themes by style (Minimal, Gradient, Glass, Dark, Nature)
- **Search** - Quickly find the perfect theme
- **Featured Section** - Discover trending and popular themes

### 💾 Automatic Saving
- **LocalStorage** - All your work is automatically saved
- **Backend Ready** - MongoDB integration prepared for cloud sync
- **Session Persistence** - Pick up exactly where you left off

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YRO24/ThemeX.git
   cd ThemeX
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5174
   ```

---

## 📖 Usage Guide

### Creating Your First Theme

1. **Start with the Library Tab**
   - Click on the "Library" tab in the right sidebar
   - Click "+ Create New Icon" to begin

2. **Choose Your Icon Style**
   - Select from App Icon, Photo Widget, or Device Widget
   - Or start with a preset template

3. **Customize Your Icon**
   - Upload images or choose colors
   - Adjust filters, shadows, and effects
   - Preview changes in real-time

4. **Place on Canvas**
   - Drag your icon from the library
   - Drop it anywhere on the iPad canvas
   - Reposition anytime by dragging

5. **Fine-tune Your Theme**
   - Add background images
   - Toggle icon names on/off
   - Adjust individual icon positions

### Keyboard Shortcuts
- **Undo** - Ctrl/Cmd + Z (coming soon)
- **Delete** - Right-click icon → Delete
- **Power Toggle** - Top bar power button

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI with hooks
- **React Router DOM** - Navigation and routing
- **Vite** - Lightning-fast build tool
- **CSS3** - Custom styling with gradients and animations

### Backend (Ready)
- **Node.js** - Server runtime
- **Express** - Web framework
- **MongoDB** - Database for cloud sync
- **Mongoose** - ODM for MongoDB

### Tools
- **ESLint** - Code quality
- **Axios** - HTTP client
- **LocalStorage** - Client-side persistence

---

## 📁 Project Structure

```
ThemeX/
├── src/
│   ├── assets/
│   │   └── Pages/
│   │       ├── Canvas/          # Main editor workspace
│   │       │   ├── MainPage.jsx      # Root component
│   │       │   ├── Ipad.jsx          # Canvas preview
│   │       │   ├── EditBar.jsx       # Right sidebar
│   │       │   ├── TopBar.jsx        # Header controls
│   │       │   ├── MenuThing.jsx     # Navigation menu
│   │       │   ├── IconEditor/       # Icon creation tools
│   │       │   └── IconLibrary/      # Icon management
│   │       └── Shop/            # Theme marketplace
│   │           ├── ShopPage.jsx
│   │           ├── SideBar.jsx
│   │           └── TopBar.jsx
│   ├── App.jsx              # App entry point
│   └── main.jsx            # React DOM root
├── backend/
│   ├── server.js           # Express server
│   ├── models/             # MongoDB schemas
│   └── routes/             # API endpoints
└── public/                 # Static assets
```

---

## 🎯 Roadmap

### Coming Soon
- [ ] **Undo/Redo** - Full history management
- [ ] **Export Themes** - Download as images or config files
- [ ] **Cloud Sync** - Save themes to your account
- [ ] **Collaboration** - Share and remix themes
- [ ] **Icon Packs** - Import professional icon sets
- [ ] **Animation** - Animated widgets and transitions
- [ ] **Dark Mode** - Editor theme options
- [ ] **Keyboard Shortcuts** - Power user features

### Future Enhancements
- Android theme support
- Widget marketplace
- Community features
- Theme templates
- Batch operations
- Version control

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**YRO24**
- GitHub: [@YRO24](https://github.com/YRO24)

---

## 🙏 Acknowledgments

- Inspired by iOS home screen customization
- Built with modern React best practices
- Icons and emojis for visual enhancement
- Community feedback and suggestions

---

## 📮 Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🔄 Sharing with others

---

<div align="center">

**Made with ❤️ by YRO24**

[Report Bug](https://github.com/YRO24/ThemeX/issues) · [Request Feature](https://github.com/YRO24/ThemeX/issues)

</div>