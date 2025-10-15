interface TintingSectionProps {
  glassColor: string;
  onGlassColorChange: (color: string) => void;
}

export default function TintingSection({ glassColor, onGlassColorChange }: TintingSectionProps) {
  // Функция для преобразования цвета в значение ползунка (0-100)
  const getSliderValue = (color: string) => {
    // Если цвет уже в формате тонировки, извлекаем значение
    if (color.startsWith('#')) {
      // Преобразуем hex в RGB
      const hex = color.replace('#', '');
      if (hex.length === 6) {
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Вычисляем яркость (0-255) и преобразуем в процент (0-100)
        // Для серых тонов все компоненты одинаковы
        const brightness = (r + g + b) / 3;
        return Math.round(100 - (brightness / 255) * 100);
      }
    }
    return 0;
  };

  // Функция для плавного преобразования значения ползунка в цвет (0-100)
  const getColorFromSlider = (value: number) => {
    // Ограничиваем значение от 0 до 100
    const clampedValue = Math.max(0, Math.min(100, value));
    
    // Преобразуем процент в яркость (255 = белый, 0 = черный)
    const brightness = Math.round(255 - (clampedValue / 100) * 255);
    
    // Создаем серый цвет с вычисленной яркостью
    const hex = brightness.toString(16).padStart(2, '0');
    return `#${hex}${hex}${hex}`;
  };

  const handleSliderChange = (value: number) => {
    const newColor = getColorFromSlider(value);
    onGlassColorChange(newColor);
  };

  return (
    <section className="h-screen flex items-center justify-between px-20">
      {/* Информационная панель слева */}
      <div className="text-white bg-black/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg">
        <h2 className="text-4xl font-bold mb-6">ТОНИРОВКА</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">БОЛЬШОЙ ВЫБОР СТЁКОЛ:</h3>
            <ul className="space-y-2 text-lg">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                Тонировка по ГОСТУ
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                Атермальная пленка
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                Архитектурная пленка
              </li>
            </ul>
          </div>
          <div className="border-t border-white/20 pt-4">
            <p className="text-sm text-gray-300">
              Мастера с многолетним опытом • Гарантия качества на все виды оклейки
            </p>
          </div>
        </div>
      </div>

      {/* Панель управления тоном справа */}
      <div className="text-white bg-black/30 backdrop-blur-sm rounded-2xl p-6 max-w-sm">
        <h3 className="text-2xl font-bold mb-6">Интенсивность тонировки</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Уровень тонировки: {getSliderValue(glassColor)}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={getSliderValue(glassColor)}
              onChange={(e) => handleSliderChange(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #ffffff 0%, #1e293b 50%, #0f172a 100%)`
              }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-400">
            <span>Прозрачный</span>
            <span>Максимальная</span>
          </div>
        </div>

        <div className="mt-6 p-3 bg-white/10 rounded-lg">
          <p className="text-sm text-gray-300">
            Текущий тон: <span className="text-blue-400">{glassColor}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
