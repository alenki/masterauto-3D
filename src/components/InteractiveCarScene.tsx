"use client";
import ScrollCarAnimation from "./ScrollCarAnimation";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Grid } from "@react-three/drei";
import { useState, useEffect, Suspense  } from "react";
import InteractiveCarModel from "./InteractiveCarModel";
import ColorControls from "./ColorControls";
import * as THREE from "three";
// Экстерьер секции
import ExteriorHeroSection from "./sections/exterior/ExteriorHeroSection";
import VinylWrappingSection from "./sections/exterior/VinylWrappingSection";
import TintingSection from "./sections/exterior/TintingSection";
import DentRemovalSection from "./sections/exterior/DentRemovalSection";
import PPFSection from "./sections/exterior/PPFSection";
import RunningBoardsSection from "./sections/exterior/RunningBoardsSection";

// Интерьер секции
import InteriorHeroSection from "./sections/interior/InteriorHeroSection";
import ChemicalCleaningSection from "./sections/interior/ChemicalCleaningSection";
import PolishingSection from "./sections/interior/PolishingSection";
import PlasticWrappingSection from "./sections/interior/PlasticWrappingSection";
import ProtectiveGlassSection from "./sections/interior/ProtectiveGlassSection";

// Общие секции
import TopSection from "./sections/TopSection";
import ExtraServices from "./sections/ExtraServices";
import CafeSection from "./sections/CafeSection";
import ContactFormSection from "./sections/ContactFormSection";
import FooterHeading from "./sections/FooterHeading";

function ResponsiveCamera({ fov }: { fov: number }) {
  const { camera } = useThree();

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = fov;
    cam.updateProjectionMatrix();
  }, [fov, camera]);

  return null;
}

export default function InteractiveCarScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bodyColor, setBodyColor] = useState("#ff0000");
  const [detailsColor, setDetailsColor] = useState("#ffffff");
  const [glassColor, setGlassColor] = useState("#ffffff");
  const [wheelSpeed, setWheelSpeed] = useState(1.0);
  const [showDebugger, setShowDebugger] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  // Disable scroll when loading
  useEffect(() => {
    if (modelLoaded) return; // nothing to do if already loaded

    // Save current styles / scroll position
    const doc = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = doc.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlTouchAction = doc.style.touchAction;
    const scrollY = window.scrollY || window.pageYOffset;

    // Lock scroll: set fixed position to avoid jump, and hide overflow
    // We set top to negative scrollY so page doesn't visually jump to top.
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    doc.style.overflow = "hidden";
    body.style.overflow = "hidden";
    doc.style.touchAction = "none"; // prevent touch scrolling on mobile

    // cleanup: restore everything
    return () => {
      doc.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      doc.style.touchAction = prevHtmlTouchAction;
      body.style.position = "";
      body.style.top = "";

      // restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, [modelLoaded]);

  const [fov, setFov] = useState(20);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateFov = () => {
      const width = window.innerWidth;
      if (width < 250) setFov(97);
      else if (width < 300) setFov(90);
      else if (width < 350) setFov(85);
      else if (width < 350) setFov(79);
      else if (width < 400) setFov(73);
      else if (width < 500) setFov(65);
      else if (width < 550) setFov(55);
      else if (width < 600) setFov(50);
      else if (width < 700) setFov(45);
      else if (width < 800) setFov(39);
      else if (width < 900) setFov(35);
      else if (width < 1000) setFov(31);
      else if (width < 1100) setFov(29);
      else if (width < 1200) setFov(27);
      else if (width < 1300) setFov(25);
      else if (width < 1400) setFov(23);
      else setFov(20);
    };

    updateFov();
    window.addEventListener("resize", updateFov);
    return () => window.removeEventListener("resize", updateFov);
  }, []);
  return (
    
    <div className="w-full">
      <div className="fixed w-full h-full z-15">
        
      </div>
      {/* Фиксированная 3D сцена */}
      <div className="fixed inset-0 z-10 w-full h-full">
        <ScrollCarAnimation onScrollProgress={setScrollProgress}>
      <div className="relative h-full w-full">
      {/* Local loading overlay */}
      {!modelLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
          <div className="loader">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
          </div>
        </div>
      )}
        <Suspense fallback={null}>
          <Canvas
            style={{ width: "100%", height: "100%" }}
            camera={{ position: [-8, 4, -8], fov}}
            dpr={[1, 2]} // High DPI rendering on Retina displays
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.2,
            }}
          >
            {/* Responsive Camera */}
            <ResponsiveCamera fov={fov} />
            {/* Освещение */}
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.2}
              castShadow
            />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />

            {/* Окружение */}
            <Environment preset="sunset" />

            {/* Радиальный градиентный фон */}
            {/* <mesh position={[0, 0, -15]} rotation={[0, 0, 0]}>
              <planeGeometry args={[100, 100]} />
              <meshBasicMaterial
                color="#1a1a2e"
                side={2}
                transparent={true}
                opacity={0.8}
              />
            </mesh> */}
            {/* <mesh
              position={[0, 0, 10]}
              rotation={[0, Math.PI, 0]}
              renderOrder={-1}
            >
              <planeGeometry args={[100, 100]} />
              <meshBasicMaterial
                color="#1a1a2e"
                side={THREE.DoubleSide}
                transparent
                opacity={0.8}
              />
            </mesh> */}

            {/* Дополнительный радиальный градиент */}
            {/* <mesh position={[0, 0, -14]} rotation={[0, 0, 0]}>
              <planeGeometry args={[80, 80]} />
              <meshBasicMaterial
                color="#16213e"
                side={2}
                transparent={true}
                opacity={0.6}
              />
            </mesh> */}

            {/* Центральный световой эффект */}
            {/* <mesh position={[0, 0, -13]} rotation={[0, 0, 0]}>
              <planeGeometry args={[60, 60]} />
              <meshBasicMaterial
                color="#0f3460"
                side={2}
                transparent={true}
                opacity={0.4}
              />
            </mesh> */}

            <group position={[0, -1, 0]}>
              <InteractiveCarModel
                bodyColor={bodyColor}
                detailsColor={detailsColor}
                glassColor={glassColor}
                wheelSpeed={wheelSpeed}
                scrollProgress={scrollProgress}
                onLoaded={() => setModelLoaded(true)} 
              />
            </group>

            {/* Управление камерой */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
              minDistance={3}
              maxDistance={25}
              maxPolarAngle={Math.PI / 2}
              target={[0, 0.5, 0]}
            />
          </Canvas>
          </Suspense>
        </div>
        </ScrollCarAnimation>
      </div>

      {/* Контент для скролла */}
      <div className="relative z-0">
        {/* Hero */}
        <TopSection />
        <ExteriorHeroSection />
      </div>
      <div className="relative z-10">
        {/* Экстерьер секции */}
        <VinylWrappingSection
          bodyColor={bodyColor}
          onBodyColorChange={setBodyColor}
        />
        <TintingSection
          glassColor={glassColor}
          onGlassColorChange={setGlassColor}
        />
        <DentRemovalSection />
        <PPFSection />
        <RunningBoardsSection />

        {/* Интерьер секции */}
        <InteriorHeroSection />
        <ChemicalCleaningSection />
        <PolishingSection />
        <PlasticWrappingSection />
        <ProtectiveGlassSection />
      </div>
      <div className="relative z-10">
        {/* Общие секции */}
        <ExtraServices />
        <CafeSection />
      </div>
      <div className="relative z-0">
        <FooterHeading />
      </div>
      <div className="relative z-10">
        <ContactFormSection />
      </div>
    </div>
  );
}
