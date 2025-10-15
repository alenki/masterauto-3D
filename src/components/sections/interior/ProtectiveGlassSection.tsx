export default function ProtectiveGlassSection() {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="text-white text-center bg-black/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg">
        <h2 className="text-4xl font-bold mb-6">ЗАЩИТНОЕ СТЕКЛО</h2>
        <p className="text-lg mb-4">Для мониторов и панелей</p>
        <ul className="space-y-3 text-lg">
          <li className="items-start">
            <span className="text-purple-400 mr-3">•</span>
            Антибликовое покрытие
            <span className="text-purple-400 ml-3">•</span>
          </li>
          <li className="items-start">
            <span className="text-purple-400 mr-3">•</span>
            Защита от царапин
            <span className="text-purple-400 ml-3">•</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
