// src/components/InteractiveCarModel.tsx
"use client";

import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, FXAA } from "@react-three/postprocessing";

import {
  Group,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  Vector3,
  Euler,
  LinearMipmapLinearFilter,
  LinearFilter,
} from "three";

interface CarModelProps {
  bodyColor: string;
  detailsColor: string;
  glassColor: string;
  wheelSpeed: number;
  scrollProgress?: number; // Adding scroll progress
  onLoaded?: () => void;
}

// Interface for animated car parts
interface AnimatedPart {
  object: Object3D;
  originalPosition: Vector3;
  originalRotation: Euler;
  targetPosition: Vector3;
  targetRotation: Euler;
  isAnimating: boolean;
  animationSpeed: number;
  isOpen: boolean; // Open/closed state
  animationType: "door" | "roof"; // Animation type
  doorIndex?: number; // Door index (0-3: front left, front right, rear left, rear right)
}

export default function InteractiveCarModel({
  bodyColor,
  detailsColor,
  glassColor,
  wheelSpeed,
  scrollProgress = 0,
  onLoaded,
}: CarModelProps) {
  const { scene } = useGLTF("/models/car.glb");
  useEffect(() => {
    if (scene && onLoaded) {
      onLoaded();
    }
  }, [scene, onLoaded]);
  useEffect(() => {
    if (!scene) return;
    scene.traverse((child: Object3D) => {
      if (
        child instanceof Mesh &&
        child.material instanceof MeshStandardMaterial
      ) {
        const material = child.material;
        if (material.map) {
          material.map.anisotropy = 16;
          material.map.minFilter = LinearMipmapLinearFilter;
          material.map.magFilter = LinearFilter;
        }
        material.needsUpdate = true;
      }
    });
  }, [scene]);

  const modelRef = useRef<Group>(null);
  const wheelsRef = useRef<Object3D[]>([]);
  const prevScrollProgress = useRef(scrollProgress);

  // State for animated car parts
  const [animatedParts, setAnimatedParts] = useState<Map<string, AnimatedPart>>(
    new Map()
  );
  const animatedPartsRef = useRef<Map<string, AnimatedPart>>(new Map());

  // States for animation control
  const [doorsState, setDoorsState] = useState<
    [number, number, number, number]
  >([0, 0, 0, 0]); // [FL, FR, RL, RR]
  const [roofState, setRoofState] = useState(0);

  // Animation configuration constants
  const ANIMATION_CONFIG = {
    doorMaxAngle: Math.PI * 0.9, // Max door rotation angle (30 degrees)
    roofMaxHeight: 40.0, // Max roof lift height
    animationSpeed: 0.1, // Animation speed (0.1 = smooth, 1.0 = instant)
  };

  // Animation object configuration (configured for Mercedes G-class)
  const animationConfig = {
    doors: {
      // Front left door (FL)
      frontLeft: [
        "G-class_FL_door_AMG",
        "G-class_FL_door_AMG_black5_0",
        "G-class_FL_door_AMG_bodypaint_0",
        "G-class_FL_door_AMG_brabus_dash_skin_0",
        "G-class_FL_door_AMG_common_black010_0",
        "G-class_FL_door_AMG_door_handles_0",
        "G-class_FL_door_AMG_G-class_black_0",
        "G-class_FL_door_AMG_setlogo01x_0",
        "G-class_FL_door_AMG_screw_017_opac_40a21753_9298_486f_b2d5_8ea3aa86f9d5_0",
        "G-class_FL_doorpanel",
      ],
      // Front right door (FR)
      frontRight: [
        "G-class_FR_door_AMG",
        "G-class_FR_door_AMG_black5_0",
        "G-class_FR_door_AMG_bodypaint_0",
        "G-class_FR_door_AMG_brabus_dash_skin_0",
        "G-class_FR_door_AMG_common_black010_0",
        "G-class_FR_door_AMG_door_handles_0",
        "G-class_FR_door_AMG_G-class_black_0",
        "G-class_FR_door_AMG_setlogo01x_0",
        "G-class_FR_door_AMG_screw_017_opac_40a21753_9298_486f_b2d5_8ea3aa86f9d5_0",
        "G-class_FR_doorpanel",
      ],
      // Rear left door (RL)
      rearLeft: [
        "G-class_RL_door",
        "G-class_RL_door_bodypaint_0",
        "G-class_RL_door_black5_0",
        "G-class_RL_door_common_black010_0",
        "G-class_RL_door_G-class_black_0",
        "G-class_RL_door_door_handles_0",
        "G-class_RL_door_brabus_dash_skin_0",
        "G-class_RL_door_setlogo01x_0",
        "G-class_RL_door_screw_017_opac_40a21753_9298_486f_b2d5_8ea3aa86f9d5_0",
        "G-class_RL_doorpanel",
      ],
      // Rear right door (RR)
      rearRight: [
        "G-class_RR_door",
        "G-class_RR_door_bodypaint_0",
        "G-class_RR_door_black5_0",
        "G-class_RR_door_common_black010_0",
        "G-class_RR_door_G-class_black_0",
        "G-class_RR_door_door_handles_0",
        "G-class_RR_door_brabus_dash_skin_0",
        "G-class_RR_door_setlogo01x_0",
        "G-class_RR_door_screw_017_opac_40a21753_9298_486f_b2d5_8ea3aa86f9d5_0",
        "G-class_RR_doorpanel",
      ],
    },
    roof: {
      // Roof object names in model
      names: [
        "G-class_body_AMG",
        "G-class_body_AMG_bodypaint_0",
        "G-class_body_G-class_black_0",
        "G-class_body_AMG_window_plastic_0",
        "AMG_interior_grill3_0",
        "AMG_interior_G-class_underbody_0",
        "AMG_interior_door_plastic_0",
        "G-class_sunroof_glass",
        "G-class_sunroof_glass_G-class_glass_0",
        "G-class_sunroof_int_glass_IntWindows_0",
        "G-class_quarterglass_L_tint",
        "G-class_quarterglass_R_tint",
        "G-class_windshield",
        "AMG_interior_G-class_mirror_0",
        "AMG_interior_carbon_sesto3_0",
        "AMG_interior_G900_roof_buttons_0",
        "AMG_interior_speakers2_d_0",
        "AMG_interior_seat_plastic_0",
      ],
    },
  };

  // Function to find object by list of possible names
  const findObjectByName = (
    object: Object3D,
    possibleNames: string[]
  ): boolean => {
    const name = object.name.toLowerCase();
    return possibleNames.some((possibleName) =>
      name.includes(possibleName.toLowerCase())
    );
  };

  // Function to determine door index
  const getDoorIndex = (objectName: string): number => {
    const name = objectName.toLowerCase();

    if (
      findObjectByName(
        { name: objectName } as Object3D,
        animationConfig.doors.frontLeft
      )
    )
      return 0;
    if (
      findObjectByName(
        { name: objectName } as Object3D,
        animationConfig.doors.frontRight
      )
    )
      return 1;
    if (
      findObjectByName(
        { name: objectName } as Object3D,
        animationConfig.doors.rearLeft
      )
    )
      return 2;
    if (
      findObjectByName(
        { name: objectName } as Object3D,
        animationConfig.doors.rearRight
      )
    )
      return 3;

    return -1;
  };

  // Animation based on scrollProgress through 5 sections
  useFrame(({ camera }, delta) => {
    if (modelRef.current) {
      // Define camera positions for each section
      const cameraPositions = [
        // Section 0: Exterior Hero
        {
          x: 0,
          y: 0,
          z: -9,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 1.5,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        // EXTERIOR (1-6)
        // Section 1: Exterior Hero - front overview of the car
        {
          x: 0,
          y: 0,
          z: -9,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 0.9,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        // Section 2: Vinyl wrapping - focus on body side
        {
          x: 0,
          y: 0,
          z: -9,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 0.5,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        // Section 3: Tinting - focus on glass
        {
          x: 0,
          y: 2,
          z: -4,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 0.5,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        // Section 4: Dent removal - body details
        {
          x: 0,
          y: 0,
          z: -4,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 0.5,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        // Section 5: Paint protection film - front bumper
        {
          x: 0,
          y: 0,
          z: -9,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 1.0,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        // Section 6: Running boards - bottom side view
        {
          x: 0,
          y: -2,
          z: -3,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 1.5,
          doors: [0, 0, 0, 0],
          roof: 0,
        },

        // INTERIOR (7-11)
        // Section 7: Interior Hero - transition to cabin
        {
          x: 0,
          y: 2,
          z: -5,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 1.5,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        // Section 8: Deep cleaning - cabin with open doors
        {
          x: 0,
          y: 2,
          z: -2,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 1.3,
          doors: [0.7, 0.7, 0.7, 0.7],
          roof: 0.7,
        },
        // Section 9: Polishing - seats
        {
          x: 0,
          y: 2,
          z: -2,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 1.2,
          doors: [0.7, 0.7, 0.7, 0.7],
          roof: 0.8,
        },
        // Section 10: Plastic wrapping - dashboard
        {
          x: 0,
          y: 2,
          z: -2,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 0.5,
          doors: [1, 1, 1, 1],
          roof: 1,
        },
        // Section 11: Screen protector - monitor
        {
          x: 0,
          y: 1,
          z: 0,
          lookAt: [0, 0.3, 0.7],
          rotationY: Math.PI * 0.1,
          doors: [1, 1, 1, 1],
          roof: 1,
        },

        // GENERAL (12-15)
        // Section 12: Power - side view
        {
          x: 0,
          y: 1,
          z: 0,
          lookAt: [0.2, 0.3, 0.7],
          rotationY: Math.PI * 0.1,
          doors: [1, 1, 1, 1],
          roof: 1,
        },
        // Section 13: Premium - top view
        {
          x: 0,
          y: 0,
          z: -9,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 0.4,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        // Section 14: Contact - contact form
        {
          x: 0,
          y: 0,
          z: -10,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 0,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        //Extra
        {
          x: 0,
          y: 0,
          z: -10,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 0,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
      ];

      // Determine current and next section
      const totalSections = 15;
      const sectionIndex = Math.floor(scrollProgress * totalSections);
      const nextSectionIndex = Math.min(sectionIndex + 1, totalSections - 1);
      const sectionProgress = scrollProgress * totalSections - sectionIndex;

      // Interpolation between sections
      const currentPos = cameraPositions[sectionIndex];
      const nextPos = cameraPositions[nextSectionIndex];

      const cameraX =
        currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
      const cameraY =
        currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
      const cameraZ =
        currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;
      const rotationY =
        currentPos.rotationY +
        (nextPos.rotationY - currentPos.rotationY) * sectionProgress;

      // Smooth lookAt interpolation
      const lookAtX =
        currentPos.lookAt[0] +
        (nextPos.lookAt[0] - currentPos.lookAt[0]) * sectionProgress;
      const lookAtY =
        currentPos.lookAt[1] +
        (nextPos.lookAt[1] - currentPos.lookAt[1]) * sectionProgress;
      const lookAtZ =
        currentPos.lookAt[2] +
        (nextPos.lookAt[2] - currentPos.lookAt[2]) * sectionProgress;

      // Apply camera position
      camera.position.set(cameraX, cameraY, cameraZ);
      camera.lookAt(lookAtX, lookAtY, lookAtZ);

      // Apply car rotation
      modelRef.current.rotation.y = rotationY;

      // Car stays centered
      modelRef.current.position.set(0, 0, 0);

      // Apply part animations based on camera configuration
      const currentConfig = cameraPositions[sectionIndex];
      const nextConfig = cameraPositions[nextSectionIndex];

      // Interpolate animation values between sections
      const doorsFL =
        currentConfig.doors[0] +
        (nextConfig.doors[0] - currentConfig.doors[0]) * sectionProgress;
      const doorsFR =
        currentConfig.doors[1] +
        (nextConfig.doors[1] - currentConfig.doors[1]) * sectionProgress;
      const doorsRL =
        currentConfig.doors[2] +
        (nextConfig.doors[2] - currentConfig.doors[2]) * sectionProgress;
      const doorsRR =
        currentConfig.doors[3] +
        (nextConfig.doors[3] - currentConfig.doors[3]) * sectionProgress;
      const roof =
        currentConfig.roof +
        (nextConfig.roof - currentConfig.roof) * sectionProgress;

      // Update animation states
      setDoorsState([doorsFL, doorsFR, doorsRL, doorsRR]);
      setRoofState(roof);
    }

    // Wheel animation based on scrollProgress change
    const scrollDelta = scrollProgress - prevScrollProgress.current;
    prevScrollProgress.current = scrollProgress;

    wheelsRef.current.forEach((wheel) => {
      if (wheel) {
        // Wheels rotate only if scrollProgress changes
        wheel.rotation.x += scrollDelta * wheelSpeed * 50; // Multiplier 50 for visible rotation
      }
    });

    // Car part animation
    animatedPartsRef.current.forEach((part, name) => {
      if (part.animationType === "door" && part.doorIndex !== undefined) {
        // Door animation
        const doorValue = doorsState[part.doorIndex];
        const targetRotation = part.originalRotation.clone();

        // Determine rotation direction for each door
        let rotationDirection = 1; // Default positive direction

        if (part.doorIndex === 0) {
          // FL - front left (opens left)
          rotationDirection = 1;
        } else if (part.doorIndex === 1) {
          // FR - front right (opens right)
          rotationDirection = -1;
        } else if (part.doorIndex === 2) {
          // RL - rear left (opens left)
          rotationDirection = 1;
        } else if (part.doorIndex === 3) {
          // RR - rear right (opens right)
          rotationDirection = -1;
        }

        targetRotation.y +=
          doorValue * ANIMATION_CONFIG.doorMaxAngle * rotationDirection;

        part.object.rotation.x =
          part.originalRotation.x +
          (targetRotation.x - part.originalRotation.x) *
            ANIMATION_CONFIG.animationSpeed;
        part.object.rotation.y =
          part.originalRotation.y +
          (targetRotation.y - part.originalRotation.y) *
            ANIMATION_CONFIG.animationSpeed;
        part.object.rotation.z =
          part.originalRotation.z +
          (targetRotation.z - part.originalRotation.z) *
            ANIMATION_CONFIG.animationSpeed;
      } else if (part.animationType === "roof") {
        // Roof animation - rises straight up
        const targetPosition = part.originalPosition.clone();
        targetPosition.z += roofState * ANIMATION_CONFIG.roofMaxHeight;

        // Smoothly raise only on Z axis
        part.object.position.z =
          part.originalPosition.z +
          (targetPosition.z - part.originalPosition.z) *
            ANIMATION_CONFIG.animationSpeed;
      }
    });
  });

  // TAA
  <EffectComposer multisampling={4}>
    <FXAA />
  </EffectComposer>;

  // Create materials

  // const [bodyMaterial] = useState(
  //   () =>
  //     new MeshPhysicalMaterial({
  //       color: bodyColor,
  //       metalness: 1.0,
  //       roughness: 0.5,
  //       clearcoat: 1.0,
  //       clearcoatRoughness: 0.03,
  //     })
  // );
  const [bodyMaterial] = useState(
    () =>
      new MeshPhysicalMaterial({
        color: bodyColor,
        metalness: 1.0,
        roughness: 0.35,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        envMapIntensity: 1.2,
      })
  );

  const [detailsMaterial] = useState(
    () =>
      new MeshStandardMaterial({
        color: detailsColor,
        metalness: 1.0,
        roughness: 0.5,
      })
  );

  const [glassMaterial] = useState(
    () =>
      new MeshPhysicalMaterial({
        color: glassColor,
        metalness: 0.25,
        roughness: 0,
        transmission: 1.0,
      })
  );

  // Update material colors
  useEffect(() => {
    bodyMaterial.color.set(bodyColor);
  }, [bodyColor, bodyMaterial]);

  useEffect(() => {
    detailsMaterial.color.set(detailsColor);
  }, [detailsColor, detailsMaterial]);

  useEffect(() => {
    glassMaterial.color.set(glassColor);
  }, [glassColor, glassMaterial]);

  // 1. Find wheels and glass elements ONCE on model load
  useEffect(() => {
    if (scene && modelRef.current) {
      wheelsRef.current = [];
      const foundGlassElements: string[] = [];

      const newAnimatedParts = new Map<string, AnimatedPart>();
      const allObjectNames: string[] = [];
      const doorCandidates: string[] = [];
      const roofCandidates: string[] = [];

      scene.traverse((child) => {
        const name = child.name;
        allObjectNames.push(name);

        // Collect candidates for doors and roof
        if (
          name.toLowerCase().includes("door") &&
          !name.toLowerCase().includes("glass")
        ) {
          doorCandidates.push(name);
        }
        if (
          name.toLowerCase().includes("roof") ||
          name.toLowerCase().includes("top")
        ) {
          roofCandidates.push(name);
        }

        // Find doors by configuration
        const doorIndex = getDoorIndex(name);
        if (doorIndex !== -1) {
          const animatedPart: AnimatedPart = {
            object: child,
            originalPosition: child.position.clone(),
            originalRotation: child.rotation.clone(),
            targetPosition: child.position.clone(),
            targetRotation: child.rotation.clone(),
            isAnimating: false,
            animationSpeed: 0.05,
            isOpen: false,
            animationType: "door",
            doorIndex: doorIndex,
          };
          newAnimatedParts.set(name, animatedPart);
        }

        // Find door glass (they should move with the doors)
        if (
          name.includes("doorglass_FL_tint") ||
          name.includes("doorglass_FR_tint") ||
          name.includes("doorglass_RL_tint") ||
          name.includes("doorglass_RR_tint")
        ) {
          let glassDoorIndex = -1;
          if (name.includes("FL")) glassDoorIndex = 0;
          else if (name.includes("FR")) glassDoorIndex = 1;
          else if (name.includes("RL")) glassDoorIndex = 2;
          else if (name.includes("RR")) glassDoorIndex = 3;

          if (glassDoorIndex !== -1) {
            const animatedPart: AnimatedPart = {
              object: child,
              originalPosition: child.position.clone(),
              originalRotation: child.rotation.clone(),
              targetPosition: child.position.clone(),
              targetRotation: child.rotation.clone(),
              isAnimating: false,
              animationSpeed: 0.05,
              isOpen: false,
              animationType: "door",
              doorIndex: glassDoorIndex,
            };
            newAnimatedParts.set(name, animatedPart);
          }
        }

        // Find mirrors (they should move with front doors)
        if (name.includes("mirror_L") || name.includes("mirror_R")) {
          let mirrorDoorIndex = -1;
          if (name.includes("mirror_L"))
            mirrorDoorIndex = 0; // Left mirror with left door
          else if (name.includes("mirror_R")) mirrorDoorIndex = 1; // Right mirror with right door

          if (mirrorDoorIndex !== -1) {
            const animatedPart: AnimatedPart = {
              object: child,
              originalPosition: child.position.clone(),
              originalRotation: child.rotation.clone(),
              targetPosition: child.position.clone(),
              targetRotation: child.rotation.clone(),
              isAnimating: false,
              animationSpeed: 0.05,
              isOpen: false,
              animationType: "door",
              doorIndex: mirrorDoorIndex,
            };
            newAnimatedParts.set(name, animatedPart);
          }
        }

        // Find roof by configuration
        if (findObjectByName(child, animationConfig.roof.names)) {
          const animatedPart: AnimatedPart = {
            object: child,
            originalPosition: child.position.clone(),
            originalRotation: child.rotation.clone(),
            targetPosition: child.position.clone(),
            targetRotation: child.rotation.clone(),
            isAnimating: false,
            animationSpeed: 0.05,
            isOpen: false,
            animationType: "roof",
          };
          newAnimatedParts.set(name, animatedPart);
        }

        // Find all objects with "wheel" for analysis
        if (name.toLowerCase().includes("wheel")) {
        }

        // Find glass elements
        if (
          name.toLowerCase().includes("glass") ||
          name.toLowerCase().includes("window") ||
          name.toLowerCase().includes("windshield")
        ) {
          foundGlassElements.push(name);
        }

        // FINAL APPROACH: main wheels + AMG rims, without details
        if (
          // AMG rims (main groups only, without details)
          name === "AMG_wheels" ||
          name === "AMG_wheels001" ||
          name === "AMG_wheels002" ||
          name === "AMG_wheels003"
        ) {
          wheelsRef.current.push(child);
        }
      });

      // Initialize animated parts
      setAnimatedParts(newAnimatedParts);
      animatedPartsRef.current = newAnimatedParts;
    }
  }, [scene]); // Only on scene load

  // 2. Apply materials on color change
  useEffect(() => {
    if (scene && modelRef.current) {
      let tintedElementsCount = 0;

      scene.traverse((child) => {
        if (child instanceof Mesh) {
          const name = child.name;

          // Exclude all objects with "wheel" in name
          if (
            !name.toLowerCase().includes("wheel") &&
            !name.toLowerCase().includes("steering")
          ) {
            if (
              name.toLowerCase().includes("body") ||
              name.toLowerCase().includes("chassis")
            ) {
              child.material = bodyMaterial;
            } else if (
              name.toLowerCase().includes("rim") ||
              name.toLowerCase().includes("trim") ||
              name.toLowerCase().includes("chrome")
            ) {
              child.material = detailsMaterial;
            } else if (isTintingGlass(name)) {
              // Apply tint only to specific glass elements
              child.material = glassMaterial;
              tintedElementsCount++;
            }
          }
        }
      });
    }
  }, [scene, bodyMaterial, detailsMaterial, glassMaterial]);

  // Function to determine glass elements that should be tinted
  const isTintingGlass = (name: string) => {
    const tintingGlassNames = [
      // Door glass
      "G-class_doorglass_FL_tint_G-class_glass_tint_0",
      "G-class_doorglass_FR_tint_G-class_glass_tint_0",
      "G-class_doorglass_RL_tint_ExtWindows_0",
      "G-class_doorglass_RR_tint_G-class_glass_tint_0",

      // Side quarter glass
      "G-class_quarterglass_L_tint_G-class_glass_tint_0",
      "G-class_quarterglass_R_tint_G-class_glass_tint_0",

      // Windshield
      "G-class_windshield_G-class_glass_0",

      // Rear glass
      "G-class_tailgateglass_tint_G-class_glass_tint_0",
    ];

    return tintingGlassNames.includes(name);
  };

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={1} />
    </group>
  );
}
