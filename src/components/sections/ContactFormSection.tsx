"use client";
import { useState } from "react";
import LeafletMap from "./LeafletMap";

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
    alert("Спасибо за обращение! Мы свяжемся с вами.");
  };

  const points = [
    {
      id: "a",
      title: "A",
      description: "Point A",
      coords: [43.518998, 43.655673],
    },
  ];
  const center = [43.518998, 43.655673];
  const zoom = 1;

  return (
    <section className="h-screen bg-black/10 backdrop-blur-md rounded-4xl flex items-start justify-start">
      <div className="">
        <h2 className="custom-contact-hero-text font-bold ml-3 my-13 text-black text-center">
          СВЯЗАТЬСЯ С НАМИ
        </h2>
        <div className="flex items-end justify-center px-20 pt-13">
          <div className="bg-black/10 backdrop-blur-md p-8 rounded-xl w-full max-w-310 flex">
            {/* Map */}
            <div className="w-[100%]">
              <div className="p-6 pr-25 h-[100%]">
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
            <div className="max-w-md ml-auto p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Имя"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded bg-white/20 text-white placeholder-white/60 border border-white/30"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded bg-white/20 text-white placeholder-white/60 border border-white/30"
                  required
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded bg-white/20 text-white placeholder-white/60 border border-white/30"
                />
                <textarea
                  placeholder="Сообщение"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 h-32"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
                >
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="bg-black/10 backdrop-blur-md flex mt-15 h-35"></div>
      </div>
    </section>
  );
}
