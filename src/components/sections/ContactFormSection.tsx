"use client";
import { useState } from "react";
import LeafletMap, { type Point } from "./LeafletMap";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for reaching out! We will contact you shortly.");
  };

  const points: Point[] = [
    {
      id: "a",
      title: "A",
      description: "Point A",
      coords: [43.518998, 43.655673],
    },
  ];
  const center: [number, number] = [43.518998, 43.655673];
  const zoom = 1;

  return (
    <section className="footer-height flex items-start justify-start">
      <div className="footer-height flex flex-col items-center justify-center px-20 pt-10 w-full">
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

        <div className="liquid-glass sm:p-8 xs:p-6 p-4 mt-auto rounded-4xl md:w-full md:max-w-310 w-[85vw] flex lg:flex-row flex-col lg:items-stretch items-center">
          {/* Map */}
          <div className="lg:w-[100%] md:w-[50vw] sm:w-[60vw] w-[70vw] relative z-10">
            <div className="p-6 lg:pr-25 lg:h-[100%] md:h-[50vw] sm:h-[60vw] h-[70vw]">
              <LeafletMap
                className="w-[100%]"
                height="h-[100%]"
                points={points}
                initialCenter={center}
                initialZoom={zoom}
              />
            </div>
          </div>

          {/* Form */}
          <div className="max-w-md lg:ml-auto p-6 relative z-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded liquid-glass placeholder-white/60 border border-white/30"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded liquid-glass placeholder-white/60 border border-white/30"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 rounded liquid-glass placeholder-white/60 border border-white/30"
              />
              <textarea
                placeholder="Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded liquid-glass placeholder-white/60 border border-white/30 h-32"
                required
              />
              <button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-800 font-bold py-3 rounded transition cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="w-full lg:mt-auto mt-15 mb-7 flex sm:flex-row flex-col items-center">
          {/* CORIT LOGO */}
          <a href="https://t.me/lord_unlimited" className="footer-logo">
            MADE BY <span>KARAF</span>
          </a>
          <div className="social-media sm:ml-auto sm:mt-0 mt-5">
            {/* Telegram */}
            <a
              href="https://t.me/masterauto07"
              className="flex justify-center items-center"
              target="_blank"
            >
              <img
                src="/social/telegram.svg"
                alt="Telegram"
                className="h-[47px] w-[47px]"
              ></img>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/master_auto_07/"
              className="flex justify-center items-center"
              target="_blank"
            >
              <img
                src="/social/instagram.svg"
                alt="Instagram"
                className="h-[60px] w-[60px]"
              ></img>
            </a>
            {/* Whatsapp */}
            <a
              href="https://api.whatsapp.com/send/?phone=79287077771&text&type=phone_number"
              className="flex justify-center items-center"
              target="_blank"
            >
              <img
                src="/social/whatsapp.svg"
                alt="Whatsapp"
                className="h-[46px] w-[46px]"
              ></img>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
