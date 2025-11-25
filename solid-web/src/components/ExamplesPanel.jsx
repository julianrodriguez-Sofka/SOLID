import { Code } from 'lucide-react'
import { useEffect, useState } from 'react'

const ispScenarios = [
  {
    id: 'correct',
    label: 'Patrón',
    title: 'ISP aplicado correctamente',
    subtitle: 'PastryStation depende únicamente de Baker',
    description:
      'El cliente solo conoce las operaciones de repostería; la implementación concreta `PastryChef` cumple el contrato sin exponer métodos innecesarios.',
    highlights: [
      '`Baker` define solo `bake_bread` y `make_pastries`.',
      '`PastryChef` implementa el contrato completo, nada más.',
      'La estación de postres depende de la abstracción, no de la concreción.',
    ],
    script: 'Escenario/isp/correct_scenario.py',
    commands: ['python Escenario/isp/correct_scenario.py'],
    snippet: `class Baker:
    def bake_bread(self):
        raise NotImplementedError

    def make_pastries(self):
        raise NotImplementedError


class PastryChef(Baker):
    def bake_bread(self):
        print("  PastryChef: Horneando pan especial para postres.")

    def make_pastries(self):
        print("  PastryChef: Elaborando pasteles para el menú.")
`,
  },
  {
    id: 'bad',
    label: 'Anti-Patrón',
    title: 'Interfaz monolítica',
    subtitle: 'MasterChefStation exige todas las habilidades',
    description:
      'MasterChefContract obliga a las implementaciones a conocer métodos que no usan, lo que provoca errores al incumplir responsabilidades.',
    highlights: [
      'La interfaz incluye métodos como `fillet_fish`, `cut_vegetables` y `mix_cocktails`.',
      '`PastryChefWithMasterContract` lanza errores en los métodos no necesarios.',
      'El cliente no puede evitar depender de operaciones que no necesita.',
    ],
    script: 'Escenario/isp/bad_scenario.py',
    commands: ['python Escenario/isp/bad_scenario.py'],
    snippet: `class MasterChefContract:
    def bake_bread(self):
        raise NotImplementedError

    def make_pastries(self):
        raise NotImplementedError

    def fillet_fish(self):
        raise NotImplementedError

    def cut_vegetables(self):
        raise NotImplementedError

    def mix_cocktails(self):
        raise NotImplementedError


class PastryChefWithMasterContract(MasterChefContract):
    def bake_bread(self):
        print("  PastryChefWithMasterContract: Horneando pan.")

    def make_pastries(self):
        print("  PastryChefWithMasterContract: Preparando pasteles.")

    def fillet_fish(self):
        raise RuntimeError("Este repostero no filetea pescado.")
`,
  },
  {
    id: 'missing',
    label: 'Sin Patrón',
    title: 'Sin interfaz, cliente dependiente',
    subtitle: 'PastryStationWithoutInterface conoce UniversalChef',
    description:
      'Al eliminar la abstracción, el cliente depende directamente de una clase que expone todas las responsabilidades del chef.',
    highlights: [
      'UniversalChef agrupa panadería, pesca, corte y coctelería.',
      'La estación de postres solo usa dos métodos, pero conoce toda la clase.',
      'Se pierde la capacidad de cambiar la implementación sin tocar el cliente.',
    ],
    script: 'Escenario/isp/missing_scenario.py',
    commands: ['python Escenario/isp/missing_scenario.py'],
    snippet: `class UniversalChef:
    def bake_bread(self):
        print("  UniversalChef: Horneando pan común.")

    def make_pastries(self):
        print("  UniversalChef: Haciendo pasteles tradicionales.")

    def fillet_fish(self):
        print("  UniversalChef: Fileteando pescado.")

    def cut_vegetables(self):
        print("  UniversalChef: Cortando vegetales.")

    def mix_cocktails(self):
        print("  UniversalChef: Mezclando cócteles.")
`,
  },
]

