interface TintingSectionProps {
  glassColor: string;
  onGlassColorChange: (color: string) => void;
}

export default function TintingSection({
  glassColor,
  onGlassColorChange,
}: TintingSectionProps) {
  // Функция для преобразования цвета в значение ползунка (0-100)
  const getSliderValue = (color: string) => {
    // Если цвет уже в формате тонировки, извлекаем значение
    if (color.startsWith("#")) {
      // Преобразуем hex в RGB
      const hex = color.replace("#", "");
      if (hex.length === 6) {
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);

        // Вычисляем яркость (0-255) и преобразуем в процент (0-100)
        // Для серых тонов все компоненты одинаковы
        const brightness = (r + g + b) / 3;
        return Math.round(100 - (brightness / 255) * 100);
      }
    }
    return 0;
  };

  // Функция для плавного преобразования значения ползунка в цвет (0-100)
  const getColorFromSlider = (value: number) => {
    // Ограничиваем значение от 0 до 100
    const clampedValue = Math.max(0, Math.min(100, value));

    // Преобразуем процент в яркость (255 = белый, 0 = черный)
    const brightness = Math.round(255 - (clampedValue / 100) * 255);

    // Создаем серый цвет с вычисленной яркостью
    const hex = brightness.toString(16).padStart(2, "0");
    return `#${hex}${hex}${hex}`;
  };

  const handleSliderChange = (value: number) => {
    const newColor = getColorFromSlider(value);
    onGlassColorChange(newColor);
  };

  return (
    <section className="section-height flex lg:flex-row flex-col items-center lg:justify-between justify-around px-20">
      {/* <!-- SVG Filter --> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
        className="hidden"
      >
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.001 0.005"
            numOctaves="1"
            seed="17"
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="200"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      {/* <!-- SVG Filter --> */}

      {/* Информационная панель слева */}
      <div className="text-white liquid-glass rounded-2xl p-8 sm:max-w-lg w-[85vw]">
        <h2 className="sm:text-4xl text-2xl font-bold sm:mb-6 mb-4 relative z-10">ТОНИРОВКА</h2>
        <div className="space-y-4 relative z-10">
          <div>
            <h3 className="sm:text-2xl text-lg font-semibold mb-2">
              БОЛЬШОЙ ВЫБОР СТЁКОЛ:
            </h3>
            <ul className="space-y-2 text-lg">
              <li className="flex items-start">
                <span className=" mr-3">•</span>
                Тонировка по ГОСТУ
              </li>
              <li className="flex items-start">
                <span className=" mr-3">•</span>
                Атермальная пленка
              </li>
              <li className="flex items-start">
                <span className=" mr-3">•</span>
                Архитектурная пленка
              </li>
            </ul>
          </div>
          <div className="border-t border-white/20 pt-4">
            <p className="text-sm text-gray-300">
              Мастера с многолетним опытом • Гарантия качества на все виды
              оклейки
            </p>
          </div>
        </div>
      </div>

      {/* Панель управления тоном справа */}
      <div className="text-white liquid-glass rounded-2xl p-6 lg:max-w-sm md:w-[55vw] w-[85vw]">
        <h3 className="text-2xl font-bold mb-6 relative z-10">
          Интенсивность тонировки
        </h3>

        <div className="space-y-4 relative z-10">
          <div>
            <label className="block text-sm font-medium mb-2">
              Уровень тонировки: {getSliderValue(glassColor)}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={getSliderValue(glassColor)}
              onChange={(e) => handleSliderChange(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #ffffff 0%, #1e293b 50%, #0f172a 100%)`,
              }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-400">
            <span>Прозрачный</span>
            <span>Максимальная</span>
          </div>
        </div>
      </div>
    </section>
  );
}
