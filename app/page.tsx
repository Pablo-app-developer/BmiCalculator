import BmiCalculator from "./components/BmiCalculator";
import AdBanner from "./components/AdBanner";

export default function Home() {
  return (
    <main className="flex-1 px-4 py-10 max-w-2xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Calculadora de IMC
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Calcula tu <strong>Índice de Masa Corporal</strong> gratis. Ingresa tu
          peso y altura para conocer si estás en tu peso ideal.
        </p>
      </div>

      {/* Ad — top */}
      <AdBanner slot="1234567890" />

      {/* Calculator */}
      <BmiCalculator />

      {/* Ad — bottom */}
      <AdBanner slot="0987654321" />

      {/* SEO content */}
      <section className="text-gray-600 space-y-3 pt-4 border-t border-gray-200 text-sm">
        <h2 className="text-base font-semibold text-gray-800">¿Qué es el IMC?</h2>
        <p>
          El <strong>Índice de Masa Corporal (IMC)</strong> es una medida que
          relaciona el peso y la altura de una persona para estimar si su peso
          es saludable. Se calcula dividiendo el peso en kilogramos entre el
          cuadrado de la altura en metros.
        </p>
        <h2 className="text-base font-semibold text-gray-800">¿Cómo se calcula?</h2>
        <p>
          La fórmula es: <strong>IMC = peso (kg) / altura² (m)</strong>. Por
          ejemplo, una persona de 70 kg y 1.70 m tiene un IMC de 70 / (1.70 ×
          1.70) = 24.2, que está dentro del rango normal.
        </p>
        <p className="text-xs text-gray-400">
          Nota: El IMC es una estimación general y no reemplaza la opinión de un
          profesional de la salud.
        </p>
      </section>
    </main>
  );
}
