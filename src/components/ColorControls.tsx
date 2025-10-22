// src/components/ColorControls.tsx
"use client";

interface ColorControlsProps {
  bodyColor: string;
  detailsColor: string;
  glassColor: string;
  wheelSpeed: number;
  onBodyColorChange: (color: string) => void;
  onDetailsColorChange: (color: string) => void;
  onGlassColorChange: (color: string) => void;
  onWheelSpeedChange: (speed: number) => void;
}

export default function ColorControls({
  bodyColor,
  detailsColor,
  glassColor,
  wheelSpeed,
  onBodyColorChange,
  onDetailsColorChange,
  onGlassColorChange,
  onWheelSpeedChange,
}: ColorControlsProps) {
  return (
    <div className="ml-25 mt-25 z-10 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🚗 Настройки Mercedes G63
      </h2>

      <div className="space-y-4">
        {/* Цвет кузова */}
        <div className="flex items-center space-x-3">
          <label className="text-sm font-medium text-gray-700 w-16">
            Кузов:
          </label>
          <input
            type="color"
            value={bodyColor}
            onChange={(e) => onBodyColorChange(e.target.value)}
            className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
          />
          <span className="text-xs text-gray-500">{bodyColor}</span>
        </div>

        {/* Цвет деталей */}
        <div className="flex items-center space-x-3">
          <label className="text-sm font-medium text-gray-700 w-16">
            Детали:
          </label>
          <input
            type="color"
            value={detailsColor}
            onChange={(e) => onDetailsColorChange(e.target.value)}
            className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
          />
          <span className="text-xs text-gray-500">{detailsColor}</span>
        </div>

        {/* Цвет стекла */}
        <div className="flex items-center space-x-3">
          <label className="text-sm font-medium text-gray-700 w-16">
            Стекло:
          </label>
          <input
            type="color"
            value={glassColor}
            onChange={(e) => onGlassColorChange(e.target.value)}
            className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
          />
          <span className="text-xs text-gray-500">{glassColor}</span>
        </div>

        {/* Скорость колес */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Скорость колес: {wheelSpeed.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={wheelSpeed}
            onChange={(e) => onWheelSpeedChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Предустановленные цвета */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Быстрый выбор:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                onBodyColorChange("#ff0000");
                onDetailsColorChange("#ffffff");
                onGlassColorChange("#ffffff");
              }}
              className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
            >
              Красный
            </button>
            <button
              onClick={() => {
                onBodyColorChange("#0000ff");
                onDetailsColorChange("#ffffff");
                onGlassColorChange("#ffffff");
              }}
              className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Синий
            </button>
            <button
              onClick={() => {
                onBodyColorChange("#000000");
                onDetailsColorChange("#ffffff");
                onGlassColorChange("#ffffff");
              }}
              className="px-3 py-1 text-xs bg-black text-white rounded hover:bg-gray-800"
            >
              Черный
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
