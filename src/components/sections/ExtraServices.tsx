export default function ExtraServices() {
  return (
    <section className="h-screen flex flex-col items-center justify-center">
      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 max-w-7xl">
        <h2 className="custom-extraservices-hero-text font-bold mb-21 text-white ">
          ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ
        </h2>
        <div className="flex flex-row">
          <div className="text-white bg-black/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-5">
            <h2 className="text-4xl font-bold mb-6">ДЕТЕЙЛИНГ</h2>
            <p className="text-lg mb-4">
              Мы используем только проверенные технологии и материалы, чтобы
              обеспечить долговечный и безупречный результат
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Полировка кузова
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Керамическая защита
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Автомойка
              </li>
            </ul>
          </div>
          <div className="text-white bg-black/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-5">
            <h2 className="text-4xl font-bold mb-6">ДООСНАЩЕНИЕ</h2>
            <p className="text-lg mb-4">
              Мы используем профессиональные полировальные машины, аппараты
              высокого давления, пылесосы, парогенераторы и многое другое
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Автосигнализации с автозапуском
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Электромеханический замок
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Мониторы на системе &ldquo;Андройд&rdquo;
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Программный чип тюнинг
              </li>
            </ul>
          </div>
          <div className="text-white bg-black/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-5">
            <h2 className="text-4xl font-bold mb-6">РЕСТАЙЛИНГ</h2>
            <p className="text-lg mb-4">
              Наиболее часто встречаются изменения затрагивающие:
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Переднюю или заднюю оптику
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Решетку радиатора
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Бамперы
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3">•</span>
                Дизайн легкосплавных дисков
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
