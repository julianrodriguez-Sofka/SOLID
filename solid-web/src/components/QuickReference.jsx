import { ChevronRight } from 'lucide-react'

const quickBulletPoints = [
  'S - Responsabilidad Única',
  'O - Abierto/Cerrado',
  'L - Sustitución de Liskov',
  'I - Segregación de Interfaces',
  'D - Inversión de Dependencias',
]

const QuickReference = () => {
  return (
    <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Resumen</h3>
      <div className="space-y-3">
        {quickBulletPoints.map((label) => (
          <div key={label} className="flex items-start space-x-2">
            <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuickReference

