// src/components/InteractiveCarScene.tsx
"use client";
import ScrollCarAnimation from "./ScrollCarAnimation";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Grid } from "@react-three/drei";
import { useState } from "react";
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
import PowerSection from "./sections/PowerSection";
import PremiumSection from "./sections/PremiumSection";
import OurWorksSection from "./sections/OurWorksSection";
import ContactFormSection from "./sections/ContactFormSection";

export default function InteractiveCarScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bodyColor, setBodyColor] = useState("#ff0000");
  const [detailsColor, setDetailsColor] = useState("#ffffff");
  const [glassColor, setGlassColor] = useState("#ffffff");
  const [wheelSpeed, setWheelSpeed] = useState(1.0);
  const [showDebugger, setShowDebugger] = useState(false);

  return (
    <div className="w-full">
      {/* Фиксированная 3D сцена */}
      <div className="fixed inset-0 z-0 w-full h-full">
        <ScrollCarAnimation onScrollProgress={setScrollProgress}>
          <Canvas
            style={{ width: "100%", height: "100%" }}
            camera={{ position: [-8, 4, -8], fov: 20 }}
            dpr={[1, 2]} // High DPI rendering on Retina displays
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.2,
            }}
          >
            {/* Set background color */}
            <color attach="background" args={["#fff"]} />

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
        </ScrollCarAnimation>
      </div>

      {/* Контент для скролла */}
      <div className="relative z-10">
        {/* Экстерьер секции */}
        <ExteriorHeroSection />
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

        {/* Общие секции */}
        <PowerSection />
        <PremiumSection />
        <OurWorksSection />
        <ContactFormSection />
      </div>

      {/* Панель управления */}
      <ColorControls
        bodyColor={bodyColor}
        detailsColor={detailsColor}
        glassColor={glassColor}
        wheelSpeed={wheelSpeed}
        onBodyColorChange={setBodyColor}
        onDetailsColorChange={setDetailsColor}
        onGlassColorChange={setGlassColor}
        onWheelSpeedChange={setWheelSpeed}
      />
    </div>
  );
}
