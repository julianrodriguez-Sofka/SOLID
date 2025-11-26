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

const dipScenarios = [
  {
    id: 'dip-good',
    label: 'Patrón',
    title: 'DIP aplicado correctamente',
    subtitle: 'OrderManager depende de la abstracción ChefContract',
    description:
      'La clase de alto nivel no conoce los detalles del repostero; todo pasa por el contrato `ChefContract` y la dependencia se inyecta desde afuera.',
    highlights: [
      'OrderManager recibe la dependencia en el constructor y solo llama a `prepare_dish`.',
      '`PastryChef` implementa `ChefContract` sin exponer lógica adicional a OrderManager.',
      'Puedes intercambiar chefs sin tocar la clase de alto nivel ni violar DIP.',
    ],
    script: 'Escenario/dip/good_scenario.py',
    commands: ['python Escenario/dip/good_scenario.py'],
    snippet: `class ChefContract:
    def prepare_dish(self):
        raise NotImplementedError


class PastryChef(ChefContract):
    def prepare_dish(self):
        print("  PastryChef: Preparando el postre solicitado.")


class OrderManager:
    def __init__(self, chef: ChefContract):
        self._chef = chef

    def process_order(self):
        print("OrderManager: Recibí una orden, delego al cocinero.")
        self._chef.prepare_dish()
`,
  },
  {
    id: 'dip-bad',
    label: 'Anti-Patrón',
    title: 'Dependencia rígida',
    subtitle: 'OrderManager crea internamente al chef',
    description:
      'La clase de alto nivel construye directamente el repostero y conoce los detalles concretos, lo que impide pruebas aisladas y extensiones.',
    highlights: [
      'OrderManager no recibe ninguna abstracción; la crea internamente.',
      'La clase queda atada a `PastryChef` y no hay punto para inyectar otro comportamiento.',
      'Violación del DIP y del OCP porque cambiar el chef obliga a editar el alto nivel.',
    ],
    script: 'Escenario/dip/bad_scenario.py',
    commands: ['python Escenario/dip/bad_scenario.py'],
    snippet: `class PastryChef:
    def prepare_dish(self):
        print("  PastryChef: Preparando un postre desde dentro de OrderManager.")


class OrderManager:
    def process_order(self):
        print("OrderManager: Recibí una orden y creo yo al chef (dependencia rígida).")
        chef = PastryChef()
        chef.prepare_dish()
`,
  },
  {
    id: 'dip-missing',
    label: 'Sin abstracción',
    title: 'Inyección sin interfaz',
    subtitle: 'OrderManager depende de la clase concreta',
    description:
      'La dependencia se inyecta, pero ambas capas siguen dependiendo de `PastryChef`, por lo que no se puede cambiar la implementación sin modificar la clase de alto nivel.',
    highlights: [
      'OrderManager recibe el chef desde afuera, pero conoce la clase concreta.',
      'No hay contrato compartido, así que la inversión de dependencias nunca se completa.',
      'Se mantiene acoplamiento y falta la capacidad de sustituir implementaciones.',
    ],
    script: 'Escenario/dip/missing_scenario.py',
    commands: ['python Escenario/dip/missing_scenario.py'],
    snippet: `class PastryChef:
    def prepare_dish(self):
        print("  PastryChef: Haciendo un postre personalizado.")


class OrderManager:
    def __init__(self, chef: PastryChef):
        self._chef = chef

    def process_order(self):
        print("OrderManager: La dependencia viene desde afuera, pero sigo acoplado a PastryChef.")
        self._chef.prepare_dish()
`,
  },
]

