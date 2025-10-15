export default function PPFSection() {
  return (
    <section className="h-screen flex items-center justify-start pl-20">
      <div className="text-white bg-black/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg">
        <h2 className="text-4xl font-bold mb-6">АНТИГРАВИЙНАЯ ПЛЁНКА</h2>
        <div className="space-y-4">
          <p className="text-lg mb-4">
            Качественная пленка защищает авто от:
          </p>
          <ul className="space-y-2 text-lg">
            <li className="flex items-start">
              <span className="text-red-400 mr-3">•</span>
              Сколов и царапин
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-3">•</span>
              Пескоструя
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-3">•</span>
              Хим реагентов
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-3">•</span>
              Вандалов
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-3">•</span>
              Небольших ДТП
            </li>
          </ul>
          <div className="border-t border-white/20 pt-4">
            <p className="text-sm text-gray-300">
              Пленка NEVER SCRATCH - премиум класса с самозаживляющимися свойствами
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
