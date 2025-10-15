export default function ChemicalCleaningSection() {
  return (
    <section className="h-screen flex items-center justify-end pr-20">
      <div className="text-white bg-black/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg">
        <h2 className="text-4xl font-bold mb-6">ХИМЧИСТКА САЛОНА</h2>
        <p className="text-lg mb-4">
          Созданы для решения проблемы высокой или неудобной посадки в салон
          вашего автомобиля
        </p>
        <ul className="space-y-3 text-lg">
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">•</span>
            Глубокая очистка всех поверхностей
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">•</span>
            Удаление пятен и запахов
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">•</span>
            Обработка сидений и ковриков
          </li>
        </ul>
      </div>
    </section>
  );
}
