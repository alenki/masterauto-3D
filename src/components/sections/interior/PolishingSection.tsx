export default function PolishingSection() {
  return (
    // <section className="h-screen flex items-center justify-start pl-20">
    //   <div className="text-white">
    //     <h2 className="text-5xl font-bold mb-4">ПОЛИРОВКА САЛОНА</h2>
    //     <p className="text-xl">Восстановление блеска поверхностей</p>
    //     <p className="text-lg mt-2 text-white/80">• Кожаные сиденья</p>
    //     <p className="text-lg text-white/80">• Пластиковые элементы</p>
    //   </div>
    // </section>
    <section className="h-screen flex items-center justify-start pl-20">
      <div className="text-white bg-black/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg">
        <h2 className="text-4xl font-bold mb-6">ПОЛИРОВКА САЛОНА</h2>
        <div className="space-y-4">
          <p className="text-lg mb-4">Восстановление блеска поверхностей</p>
          <ul className="space-y-2 text-lg">
            <li className="flex items-start">
              <span className="text-red-400 mr-3">•</span>
              Полировка всех лакированных вставок салона автомобиля
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-3">•</span>
              Нанесение керамики на все лакированные вставки салона автомобиля
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
