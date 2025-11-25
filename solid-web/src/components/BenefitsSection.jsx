const benefits = [
  'Mejora la mantenibilidad del código',
  'Facilita las pruebas unitarias',
  'Reduce el acoplamiento entre componentes',
  'Aumenta la reutilización del código',
]

const BenefitsSection = ({ principle }) => {
  if (!principle) return null

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Beneficios de Aplicar {principle.short}
      </h3>
      <ul className="space-y-2">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span className="text-gray-700">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BenefitsSection