const srpScenarios = [
  {
    id: 'srp-pattern',
    label: 'Patrón',
    title: 'SRP bien aplicado',
    subtitle: 'Especialistas con responsabilidades únicas',
    description:
      'DessertChef, ReservationManager, DishWasher y MenuManager enfocan cada uno una única razón para cambiar mientras RestaurantOrchestrator coordina sin asumir tareas extra.',
    highlights: [
      'Cada clase tiene una responsabilidad única claramente documentada.',
      'RestaurantOrchestrator solo coordina, no implementa tareas.',
      'Cambios en reservas o carta no impactan a los demás especialistas.',
    ],
    script: 'Single Responsibility/Patron/Principio_aplicado_correctamente/ejemplo_correcto.py',
    commands: ['python "Single Responsibility/Patron/Principio_aplicado_correctamente/ejemplo_correcto.py"'],
    snippet: `class DessertChef:
    """Responsabilidad única: preparar postres."""
    def bake_dessert(self) -> None:
        print("[DessertChef] Preparando postre del día...")


class ReservationManager:
    """Responsabilidad única: gestionar reservas."""
    def take_reservation(self, nombre: str) -> None:
        print(f"[ReservationManager] Reserva registrada para {nombre}.")


class DishWasher:
    """Responsabilidad única: lavar platos."""
    def wash(self) -> None:
        print("[DishWasher] Lavando lote de platos...")


class MenuManager:
    """Responsabilidad única: actualizar la carta."""
    def update_menu(self, nuevo_postre: str) -> None:
        print(f"[MenuManager] Añadiendo postre al menú: {nuevo_postre}")


class RestaurantOrchestrator:
    """Coordina a los especialistas sin asumir sus responsabilidades."""
    def __init__(self, dessert: DessertChef, reservations: ReservationManager,
                 washer: DishWasher, menu: MenuManager) -> None:
        self._dessert = dessert
        self._reservations = reservations
        self._washer = washer
        self._menu = menu

    def run_shift(self) -> None:
        self._dessert.bake_dessert()
        self._reservations.take_reservation("Laura")
        self._menu.update_menu("Tarta de limón")
        self._washer.wash()
`,
  },
  {
    id: 'srp-anti',
    label: 'Anti-Patrón',
    title: 'OmniChef rompe el SRP',
    subtitle: 'Una sola clase asume todo',
    description:
      'OmniChef mezcla postres, reservas, carta y limpieza en una sola clase; cualquier cambio en un área obliga a tocar toda la clase.',
    highlights: [
      'La clase OmniChef implementa repostería, reservas, menú y limpieza.',
      'full_shift ejecuta todas las tareas en un solo flujo, dejando claro el acoplamiento.',
      'Un cambio en menú o reservas rompe la clase completa.',
    ],
    script: 'Single Responsibility/Anti-Patron/Mala_aplicacion/ejemplo_malo.py',
    commands: ['python "Single Responsibility/Anti-Patron/Mala_aplicacion/ejemplo_malo.py"'],
    snippet: `class OmniChef:
    """VIOLA SRP: múltiples razones de cambio en una sola clase."""

    def bake_dessert(self) -> None:
        print("[OmniChef] Preparando postre...")

    def take_reservation(self, nombre: str) -> None:
        print(f"[OmniChef] Tomando reserva de {nombre}...")

    def update_menu(self, nuevo_postre: str) -> None:
        print(f"[OmniChef] Añadiendo {nuevo_postre} al menú...")

    def wash_dishes(self) -> None:
        print("[OmniChef] Lavando platos...")

    def full_shift(self) -> None:
        self.bake_dessert()
        self.take_reservation("Carlos")
        self.update_menu("Mousse de chocolate")
        self.wash_dishes()
`,
  },
  {
    id: 'srp-procedural',
    label: 'Sin Patrón',
    title: 'Código procedural sin SRP',
    subtitle: 'Funciones globales mezclan tareas',
    description:
      'Funciones sueltas que orquestan postre, reservas, carta y limpieza sin clases ni responsables independientes, dificultando pruebas y reutilización.',
    highlights: [
      'No hay clases; todo está definido como funciones globales.',
      'turno_completo ejecuta todo el flujo sin separación.',
      'Cambios en reservas, menú o limpieza requieren revisar todo el script.',
    ],
    script: 'Single Responsibility/Falta_de_aplicacion/Sin_patron/ejemplo_sin_patron.py',
    commands: ['python "Single Responsibility/Falta_de_aplicacion/Sin_patron/ejemplo_sin_patron.py"'],
    snippet: `def preparar_postre():
    print("[Procedural] Preparando postre del día...")

def tomar_reserva(nombre: str):
    print(f"[Procedural] Registrando reserva para {nombre}...")

def actualizar_menu(postre: str):
    print(f"[Procedural] Actualizando menú con postre: {postre}")

def lavar_platos():
    print("[Procedural] Lavando lote de platos...")

def turno_completo():
    preparar_postre()
    tomar_reserva("María")
    actualizar_menu("Brownie vegano")
    lavar_platos()
`,
  },
]

