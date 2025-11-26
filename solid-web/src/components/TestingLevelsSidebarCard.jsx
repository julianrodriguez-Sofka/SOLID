const TestingLevelsSidebarCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <p className="text-xs uppercase tracking-wide text-blue-100">Tema relacionado</p>
        <h2 className="text-xl font-semibold text-white">Niveles de Prueba</h2>
        <p className="text-blue-100 text-sm mt-1">
          Avanza hacia la explicación completa del ciclo de validación de pruebas.
        </p>
      </div>

      <div className="px-6 py-4 space-y-3">
        <p className="text-sm text-gray-700">
          Encuentra cómo se estructuran las pruebas de unidad, integración, sistema y aceptación según el ISTQB.
        </p>
        <a
          href="#niveles-de-prueba"
          className="inline-flex items-center justify-center w-full rounded-lg border border-blue-600 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-900 transition hover:bg-blue-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          Ir a Niveles de Prueba
        </a>
      </div>
    </div>
  )
}

export default TestingLevelsSidebarCard

