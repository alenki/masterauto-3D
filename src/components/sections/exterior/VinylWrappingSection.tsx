interface VinylWrappingSectionProps {
  bodyColor: string;
  onBodyColorChange: (color: string) => void;
}

export default function VinylWrappingSection({ bodyColor, onBodyColorChange }: VinylWrappingSectionProps) {
  const vinylColors = [
    { name: 'Темно-синий', color: '#1e3a8a', bg: 'bg-blue-900' },
    { name: 'Темно-красный', color: '#7f1d1d', bg: 'bg-red-900' },
    { name: 'Темно-зеленый', color: '#14532d', bg: 'bg-green-900' },
    { name: 'Темно-серый', color: '#374151', bg: 'bg-gray-700' },
    { name: 'Темно-фиолетовый', color: '#581c87', bg: 'bg-purple-900' },
    { name: 'Темно-оранжевый', color: '#9a3412', bg: 'bg-orange-900' },
    { name: 'Темно-коричневый', color: '#451a03', bg: 'bg-amber-900' }
  ];

  return (
    <section className="h-screen flex items-center justify-between px-20">
      {/* Панель управления цветом слева */}
      <div className="text-white bg-black/30 backdrop-blur-sm rounded-2xl p-6 max-w-sm">
        <h3 className="text-2xl font-bold mb-4">Выберите цвет винила</h3>
        <div className="grid grid-cols-2 gap-3">
          {vinylColors.map((vinyl, index) => (
            <button
              key={index}
              onClick={() => onBodyColorChange(vinyl.color)}
              className={`${vinyl.bg} p-3 rounded-lg text-white text-sm font-medium hover:scale-105 transition-transform ${
                bodyColor === vinyl.color ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              {vinyl.name}
            </button>
          ))}
        </div>
        <div className="mt-4 p-3 bg-white/10 rounded-lg">
          <p className="text-sm text-gray-300">
            Текущий цвет: <span className="text-yellow-400">{bodyColor}</span>
          </p>
        </div>
      </div>

      {/* Информационная панель справа */}
      <div className="text-white bg-black/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg">
        <h2 className="text-4xl font-bold mb-6">ОКЛЕЙКА ВИНИЛОМ</h2>
        <ul className="space-y-3 text-lg">
          <li className="flex items-start">
            <span className="text-yellow-400 mr-3">•</span>
            Большой выбор цветовой гаммы
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-3">•</span>
            Защита кузова от царапин
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-3">•</span>
            Создание личного дизайна
          </li>
        </ul>
      </div>
    </section>
  );
}
