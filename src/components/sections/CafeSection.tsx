export default function CafeSection() {
  return (
    <section className="h-screen flex items-center justify-end pr-20">
      <div className="text-white bg-black/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg">
        <h2 className="text-4xl font-bold mb-6">КАФЕ</h2>
        <p className="text-lg mb-4">
          Мы заботимся не только о вашем автомобиле, но и о вашем комфорте. Пока
          идёт обслуживание, вы можете насладиться вкусным обедом или чашкой
          кофе в нашем кафе на втором этаже.
        </p>
        <div className="border-t border-white/20 pt-4">
          <p className="text-sm text-gray-300">2 этаж</p>
        </div>
      </div>
    </section>
  );
}