const ocpScenarios = [
  {
    id: 'ocp-pattern',
    label: 'Patrón',
    title: 'OCP bien aplicado',
    subtitle: 'ChefRepostero abierto a nuevas recetas',
    description:
      'Se define un contrato abstracto `PreparacionDePostre` y el chef trabaja con la abstracción; las extensiones (PastelDeFresas, SouffleChocolate) se agregan sin modificar al chef.',
    highlights: [
      'El chef solo depende de la interfaz `PreparacionDePostre`. ',
      'Nuevos postres se agregan creando nuevas clases, sin tocar al chef.',
      'OCP se cumple porque el módulo está cerrado a modificaciones pero abierto a extensiones.',
    ],
    script: 'OpenClose/Python_Patron/ocp_correcto.py',
    commands: ['python "OpenClose/Python_Patron/ocp_correcto.py"'],
    snippet: `class PreparacionDePostre(ABC):
    @abstractmethod
    def tiempo_coccion(self):
        pass

    @abstractmethod
    def ingredientes(self):
        pass

    @abstractmethod
    def presentar(self):
        pass


class ChefRepostero:
    def preparar(self, receta: PreparacionDePostre):
        print("⏱️ Tiempo de cocción:", receta.tiempo_coccion())
        print("🧾 Ingredientes:", receta.ingredientes())
        print("🍰 Presentación:", receta.presentar())
`,
  },
  {
    id: 'ocp-anti',
    label: 'Anti-Patrón',
    title: 'Chef rígido',
    subtitle: 'Condicionales por tipo concreto',
    description:
      'El chef inspecciona tipos concretos (`PastelFresa`, `SouffleChocolate`) con condicionales; cada nuevo postre exige tocar el mismo método, rompiendo OCP.',
    highlights: [
      'El flujo de preparación se basa en `isinstance`, no en abstracciones.',
      'Para añadir un nuevo postre hay que modificar el método `preparar` del chef.',
      'La clase se modifica frecuentemente; no está abierta a extensiones.',
    ],
    script: 'OpenClose/Ejemplo_AntiPatron/ocp_antipatron.py',
    commands: ['python "OpenClose/Ejemplo_AntiPatron/ocp_antipatron.py"'],
    snippet: `class ChefRepostero:
    def preparar(self, receta):
        if isinstance(receta, PastelFresa):
            print("Preparando pastel de fresa...")
        elif isinstance(receta, SouffleChocolate):
            print("Preparando soufflé de chocolate...")
        else:
            print("Postre no soportado")


class PastelFresa(PreparacionDePostre):
    pass

class SouffleChocolate(PreparacionDePostre):
    pass
`,
  },
  {
    id: 'ocp-sin',
    label: 'Sin Patrón',
    title: 'Funciones específicas',
    subtitle: 'Chef con métodos específicos por postre',
    description:
      'El chef implementa métodos concretos por cada postre y un único método `preparar` que usa condicionales o cadenas; todo está cerrado a extensiones sin tocar la clase.',
    highlights: [
      'Se añaden métodos nuevos al chef cada vez que llega un nuevo tipo de postre.',
      'La lógica de negocio se mezcla con la selección de recetas.',
      'El módulo no se puede extender sin modificación; OCP no se cumple.',
    ],
    script: 'OpenClose/Ejemplo_SinPatron/ocp_sin_patron.py',
    commands: ['python "OpenClose/Ejemplo_SinPatron/ocp_sin_patron.py"'],
    snippet: `class ChefRepostero:
    def preparar_pastel_fresas(self):
        print("Preparando pastel de fresas con ingredientes fijos...")

    def preparar_souffle_chocolate(self):
        print("Preparando soufflé de chocolate con ingredientes fijos...")

    def preparar(self, tipo_postre):
        if tipo_postre == "fresas":
            self.preparar_pastel_fresas()
        elif tipo_postre == "souffle":
            self.preparar_souffle_chocolate()
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

const lspScenarios = [
  {
    id: 'lsp-good',
    label: 'Patrón',
    title: 'LSP respetado',
    subtitle: 'ChefEspecialista extiende sin romper la promesa',
    description:
      'El chef especializado sigue devolviendo un string y el cliente puede tratarlo como tal; el subtipo cumple con la interfaz del padre.',
    highlights: [
      'El contrato `Chef.preparar_plato` sigue prometiendo un string.',
      'ChefEspecialista agrega detalles pero mantiene el tipo devuelto.',
      'Servir_plato funciona con cualquier subtipo que mantenga esa promesa.',
    ],
    script: 'Liskov Substitution Principle/Ejemplo_PatronCorrecto/liskov_correcto.py',
    commands: ['python "Liskov Substitution Principle/Ejemplo_PatronCorrecto/liskov_correcto.py"'],
    snippet: `class Chef:
    def preparar_plato(self):
        return "Plato caliente"


class ChefEspecialista(Chef):
    def preparar_plato(self):
        plato_base = super().preparar_plato()
        return plato_base + " con especias especiales"


def servir_plato(chef: Chef):
    plato = chef.preparar_plato()
    print("Sirviendo:", plato.upper())
`,
  },
  {
    id: 'lsp-anti',
    label: 'Anti-Patrón',
    title: 'Rompe la promesa',
    subtitle: 'ChefVegetariano devuelve `None`',
    description:
      'La subclase rompe la expectativa: el padre promete un string, el hijo entrega `None`, y el cliente se derrumba al llamar a `.upper()`.',
    highlights: [
      'El método del subtipo no respeta el tipo retornado.',
      'Los tipos derivados deben ser intercambiables sin errores.',
      'Aquí el código se cae en tiempo de ejecución (violación directa de LSP).',
    ],
    script: 'Liskov Substitution Principle/Ejemplo_AntiPatron/liskov_malo.py',
    commands: ['python "Liskov Substitution Principle/Ejemplo_AntiPatron/liskov_malo.py"'],
    snippet: `class Chef:
    def preparar_plato(self):
        return "Plato caliente listo"


class ChefVegetariano(Chef):
    def preparar_plato(self):
        return None


def servir_plato(chef: Chef):
    plato = chef.preparar_plato()
    print("Sirviendo:", plato.upper())
`,
  },
  {
    id: 'lsp-sin',
    label: 'Sin Patrón',
    title: 'Cambia la estructura',
    subtitle: 'ChefGourmet devuelve dict',
    description:
      'El subtipo retorna un diccionario en lugar de un string, rompiendo las expectativas del código cliente que ya asume un string.',
    highlights: [
      'Los clientes asumen un tipo concreto y fallan al recibir otra cosa.',
      'La sustitución solo funciona si el subtipo mantiene el contrato original.',
      'La clase pasa a ser incompatible con quien depende de la clase base.',
    ],
    script: 'Liskov Substitution Principle/Ejemplo_SinPatron/liskov_sin_aplicar.py',
    commands: ['python "Liskov Substitution Principle/Ejemplo_SinPatron/liskov_sin_aplicar.py"'],
    snippet: `class Chef:
    def preparar_plato(self):
        return "Plato caliente"


class ChefGourmet(Chef):
    def preparar_plato(self):
        return {
            "plato": "Plato caliente",
            "decoracion": "Flores comestibles"
        }


def servir_plato(chef: Chef):
    plato = chef.preparar_plato()
    print("LONGITUD DEL PLATO:", len(plato))
`,
  },
]

const ExamplesPanel = ({ principle }) => {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0)
  const [activeSrpScenarioIndex, setActiveSrpScenarioIndex] = useState(0)
  const [activeDipScenarioIndex, setActiveDipScenarioIndex] = useState(0)
  const [activeOcpScenarioIndex, setActiveOcpScenarioIndex] = useState(0)
  const [activeLspScenarioIndex, setActiveLspScenarioIndex] = useState(0)

  useEffect(() => {
    if (!principle) return

    if (principle.short === 'ISP') {
      setActiveScenarioIndex(0)
    } else if (principle.short === 'SRP') {
      setActiveSrpScenarioIndex(0)
    } else if (principle.short === 'OCP') {
      setActiveOcpScenarioIndex(0)
    } else if (principle.short === 'DIP') {
      setActiveDipScenarioIndex(0)
    } else if (principle.short === 'LSP') {
      setActiveLspScenarioIndex(0)
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

  if (principle.short === 'DIP') {
    const activeScenario = dipScenarios[activeDipScenarioIndex]

    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600">
          <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Ejemplos de Implementación</span>
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Repertorio DIP</h3>
            <p className="text-gray-600 mb-3">Explora los scripts del directorio <code>Escenario/dip</code>.</p>
            <div className="flex flex-wrap gap-2">
              {dipScenarios.map((scenario, idx) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setActiveDipScenarioIndex(idx)}
                  className={`px-3 py-2 text-sm font-semibold rounded-full border transition ${
                    idx === activeDipScenarioIndex
                      ? 'border-amber-600 bg-amber-50 text-amber-700'
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

  if (principle.short === 'OCP') {
    const activeScenario = ocpScenarios[activeOcpScenarioIndex]

    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600">
          <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Ejemplos de Implementación</span>
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Línea de fuego OCP</h3>
            <p className="text-gray-600 mb-3">Repasa los scripts en <code>OpenClose</code> que ilustran cada caso.</p>
            <div className="flex flex-wrap gap-2">
              {ocpScenarios.map((scenario, idx) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setActiveOcpScenarioIndex(idx)}
                  className={`px-3 py-2 text-sm font-semibold rounded-full border transition ${
                    idx === activeOcpScenarioIndex
                      ? 'border-fuchsia-600 bg-fuchsia-50 text-fuchsia-700'
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

  if (principle.short === 'LSP') {
    const activeScenario = lspScenarios[activeLspScenarioIndex]

    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-teal-600 to-blue-600">
          <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Ejemplos de Implementación</span>
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Colección LSP</h3>
            <p className="text-gray-600 mb-3">Revisa los scripts del directorio <code>Liskov Substitution Principle</code>.</p>
            <div className="flex flex-wrap gap-2">
              {lspScenarios.map((scenario, idx) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setActiveLspScenarioIndex(idx)}
                  className={`px-3 py-2 text-sm font-semibold rounded-full border transition ${
                    idx === activeLspScenarioIndex
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
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

