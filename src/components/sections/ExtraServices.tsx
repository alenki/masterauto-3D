export default function ExtraServices() {
  return (
    <section className="h-screen flex flex-col items-center justify-center">
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

      <div className="liquid-glass rounded-2xl p-8 max-w-7xl text">
        <h2 className="custom-extraservices-hero-text font-bold mb-13 text-white text-center relative z-10">
          ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ
        </h2>
        <div className="flex flex-row">
          <div className="text-white liquid-glass rounded-2xl p-8 max-w-lg mx-5">
            <h2 className="text-4xl font-bold mb-6 relative z-10">ДЕТЕЙЛИНГ</h2>
            <p className="text-lg mb-4 relative z-10">
              Мы используем только проверенные технологии и материалы, чтобы
              обеспечить долговечный и безупречный результат
            </p>
            <ul className="space-y-3 text-lg relative z-10">
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Полировка кузова
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Керамическая защита
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Автомойка
              </li>
            </ul>
          </div>
          <div className="text-white liquid-glass rounded-2xl p-8 max-w-lg mx-5">
            <h2 className="text-4xl font-bold mb-6 relative z-10">
              ДООСНАЩЕНИЕ
            </h2>
            <p className="text-lg mb-4 relative z-10">
              Мы используем профессиональные полировальные машины, аппараты
              высокого давления, пылесосы, парогенераторы и многое другое
            </p>
            <ul className="space-y-3 text-lg relative z-10">
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Автосигнализации с автозапуском
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Электромеханический замок
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Мониторы на системе &ldquo;Андройд&rdquo;
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Программный чип тюнинг
              </li>
            </ul>
          </div>
          <div className="text-white liquid-glass rounded-2xl p-8 max-w-lg mx-5">
            <h2 className="text-4xl font-bold mb-6 relative z-10">
              РЕСТАЙЛИНГ
            </h2>
            <p className="text-lg mb-4 relative z-10">
              Наиболее часто встречаются изменения затрагивающие:
            </p>
            <ul className="space-y-3 text-lg relative z-10">
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Переднюю или заднюю оптику
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Решетку радиатора
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Бамперы
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Дизайн легкосплавных дисков
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
