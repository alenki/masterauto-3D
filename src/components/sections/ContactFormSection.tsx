'use client';
import { useState } from 'react';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Спасибо за обращение! Мы свяжемся с вами.');
  };

  return (
    <section className="h-screen flex items-center justify-end pr-20">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl max-w-md w-full">
        <h2 className="text-4xl font-bold mb-6 text-white">СВЯЗАТЬСЯ С НАМИ</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Имя"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 rounded bg-white/20 text-white placeholder-white/60 border border-white/30"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 rounded bg-white/20 text-white placeholder-white/60 border border-white/30"
            required
          />
          <input
            type="tel"
            placeholder="Телефон"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-3 rounded bg-white/20 text-white placeholder-white/60 border border-white/30"
          />
          <textarea
            placeholder="Сообщение"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
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
    </section>
  );
}
