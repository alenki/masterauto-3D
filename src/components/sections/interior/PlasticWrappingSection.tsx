export default function PlasticWrappingSection() {
  return (
    <section className="h-screen flex items-center justify-end pr-20">
      <div className="text-white bg-black/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg">
        <h2 className="text-4xl font-bold mb-6">ОКЛЕЙКА ПЛАСТИКА</h2>
        <p className="text-lg mb-4">Защита и стиль салона</p>
        <ul className="space-y-3 text-lg">
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">•</span>
            Виниловые покрытия
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">•</span>
            Карбоновые текстуры
          </li>
        </ul>
      </div>
    </section>
  );
}
