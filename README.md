# Stacking Card Animation Demo

A modern, scroll-driven stacking card animation built with Next.js, inspired by the services section from [serious.business](https://serious.business/). Features smooth card transitions, micro-interactions, and a responsive design.

## ✨ Features

- **Scroll-driven Animation**: Cards stack and transition based on scroll position
- **Smooth Transitions**: Fluid animations with CSS transforms and transitions
- **Micro-interactions**: Floating elements, hover effects, and subtle animations
- **Responsive Design**: Works seamlessly across different screen sizes
- **TypeScript Support**: Fully typed for better development experience
- **Modern UI**: Clean, professional design with gradient backgrounds

## 🚀 Demo

The animation features four service cards that stack on top of each other as you scroll:
- **Brand Strategy** (Pink gradient)
- **Visual Identity** (Purple gradient) 
- **Website** (Yellow gradient)
- **Product** (Black gradient)

Each card includes:
- Service descriptions
- Feature lists
- Call-to-action buttons
- Animated floating elements
- Smooth stacking transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: CSS Transitions & Transforms
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stacking_demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How It Works

### Animation Logic

The stacking animation works through several key states:

1. **Upcoming**: Cards start below the viewport
2. **Sliding In**: Cards animate into view with smooth transitions
3. **Active**: Cards are fully visible and interactive
4. **Getting Pushed**: Cards begin to stack as new ones appear
5. **Stuck**: Cards show only their headers at the top

### Scroll Calculation

```typescript
const scrollY = window.scrollY;
const cardStart = windowHeight * 0.8 * index;
const progress = Math.max(0, Math.min(1, (scrollY - cardStart) / (windowHeight * 0.8)));
```

### State Management

Cards transition through different visual states based on scroll progress:
- Transform positions for stacking effect
- Opacity changes for smooth transitions
- Z-index management for proper layering
- Backdrop blur effects for stuck cards

## 📁 Project Structure

```
stacking_demo/
├── app/
│   ├── page.tsx          # Main component with stacking animation
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   └── favicon.ico
├── public/               # Static assets
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── next.config.ts       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md           # This file
```

## 🎨 Customization

### Adding New Cards

Modify the `servicesData` array in `app/page.tsx`:

```typescript
const servicesData = [
  {
    title: "Your Service",
    description: "Service description",
    bgColor: "from-blue-400 to-blue-600",
    features: ["Feature 1", "Feature 2"],
    // ... other properties
  },
  // ... existing services
];
```

### Styling

- **Colors**: Update gradient colors in the `bgColor` property
- **Animations**: Modify transition durations and easing in the component
- **Layout**: Adjust card heights and spacing in Tailwind classes

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the animation on [serious.business](https://serious.business/)
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ and lots of scroll events
