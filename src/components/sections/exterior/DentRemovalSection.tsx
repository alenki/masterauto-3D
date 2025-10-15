export default function DentRemovalSection() {
  return (
    <section className="h-screen flex items-center justify-end pr-20">
      <div className="text-white bg-black/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg">
        <h2 className="text-4xl font-bold mb-6">ВЫПРЯМЛЕНИЕ ВМЯТИН</h2>
        <ul className="space-y-3 text-lg">
          <li className="flex items-start">
            <span className="text-green-400 mr-3">•</span>
            Выпрямление вмятин без покраски
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-3">•</span>
            Немецкое оборудование
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-3">•</span>
            Экономия времени и денег
          </li>
        </ul>
      </div>
    </section>
  );
}
