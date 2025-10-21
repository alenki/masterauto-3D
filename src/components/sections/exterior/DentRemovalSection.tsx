export default function DentRemovalSection() {
  return (
    <section className="h-screen flex items-center justify-end pr-20">
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

      <div className="text-white liquid-glass rounded-2xl p-8 max-w-lg">
        <h2 className="text-4xl font-bold mb-6 relative z-10">
          ВЫПРЯМЛЕНИЕ ВМЯТИН
        </h2>
        <ul className="space-y-3 text-lg relative z-10">
          <li className="flex items-start">
            <span className="text-green-400 mr-3">•</span>
            Выпрямление вмятин без покраски
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-3">•</span>
            Немецкое оборудование
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-3">•</span>
            Экономия времени и денег
          </li>
        </ul>
      </div>
    </section>
  );
}
