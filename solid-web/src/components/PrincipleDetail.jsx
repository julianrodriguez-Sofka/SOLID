const PrincipleDetail = ({ principle }) => {
  if (!principle) return null

  const Icon = principle.icon

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-slate-600 to-slate-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white">{principle.name}</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded-r-lg">
          <p className="text-blue-800 font-medium">{principle.description}</p>
        </div>

        <div className="prose prose-slate max-w-none">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Explicación Didáctica</h3>
          <p className="text-gray-700 leading-relaxed">{principle.explanation}</p>
        </div>
      </div>
    </div>
  )
}

export default PrincipleDetail

