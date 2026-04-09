"use client";

import { useState } from "react";

type Unit = "metric" | "imperial";

interface BmiResult {
  value: number;
  category: string;
  color: string;
  advice: string;
  min: number;
  max: number;
}

function calcBmi(weight: number, height: number): number {
  return weight / (height * height);
}

function getCategory(bmi: number): BmiResult["category"] {
  if (bmi < 18.5) return "Bajo peso";
  if (bmi < 25) return "Peso normal";
  if (bmi < 30) return "Sobrepeso";
  if (bmi < 35) return "Obesidad grado I";
  if (bmi < 40) return "Obesidad grado II";
  return "Obesidad grado III";
}

function getColor(bmi: number): string {
  if (bmi < 18.5) return "text-blue-600";
  if (bmi < 25) return "text-green-600";
  if (bmi < 30) return "text-yellow-600";
  return "text-red-600";
}

function getBgColor(bmi: number): string {
  if (bmi < 18.5) return "bg-blue-50 border-blue-200";
  if (bmi < 25) return "bg-green-50 border-green-200";
  if (bmi < 30) return "bg-yellow-50 border-yellow-200";
  return "bg-red-50 border-red-200";
}

function getAdvice(bmi: number): string {
  if (bmi < 18.5)
    return "Tu peso está por debajo del rango saludable. Consulta con un nutricionista para alcanzar un peso adecuado.";
  if (bmi < 25)
    return "¡Excelente! Tu peso está dentro del rango saludable. Sigue manteniendo tus hábitos alimenticios y actividad física.";
  if (bmi < 30)
    return "Tu peso está ligeramente por encima del rango saludable. Una dieta balanceada y ejercicio regular pueden ayudarte.";
  return "Tu peso indica obesidad. Se recomienda consultar a un médico para recibir orientación personalizada.";
}

function getIdealRange(heightM: number): { min: number; max: number } {
  return {
    min: Math.round(18.5 * heightM * heightM * 10) / 10,
    max: Math.round(24.9 * heightM * heightM * 10) / 10,
  };
}

const TABLE_ROWS = [
  { range: "Menos de 18.5", category: "Bajo peso", color: "bg-blue-100 text-blue-800" },
  { range: "18.5 – 24.9", category: "Peso normal", color: "bg-green-100 text-green-800" },
  { range: "25 – 29.9", category: "Sobrepeso", color: "bg-yellow-100 text-yellow-800" },
  { range: "30 – 34.9", category: "Obesidad grado I", color: "bg-orange-100 text-orange-800" },
  { range: "35 – 39.9", category: "Obesidad grado II", color: "bg-red-100 text-red-800" },
  { range: "40 o más", category: "Obesidad grado III", color: "bg-red-200 text-red-900" },
];

export default function BmiCalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [weight, setWeight] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLb, setWeightLb] = useState("");
  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    setError("");
    setResult(null);

    let weightKg: number;
    let heightM: number;

    if (unit === "metric") {
      weightKg = parseFloat(weight);
      const cm = parseFloat(heightCm);
      if (!weightKg || !cm || weightKg <= 0 || cm <= 0) {
        setError("Por favor ingresa valores válidos de peso y altura.");
        return;
      }
      heightM = cm / 100;
    } else {
      const lb = parseFloat(weightLb);
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      if (!lb || lb <= 0 || (ft === 0 && inches === 0)) {
        setError("Por favor ingresa valores válidos de peso y altura.");
        return;
      }
      weightKg = lb * 0.453592;
      heightM = (ft * 12 + inches) * 0.0254;
    }

    const bmi = calcBmi(weightKg, heightM);
    if (bmi < 5 || bmi > 100) {
      setError("Los valores ingresados no parecen correctos. Verifica tu peso y altura.");
      return;
    }

    const ideal = getIdealRange(heightM);
    setResult({
      value: Math.round(bmi * 10) / 10,
      category: getCategory(bmi),
      color: getColor(bmi),
      advice: getAdvice(bmi),
      min: ideal.min,
      max: ideal.max,
    });
  }

  function handleReset() {
    setResult(null);
    setError("");
    setWeight("");
    setHeightCm("");
    setHeightFt("");
    setHeightIn("");
    setWeightLb("");
  }

  const bmiPercent = result
    ? Math.min(Math.max(((result.value - 10) / (45 - 10)) * 100, 0), 100)
    : null;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Unit toggle */}
      <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <button
          onClick={() => { setUnit("metric"); handleReset(); }}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            unit === "metric"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Métrico (kg / cm)
        </button>
        <button
          onClick={() => { setUnit("imperial"); handleReset(); }}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            unit === "imperial"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Imperial (lb / ft)
        </button>
      </div>

      {/* Inputs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
        {unit === "metric" ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Peso</label>
              <div className="relative">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                  min="1"
                  max="500"
                  className="w-full pr-12 pl-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">kg</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Altura</label>
              <div className="relative">
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  placeholder="170"
                  min="50"
                  max="300"
                  className="w-full pr-12 pl-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">cm</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Peso</label>
              <div className="relative">
                <input
                  type="number"
                  value={weightLb}
                  onChange={(e) => setWeightLb(e.target.value)}
                  placeholder="154"
                  min="1"
                  className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">lb</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Altura (pies)</label>
              <div className="relative">
                <input
                  type="number"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  placeholder="5"
                  min="0"
                  max="9"
                  className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">ft</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Pulgadas</label>
              <div className="relative">
                <input
                  type="number"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  placeholder="7"
                  min="0"
                  max="11"
                  className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">in</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>
        )}

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors text-lg shadow-sm"
        >
          Calcular IMC
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className={`rounded-2xl border-2 p-6 space-y-4 ${getBgColor(result.value)}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tu IMC es</p>
              <p className={`text-5xl font-bold ${result.color}`}>{result.value}</p>
            </div>
            <div className="text-right">
              <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${result.color} bg-white/60`}>
                {result.category}
              </span>
              <p className="text-xs text-gray-500 mt-2">
                Peso ideal: {result.min}–{result.max} kg
              </p>
            </div>
          </div>

          {/* Gauge bar */}
          <div className="space-y-1">
            <div className="h-3 rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500 relative">
              {bmiPercent !== null && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-700 rounded-full shadow"
                  style={{ left: `calc(${bmiPercent}% - 8px)` }}
                />
              )}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>10</span><span>18.5</span><span>25</span><span>30</span><span>40+</span>
            </div>
          </div>

          <p className="text-sm text-gray-700">{result.advice}</p>

          <button
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Calcular de nuevo
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Tabla de categorías IMC</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-600">IMC</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Categoría</th>
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((row) => (
              <tr key={row.category} className="border-t border-gray-100">
                <td className="px-6 py-3 text-gray-700">{row.range}</td>
                <td className="px-6 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${row.color}`}>
                    {row.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
