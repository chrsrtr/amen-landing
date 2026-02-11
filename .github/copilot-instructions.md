# GitHub Copilot Instructions for Amen Intelligence

These instructions outline the coding standards, architecture, and design system for the **Amen Intelligence** landing page. The project focuses on AGI, spatial computing, and high-end 3D visuals.

## 🧠 Core Context

- **Project Type**: High-Performance 3D Landing Page
- **Framework**: React 19 (via Vite)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 logic (via PostCSS) + Custom CSS Layers
- **3D Engine**: Three.js / React Three Fiber (R3F) / Drei
- **Animation**: Framer Motion (DOM) + GSAP/Spring (3D)
- **AI Integration**: Google GenAI SDK (`@google/genai`)
- **Icons**: Lucide React

## 📂 File Structure Pattern

Follow this strict separation of concerns between the **3D World (Canvas)** and the **2D UI (DOM)**:

```text
src/
├── components/
│   ├── canvas/       # R3F components ONLY (Scene.tsx, Model.tsx, Shaders)
│   ├── ui/           # 2D React components (Navbar, HeroOverlay, Buttons)
│   ├── layout/       # Wrappers (Section.tsx, Grid.tsx)
│   └── effects/      # Post-processing or specific animation logic
├── hooks/            # Custom hooks (useScrollProgress, useAIStream)
├── lib/              # Utilities (genAI client, math helpers, constants)
├── assets/           # Static assets (textures, glbf)
├── App.tsx           # Main entry composing <Canvas> and <Overlay>
└── index.css         # Global styles & Tailwind directives
```
