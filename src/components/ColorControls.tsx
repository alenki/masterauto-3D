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
        Mercedes G63 Settings
      </h2>

      <div className="space-y-4">
        {/* Body Color */}
        <div className="flex items-center space-x-3">
          <label className="text-sm font-medium text-gray-700 w-16">
            Body:
          </label>
          <input
            type="color"
            value={bodyColor}
            onChange={(e) => onBodyColorChange(e.target.value)}
            className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
          />
          <span className="text-xs text-gray-500">{bodyColor}</span>
        </div>

        {/* Details Color */}
        <div className="flex items-center space-x-3">
          <label className="text-sm font-medium text-gray-700 w-16">
            Details:
          </label>
          <input
            type="color"
            value={detailsColor}
            onChange={(e) => onDetailsColorChange(e.target.value)}
            className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
          />
          <span className="text-xs text-gray-500">{detailsColor}</span>
        </div>

        {/* Glass Color */}
        <div className="flex items-center space-x-3">
          <label className="text-sm font-medium text-gray-700 w-16">
            Glass:
          </label>
          <input
            type="color"
            value={glassColor}
            onChange={(e) => onGlassColorChange(e.target.value)}
            className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
          />
          <span className="text-xs text-gray-500">{glassColor}</span>
        </div>

        {/* Wheel Speed */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Wheel speed: {wheelSpeed.toFixed(1)}x
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

        {/* Preset Colors */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Quick select:
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
              Red
            </button>
            <button
              onClick={() => {
                onBodyColorChange("#0000ff");
                onDetailsColorChange("#ffffff");
                onGlassColorChange("#ffffff");
              }}
              className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Blue
            </button>
            <button
              onClick={() => {
                onBodyColorChange("#000000");
                onDetailsColorChange("#ffffff");
                onGlassColorChange("#ffffff");
              }}
              className="px-3 py-1 text-xs bg-black text-white rounded hover:bg-gray-800"
            >
              Black
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
