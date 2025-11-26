import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import PrincipleSidebar from './components/PrincipleSidebar'
import QuickReference from './components/QuickReference'
import PrincipleDetail from './components/PrincipleDetail'
import ExamplesPanel from './components/ExamplesPanel'
import BenefitsSection from './components/BenefitsSection'
import TestingLevelsSection from './components/TestingLevelsSection'
import TestingLevelsSidebarCard from './components/TestingLevelsSidebarCard'
import { principles } from './data/principles'

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activePrinciple = principles[activeIndex] ?? principles[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Principios SOLID</h1>
              <p className="text-gray-600 mt-1">
                Guía didáctica para el diseño de software orientado a objetos
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <PrincipleSidebar
              principles={principles}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />
            <QuickReference />
            <TestingLevelsSidebarCard />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <PrincipleDetail principle={activePrinciple} />
            <ExamplesPanel principle={activePrinciple} />
            <BenefitsSection principle={activePrinciple} />
          </div>
        </div>
      </main>
      <section id="niveles-de-prueba" className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <TestingLevelsSection />
        </div>
      </section>
    </div>
  )
}

export default App
