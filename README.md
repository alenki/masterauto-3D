# Master Auto Front

Interactive web application showcasing auto detailing services with a 3D Mercedes G-Class visualization.

## Features

- **3D Mercedes G-Class Model** - Interactive 3D model with door and roof animations
- **Scroll-based Animation** - Smooth transitions between sections on scroll
- **Interactive Elements** - Control body, details, and glass colors
- **Responsive Design** - Optimized for all devices
- **Modern Stack** - Next.js 15, React Three Fiber, TypeScript

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **3D Graphics**: React Three Fiber, Three.js, @react-three/drei
- **Styling**: Tailwind CSS
- **Animations**: GSAP + ScrollTrigger, Three.js animations
- **3D Models**: GLTF/GLB format

## Quick Start

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── InteractiveCarModel.tsx    # 3D car model
│   ├── InteractiveCarScene.tsx    # 3D scene
│   ├── ColorControls.tsx          # Color controls
│   ├── ScrollCarAnimation.tsx     # Scroll animations
│   └── sections/                  # Site sections
│       ├── exterior/              # Exterior services
│       ├── interior/              # Interior services
│       └── ContactFormSection.tsx # Contact form
└── public/
    └── models/            # 3D models
        └── car.glb
```

## Features

### 3D Animations

- **Doors**: Open/close all 4 doors with correct direction
- **Roof**: Vertical roof lift
- **Camera**: Smooth transitions between sections
- **Colors**: Dynamic body and details color changes

### Site Sections

- **Exterior**: PPF, window tinting, vinyl wrapping, paintless dent repair
- **Interior**: Deep cleaning, polishing, screen protector, plastic trim wrapping
- **Additional Services**: Detailing, vehicle upgrades, restyling
- **Contact**: Contact form with map

## Configuration

### Animations

Animation settings are in `InteractiveCarModel.tsx`:

```typescript
const ANIMATION_CONFIG = {
  doorMaxAngle: 0.8,      // Max door opening angle
  roofMaxHeight: 0.3,     // Max roof lift height
  animationSpeed: 0.1     // Animation speed
};
```

### Camera Positions

Camera positions for different sections are configured in the `cameraPositions` array.

## 3D Model

The project uses a Mercedes G-Class model in GLB format:
- **File**: `public/models/car.glb`
- **Format**: GLTF/GLB
- **Optimization**: Compressed for web use

### Animated Parts

- **Doors**: FL, FR, RL, RR (front left/right, rear left/right)
- **Roof**: G-class_roof
- **Glass**: Separate objects for each door
- **Mirrors**: Linked to corresponding doors

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

The project is compatible with any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- Heroku

## Scripts

- `npm run dev` - Run development server
- `npm run build` - Production build
- `npm run start` - Start production build
- `npm run lint` - Run linter

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project was created to showcase 3D web development capabilities.

## Contact

- **Project**: Master Auto Front
- **Tech**: Next.js + React Three Fiber
- **3D Model**: Mercedes G-Class
