const PrincipleSidebar = ({ principles, activeIndex, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <h2 className="text-xl font-semibold text-white">Principios SOLID</h2>
        <p className="text-blue-100 text-sm mt-1">Fundamentos del diseño de software</p>
      </div>

      <nav className="divide-y divide-slate-100">
        {principles.map((principle, index) => {
          const isActive = activeIndex === index
          const Icon = principle.icon
          return (
            <button
              key={principle.id}
              type="button"
              onClick={() => onSelect(index)}
              className={`w-full px-6 py-4 text-left transition-all duration-200 hover:bg-slate-50 ${
                isActive ? 'bg-blue-50 border-l-4 border-blue-600' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div>
                  <h3
                    className={`font-medium ${
                      isActive ? 'text-blue-900' : 'text-gray-900'
                    }`}
                  >
                    {principle.short}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{principle.name}</p>
                </div>
              </div>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default PrincipleSidebar

