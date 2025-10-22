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
  scrollProgress?: number; // Добавляем прогресс скролла
  onLoaded?: () => void;
}

// Интерфейс для анимируемых частей автомобиля
interface AnimatedPart {
  object: Object3D;
  originalPosition: Vector3;
  originalRotation: Euler;
  targetPosition: Vector3;
  targetRotation: Euler;
  isAnimating: boolean;
  animationSpeed: number;
  isOpen: boolean; // Состояние открыто/закрыто
  animationType: "door" | "roof"; // Тип анимации
  doorIndex?: number; // Индекс двери (0-3: передняя левая, передняя правая, задняя левая, задняя правая)
}

export default function InteractiveCarModel({
  bodyColor,
  detailsColor,
  glassColor,
  wheelSpeed,
  scrollProgress = 0,
  onLoaded,
}: CarModelProps) {
  const { scene } = useGLTF("/models/mersedes-benz_g63_amg.glb");
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

  // Состояние для анимируемых частей автомобиля
  const [animatedParts, setAnimatedParts] = useState<Map<string, AnimatedPart>>(
    new Map()
  );
  const animatedPartsRef = useRef<Map<string, AnimatedPart>>(new Map());

  // Состояния для управления анимацией
  const [doorsState, setDoorsState] = useState<
    [number, number, number, number]
  >([0, 0, 0, 0]); // [FL, FR, RL, RR]
  const [roofState, setRoofState] = useState(0);

  // Константы для настройки анимации
  const ANIMATION_CONFIG = {
    doorMaxAngle: Math.PI * 0.9, // Максимальный угол поворота дверей (30 градусов)
    roofMaxHeight: 40.0, // Максимальная высота подъема крыши
    animationSpeed: 0.1, // Скорость анимации (0.1 = плавно, 1.0 = мгновенно)
  };

  // Конфигурация объектов для анимации (настроено под Mercedes G-class)
  const animationConfig = {
    doors: {
      // Левая передняя дверь (FL)
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
      // Правая передняя дверь (FR)
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
      // Левая задняя дверь (RL)
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
      // Правая задняя дверь (RR)
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
      // Названия объектов крыши в модели
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

  // Функция для поиска объекта по списку возможных названий
  const findObjectByName = (
    object: Object3D,
    possibleNames: string[]
  ): boolean => {
    const name = object.name.toLowerCase();
    return possibleNames.some((possibleName) =>
      name.includes(possibleName.toLowerCase())
    );
  };

  // Функция для определения индекса двери
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

  // Анимация на основе scrollProgress через 5 секций
  useFrame(({ camera }, delta) => {
    if (modelRef.current) {
      // Определяем позиции камеры для каждой секции
      const cameraPositions = [
        // Секция 0: ЭкстерьерHero
        {
          x: 0,
          y: 0,
          z: -9,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 1.5,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        // ЭКСТЕРЬЕР (1-6)
        // Секция 1: Экстерьер Hero - общий вид машины спереди
        {
          x: 0,
          y: 0,
          z: -9,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 0.9,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        // Секция 2: Оклейка винилом - фокус на кузове сбоку
        {
          x: 0,
          y: 0,
          z: -9,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 0.5,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        // Секция 3: Тонировка - фокус на стеклах
        {
          x: 0,
          y: 2,
          z: -4,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 0.5,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        // Секция 4: Выпрямление вмятин - детали кузова
        {
          x: 0,
          y: 0,
          z: -4,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 0.5,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        // Секция 5: Антигравийная пленка - передний бампер
        {
          x: 0,
          y: 0,
          z: -9,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 1.0,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        // Секция 6: Подножки - вид снизу сбоку
        {
          x: 0,
          y: -2,
          z: -3,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 1.5,
          doors: [0, 0, 0, 0],
          roof: 0,
        },

        // ИНТЕРЬЕР (7-11)
        // Секция 7: Интерьер Hero - переход к салону
        {
          x: 0,
          y: 2,
          z: -5,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 1.5,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        // Секция 8: Химчистка - салон с открытыми дверями
        {
          x: 0,
          y: 2,
          z: -2,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 1.3,
          doors: [0.7, 0.7, 0.7, 0.7],
          roof: 0.7,
        },
        // Секция 9: Полировка - сиденья
        {
          x: 0,
          y: 2,
          z: -2,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 1.2,
          doors: [0.7, 0.7, 0.7, 0.7],
          roof: 0.8,
        },
        // Секция 10: Оклейка пластика - панель приборов
        {
          x: 0,
          y: 2,
          z: -2,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 0.5,
          doors: [1, 1, 1, 1],
          roof: 1,
        },
        // Секция 11: Защитное стекло - монитор
        {
          x: 0,
          y: 1,
          z: 0,
          lookAt: [0, 0.3, 0.7],
          rotationY: Math.PI * 0.1,
          doors: [1, 1, 1, 1],
          roof: 1,
        },

        // ОБЩИЕ (12-15)
        // Секция 12: Power - вид сбоку
        {
          x: 0,
          y: 1,
          z: 0,
          lookAt: [0.2, 0.3, 0.7],
          rotationY: Math.PI * 0.1,
          doors: [1, 1, 1, 1],
          roof: 1,
        },
        // Секция 13: Premium - вид сверху
        {
          x: 0,
          y: 0,
          z: -9,
          lookAt: [0, 0, 0],
          rotationY: Math.PI * 0.4,
          doors: [0, 0, 0, 0],
          roof: 0,
        },
        // Секция 14: Contact - контактная форма
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

      // Определяем текущую и следующую секцию
      const totalSections = 15;
      const sectionIndex = Math.floor(scrollProgress * totalSections);
      const nextSectionIndex = Math.min(sectionIndex + 1, totalSections - 1);
      const sectionProgress = scrollProgress * totalSections - sectionIndex;

      // Интерполяция между секциями
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

      // Плавная интерполяция lookAt
      const lookAtX =
        currentPos.lookAt[0] +
        (nextPos.lookAt[0] - currentPos.lookAt[0]) * sectionProgress;
      const lookAtY =
        currentPos.lookAt[1] +
        (nextPos.lookAt[1] - currentPos.lookAt[1]) * sectionProgress;
      const lookAtZ =
        currentPos.lookAt[2] +
        (nextPos.lookAt[2] - currentPos.lookAt[2]) * sectionProgress;

      // Применяем позицию камеры
      camera.position.set(cameraX, cameraY, cameraZ);
      camera.lookAt(lookAtX, lookAtY, lookAtZ);

      // Применяем вращение машины
      modelRef.current.rotation.y = rotationY;

      // Машина остается в центре
      modelRef.current.position.set(0, 0, 0);

      // Применяем анимацию частей на основе конфигурации камеры
      const currentConfig = cameraPositions[sectionIndex];
      const nextConfig = cameraPositions[nextSectionIndex];

      // Интерполируем значения анимации между секциями
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

      // Обновляем состояния анимации
      setDoorsState([doorsFL, doorsFR, doorsRL, doorsRR]);
      setRoofState(roof);
    }

    // Анимация колес на основе изменения scrollProgress
    const scrollDelta = scrollProgress - prevScrollProgress.current;
    prevScrollProgress.current = scrollProgress;

    wheelsRef.current.forEach((wheel) => {
      if (wheel) {
        // Колеса крутятся только если есть изменение scrollProgress
        wheel.rotation.x += scrollDelta * wheelSpeed * 50; // Множитель 50 для видимости вращения
      }
    });

    // Анимация частей автомобиля
    animatedPartsRef.current.forEach((part, name) => {
      if (part.animationType === "door" && part.doorIndex !== undefined) {
        // Анимация дверей
        const doorValue = doorsState[part.doorIndex];
        const targetRotation = part.originalRotation.clone();

        // Определяем направление поворота для каждой двери
        let rotationDirection = 1; // По умолчанию положительное направление

        if (part.doorIndex === 0) {
          // FL - левая передняя (открывается влево)
          rotationDirection = 1;
        } else if (part.doorIndex === 1) {
          // FR - правая передняя (открывается вправо)
          rotationDirection = -1;
        } else if (part.doorIndex === 2) {
          // RL - левая задняя (открывается влево)
          rotationDirection = 1;
        } else if (part.doorIndex === 3) {
          // RR - правая задняя (открывается вправо)
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
        // Анимация крыши - поднимается строго вверх
        const targetPosition = part.originalPosition.clone();
        targetPosition.z += roofState * ANIMATION_CONFIG.roofMaxHeight;

        // Плавно поднимаем только по Z оси
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

  // Создаем материалы

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

  // Обновляем цвета материалов
  useEffect(() => {
    bodyMaterial.color.set(bodyColor);
  }, [bodyColor, bodyMaterial]);

  useEffect(() => {
    detailsMaterial.color.set(detailsColor);
  }, [detailsColor, detailsMaterial]);

  useEffect(() => {
    glassMaterial.color.set(glassColor);
  }, [glassColor, glassMaterial]);

  // 1. Найти колеса и стеклянные элементы ОДИН РАЗ при загрузке модели
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

        // Собираем кандидатов для дверей и крыши
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

        // Ищем двери по конфигурации
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

        // Ищем стекла дверей (они должны двигаться вместе с дверями)
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

        // Ищем зеркала (они должны двигаться вместе с передними дверями)
        if (name.includes("mirror_L") || name.includes("mirror_R")) {
          let mirrorDoorIndex = -1;
          if (name.includes("mirror_L"))
            mirrorDoorIndex = 0; // Левое зеркало с левой дверью
          else if (name.includes("mirror_R")) mirrorDoorIndex = 1; // Правое зеркало с правой дверью

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

        // Ищем крышу по конфигурации
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

        // Ищем все объекты с "wheel" для анализа
        if (name.toLowerCase().includes("wheel")) {
        }

        // Ищем стеклянные элементы
        if (
          name.toLowerCase().includes("glass") ||
          name.toLowerCase().includes("window") ||
          name.toLowerCase().includes("windshield")
        ) {
          foundGlassElements.push(name);
        }

        // ФИНАЛЬНЫЙ ПОДХОД: основные колеса + AMG диски, но без деталей
        if (
          // AMG диски (только основные группы, без деталей)
          name === "AMG_wheels" ||
          name === "AMG_wheels001" ||
          name === "AMG_wheels002" ||
          name === "AMG_wheels003"
        ) {
          wheelsRef.current.push(child);
        }
      });

      // Инициализируем анимируемые части
      setAnimatedParts(newAnimatedParts);
      animatedPartsRef.current = newAnimatedParts;
    }
  }, [scene]); // Только при загрузке сцены

  // 2. Применить материалы при изменении цветов
  useEffect(() => {
    if (scene && modelRef.current) {
      let tintedElementsCount = 0;

      scene.traverse((child) => {
        if (child instanceof Mesh) {
          const name = child.name;

          // Исключаем все объекты с "wheel" в названии
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
              // Применяем тонировку только к конкретным стеклянным элементам
              child.material = glassMaterial;
              tintedElementsCount++;
            }
          }
        }
      });
    }
  }, [scene, bodyMaterial, detailsMaterial, glassMaterial]);

  // Функция для определения стеклянных элементов, которые должны тонироваться
  const isTintingGlass = (name: string) => {
    const tintingGlassNames = [
      // Дверные стекла
      "G-class_doorglass_FL_tint_G-class_glass_tint_0",
      "G-class_doorglass_FR_tint_G-class_glass_tint_0",
      "G-class_doorglass_RL_tint_ExtWindows_0",
      "G-class_doorglass_RR_tint_G-class_glass_tint_0",

      // Боковые глухие стекла (четвертные)
      "G-class_quarterglass_L_tint_G-class_glass_tint_0",
      "G-class_quarterglass_R_tint_G-class_glass_tint_0",

      // Лобовое стекло
      "G-class_windshield_G-class_glass_0",

      // Заднее стекло
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