const ExamplesPanel = ({ principle }) => {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0)
  const [activeSrpScenarioIndex, setActiveSrpScenarioIndex] = useState(0)

  useEffect(() => {
    if (!principle) return

    if (principle.short === 'ISP') {
      setActiveScenarioIndex(0)
    } else if (principle.short === 'SRP') {
      setActiveSrpScenarioIndex(0)
    }
  }, [principle])
  if (!principle) return null

  if (principle.short === 'ISP') {
    const activeScenario = ispScenarios[activeScenarioIndex]

    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600">
          <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Ejemplos de Implementación</span>
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Codigo del repertorio ISP</h3>
            <p className="text-gray-600 mb-3">Explora los scripts del directorio <code>Escenario/isp</code>.</p>
            <div className="flex flex-wrap gap-2">
              {ispScenarios.map((scenario, idx) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setActiveScenarioIndex(idx)}
                  className={`px-3 py-2 text-sm font-semibold rounded-full border transition ${
                    idx === activeScenarioIndex
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 bg-slate-100 text-slate-600'
                  }`}
                >
                  {scenario.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border border-slate-300 rounded-lg bg-slate-900 p-4 min-h-64">
            <div className="flex items-center justify-between mb-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <span className="text-slate-400 text-sm">example.py</span>
            </div>
            <div className="text-slate-300 text-sm font-mono leading-relaxed whitespace-pre-wrap">
              {activeScenario.snippet}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">{activeScenario.title}</p>
              <p className="text-xs uppercase tracking-wide text-slate-500">{activeScenario.subtitle}</p>
            </div>
            <p className="text-gray-700">{activeScenario.description}</p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {activeScenario.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            <div className="pt-4 border-t border-slate-200">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Script</div>
              <div className="bg-slate-900 text-xs text-emerald-300 font-mono px-3 py-1 rounded">
                {activeScenario.script}
              </div>
              <div className="text-xs uppercase tracking-wide text-slate-500 mt-3 mb-1">
                Cómo ejecutarlo
              </div>
              <div className="bg-slate-800 px-3 py-2 rounded space-y-1">
                {activeScenario.commands.map((command) => (
                  <div key={command} className="text-emerald-300 font-mono text-xs">
                    {command}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (principle.short === 'SRP') {
    const activeScenario = srpScenarios[activeSrpScenarioIndex]

    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600">
          <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Ejemplos de Implementación</span>
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Colección SRP</h3>
            <p className="text-gray-600 mb-3">Revisa los scripts del directorio <code>Single Responsibility</code>.</p>
            <div className="flex flex-wrap gap-2">
              {srpScenarios.map((scenario, idx) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setActiveSrpScenarioIndex(idx)}
                  className={`px-3 py-2 text-sm font-semibold rounded-full border transition ${
                    idx === activeSrpScenarioIndex
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 bg-slate-100 text-slate-600'
                  }`}
                >
                  {scenario.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border border-slate-300 rounded-lg bg-slate-900 p-4 min-h-64">
            <div className="flex items-center justify-between mb-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <span className="text-slate-400 text-sm">example.py</span>
            </div>
            <div className="text-slate-300 text-sm font-mono leading-relaxed whitespace-pre-wrap">
              {activeScenario.snippet}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">{activeScenario.title}</p>
              <p className="text-xs uppercase tracking-wide text-slate-500">{activeScenario.subtitle}</p>
            </div>
            <p className="text-gray-700">{activeScenario.description}</p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {activeScenario.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            <div className="pt-4 border-t border-slate-200">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Script</div>
              <div className="bg-slate-900 text-xs text-emerald-300 font-mono px-3 py-1 rounded">
                {activeScenario.script}
              </div>
              <div className="text-xs uppercase tracking-wide text-slate-500 mt-3 mb-1">
                Cómo ejecutarlo
              </div>
              <div className="bg-slate-800 px-3 py-2 rounded space-y-1">
                {activeScenario.commands.map((command) => (
                  <div key={command} className="text-emerald-300 font-mono text-xs">
                    {command}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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

