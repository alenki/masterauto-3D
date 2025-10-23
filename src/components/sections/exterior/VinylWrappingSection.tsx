interface VinylWrappingSectionProps {
  bodyColor: string;
  onBodyColorChange: (color: string) => void;
}

export default function VinylWrappingSection({
  bodyColor,
  onBodyColorChange,
}: VinylWrappingSectionProps) {
  const vinylColors = [
    { name: "Черный", color: "#000", bg: "bg-black" },
    { name: "Белый", color: "#fff", bg: "bg-white" },
    { name: "Красный", color: "#ff0000", bg: "bg-red-700" },
    { name: "Темно-красный", color: "#7f1d1d", bg: "bg-red-900" },
    { name: "Синий", color: "#1e3a8a", bg: "bg-blue-800" },
    { name: "Темно-синий", color: "#374151", bg: "bg-blue-950" },
    { name: "Темно-зеленый", color: "#14532d", bg: "bg-green-900" },
    { name: "Темно-фиолетовый", color: "#581c87", bg: "bg-purple-900" },
    { name: "Темно-оранжевый", color: "#9a3412", bg: "bg-orange-900" },
    { name: "Темно-коричневый", color: "#451a03", bg: "bg-amber-900" },
  ];

  return (
    <section className="h-screen flex lg:flex-row flex-col items-center justify-between px-20">
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

      {/* Панель управления цветом слева */}
      <div className="text-white liquid-glass rounded-2xl p-6 lg:max-w-sm md:w-[55vw] w-[85vw]">
        <h3 className="text-2xl font-bold mb-4 relative z-10">
          Выберите цвет винила
        </h3>
        <div className="grid lg:grid-cols-2 grid-cols-5 gap-3 relative z-10">
          {vinylColors.map((vinyl, index) => (
            <button
              key={index}
              onClick={() => onBodyColorChange(vinyl.color)}
              className={`${
                vinyl.bg
              } p-4.5 rounded-lg text-white text-sm font-medium hover:scale-105 transition-transform cursor-pointer ${
                bodyColor === vinyl.color ? "ring-2 ring-yellow-400" : ""
              }`}
            >
            </button>
          ))}
        </div>
      </div>

      {/* Информационная панель справа */}
      <div className="text-white liquid-glass rounded-2xl p-8 sm:max-w-lg w-[85vw]">
        <h2 className="sm:text-4xl text-2xl font-bold sm:mb-6 mb-4 relative z-10">
          ОКЛЕЙКА ВИНИЛОМ
        </h2>
        <ul className="space-y-3 text-lg relative z-10">
          <li className="flex items-start">
            <span className=" mr-3">•</span>
            Большой выбор цветовой гаммы
          </li>
          <li className="flex items-start">
            <span className=" mr-3">•</span>
            Защита кузова от царапин
          </li>
          <li className="flex items-start">
            <span className=" mr-3">•</span>
            Создание личного дизайна
          </li>
        </ul>
      </div>
    </section>
  );
}
