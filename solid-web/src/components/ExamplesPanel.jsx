import { Code } from 'lucide-react'

const ExamplesPanel = ({ principle }) => {
  if (!principle) return null

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600">
        <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
          <Code className="h-5 w-5" />
          <span>Ejemplos de Implementación</span>
        </h2>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Código de Ejemplo</h3>
          <p className="text-gray-600 mb-4">
            Aquí puedes agregar tus propios ejemplos de código que demuestren la aplicación del principio{' '}
            {principle.short}.
          </p>
        </div>

        <div className="border border-slate-300 rounded-lg bg-slate-900 p-4 min-h-64">
          <div className="flex items-center justify-between mb-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <span className="text-slate-400 text-sm">example.js</span>
          </div>
          <div className="text-slate-300 text-sm font-mono leading-relaxed">
            <div className="text-slate-500 italic">
              // Agrega aquí tu código de ejemplo para el principio {principle.short}
              {'\n'}// Este espacio está reservado para tus implementaciones
              {'\n'}// Puedes mostrar código bueno (siguiendo el principio)
              {'\n'}// y código malo (violando el principio) para comparar
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Notas y Observaciones</h3>
          <div className="border border-slate-300 rounded-lg p-4 min-h-32">
            <p className="text-gray-500 italic">
              Espacio para agregar notas adicionales, consideraciones importantes, o explicaciones detalladas sobre los
              ejemplos implementados.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamplesPanel

