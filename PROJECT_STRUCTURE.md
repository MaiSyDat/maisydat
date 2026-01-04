# 📁 Cấu trúc dự án

## Tổng quan
Dự án Portfolio 3D được tổ chức theo cấu trúc Next.js 16 App Router chuẩn.

## Cấu trúc thư mục

```
msd-portfolio/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── AbstractBackground.tsx
│   ├── ClientCanvas.tsx
│   ├── ContactScene.tsx
│   ├── CustomCursor.tsx
│   ├── Experience.tsx
│   ├── IdentityJourney.tsx
│   ├── ListView.tsx
│   ├── PortfolioCard.tsx
│   ├── ResumeView.tsx
│   └── UIOverlay.tsx
├── lib/                   # Utilities & helpers
│   └── data.ts           # Portfolio data
├── store/                 # State management
│   └── useStore.ts       # Zustand store
├── types/                 # TypeScript types
│   ├── react-three-fiber.d.ts
│   └── types.ts
├── .eslintrc.json        # ESLint configuration
├── .gitignore            # Git ignore rules
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## Công nghệ sử dụng

- **Next.js 16.1.1** - Framework với Turbopack
- **React 19.2.3** - UI Library
- **TypeScript 5.7.2** - Type safety
- **Three.js 0.171.0** - 3D Graphics
- **React Three Fiber 8.18.0** - React renderer for Three.js
- **React Three Drei 9.122.0** - Helpers for R3F
- **Framer Motion 12.5.0** - Animations
- **GSAP 3.12.5** - Advanced animations
- **Zustand 5.0.2** - State management
- **Tailwind CSS 3.4.17** - Styling

## Best Practices

✅ **Code Organization**
- Components được tổ chức theo chức năng
- Types được tách riêng
- Utilities trong thư mục lib

✅ **Performance**
- Dynamic imports cho Three.js components
- Code splitting với lazy loading
- Optimize package imports

✅ **Type Safety**
- TypeScript strict mode
- Type definitions cho Three.js
- Proper type annotations

✅ **Configuration**
- ESLint setup
- Next.js 16 optimized config
- Turbopack support

