export default function ExtraServices() {
  return (
    <section className="lg:section-height flex flex-col items-center justify-center">
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

      <div className="liquid-glass rounded-2xl sm:p-8 xs:p-5 p-3 py-7 xl:max-w-7xl max-w-[90vw]">
        <h2 className="custom-extraservices-hero-text font-bold xl:mb-13 xs:mb-7 mb-5 text-white text-center relative z-10 xl:text-[6.9rem] lg:text-[7vw] xs:text-[10vw] text-[9vw] lg:leading-[8rem] sm:leading-[6rem] xs:leading-[4rem] leading-[2.5rem]">
          ADDITIONAL SERVICES
        </h2>
        <div className="flex lg:flex-row flex-col lg:items-stretch items-center">
          <div className="text-white liquid-glass rounded-2xl sm:p-8 p-5 lg:w-lg max-w-lg mx-5">
            <h2 className="xl:text-4xl xs:text-2xl text-xl font-bold mb-6 relative z-10">DETAILING</h2>
            <p className="xl:text-lg xs:text-[1rem] text-sm  mb-4 relative z-10">
              We use only proven technologies and materials to ensure
              long-lasting and flawless results
            </p>
            <ul className="space-y-3 xl:text-lg xs:text-[1rem] text-sm  relative z-10">
              <li className="flex items-start">
                <span className=" mr-3">•</span>
                Body polishing
              </li>
              <li className="flex items-start">
                <span className=" mr-3">•</span>
                Ceramic protection
              </li>
              <li className="flex items-start">
                <span className=" mr-3">•</span>
                Car wash
              </li>
            </ul>
          </div>
          <div className="text-white liquid-glass rounded-2xl sm:p-8 p-5 lg:w-lg max-w-lg mx-5 lg:my-0 my-10">
            <h2 className="xl:text-4xl xs:text-2xl text-xl font-bold mb-6 relative z-10">
              VEHICLE UPGRADES
            </h2>
            <p className="xl:text-lg xs:text-[1rem] text-sm  mb-4 relative z-10">
              We use professional polishing machines, high-pressure washers,
              vacuums, steam generators, and more
            </p>
            <ul className="space-y-3 xl:text-lg xs:text-[1rem] text-sm  relative z-10">
              <li className="flex items-start">
                <span className=" mr-3">•</span>
                Car alarms with remote start
              </li>
              <li className="flex items-start">
                <span className=" mr-3">•</span>
                Electromechanical lock
              </li>
              <li className="flex items-start">
                <span className=" mr-3">•</span>
                Android system monitors
              </li>
              <li className="flex items-start">
                <span className=" mr-3">•</span>
                ECU chip tuning
              </li>
            </ul>
          </div>
          <div className="text-white liquid-glass rounded-2xl sm:p-8 p-5 lg:w-lg max-w-lg mx-5">
            <h2 className="xl:text-4xl xs:text-2xl text-xl font-bold mb-6 relative z-10">
              RESTYLING
            </h2>
            <p className="xl:text-lg xs:text-[1rem] text-sm  mb-4 relative z-10">
              Most common modifications include:
            </p>
            <ul className="space-y-3 xl:text-lg xs:text-[1rem] text-sm  relative z-10">
              <li className="flex items-start">
                <span className=" mr-3">•</span>
                Front or rear lights
              </li>
              <li className="flex items-start">
                <span className=" mr-3">•</span>
                Radiator grille
              </li>
              <li className="flex items-start">
                <span className=" mr-3">•</span>
                Bumpers
              </li>
              <li className="flex items-start">
                <span className=" mr-3">•</span>
                Alloy wheel design
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
