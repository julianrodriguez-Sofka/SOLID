const testingLevels = [
  {
    id: 'unit',
    title: 'Pruebas Unitarias o de Módulo',
    summary:
      'Primera barrera de calidad, centrada en asegurar que la mínima porción funcional cumple con sus requisitos.',
    details: [
      {
        label: 'Enfoque',
        text: 'Validar cada componente o unidad aislada en el código para verificar su comportamiento esperado.',
      },
      {
        label: 'Objetivo',
        text: 'Confirmar que cada unidad funciona correctamente antes de integrarla en decisiones más grandes.',
      },
      {
        label: 'Ejecutor',
        text: 'Principalmente el desarrollador responsable del código del componente.',
      },
      {
        label: 'Ventaja',
        text: 'Detecta errores muy temprano, reduciendo riesgos, tiempo y costos de retrabajo posteriores.',
      },
      {
        label: 'Automatización',
        text: 'Muy recomendable; muchas suites de pruebas unitarias se ejecutan automáticamente en cada rama.',
      },
    ],
  },
  {
    id: 'integration',
    title: 'Pruebas de Integración',
    summary:
      'Combina módulos o servicios para evaluar cómo intercambian datos y comportamiento bajo interacción real.',
    details: [
      {
        label: 'Enfoque',
        text: 'Unir componentes o fases del sistema y evaluar sus interacciones ensambladas.',
      },
      {
        label: 'Objetivo',
        text: 'Detectar errores en la integración entre módulos, APIs o capas de presentación y datos.',
      },
      {
        label: 'Ejecutor',
        text: 'Usualmente testers y, en ocasiones, desarrolladores expertos en integración.',
      },
      {
        label: 'Detalles',
        text: 'Verifica flujos como front-end llamando a back-end y la correcta visualización de datos traídos de APIs.',
      },
    ],
  },
  {
    id: 'system',
    title: 'Pruebas del Sistema',
    summary:
      'Se evalúa la aplicación completa en un entorno muy cercano a producción para revisar su comportamiento global.',
    details: [
      {
        label: 'Enfoque',
        text: 'Analizar el sistema entero en conjunto, incluyendo dependencias externas y flujos completos.',
      },
      {
        label: 'Objetivo',
        text: 'Garantizar que el sistema cumple con las especificaciones funcionales y no funcionales.',
      },
      {
        label: 'Ejecutor',
        text: 'Testers especializados y herramientas de automatización bajo entornos controlados.',
      },
      {
        label: 'Detalles',
        text: 'Incluye pruebas de carga, confiabilidad, rendimiento y seguridad antes del paso final.',
      },
    ],
  },
  {
    id: 'system-integration',
    title: 'Pruebas de Integración del Sistema',
    summary:
      'Confirman que el sistema completo coopera correctamente con otros sistemas, infraestructuras o servicios según los criterios ISTQB.',
    details: [
      {
        label: 'Enfoque',
        text: 'Evaluar las interfaces, protocolos y contratos que permiten que el sistema interactúe con entornos externos y plataformas hermanas.',
      },
      {
        label: 'Objetivo',
        text: 'Detectar rupturas en flujos transaccionales, sincronización de datos o comunicaciones con sistemas legado antes de que lleguen a producción.',
      },
      {
        label: 'Ejecutor',
        text: 'Equipos de QA junto a arquitectos e ingenieros de infraestructura que supervisan mallas de integración complejas.',
      },
      {
        label: 'Alcance',
        text: 'Incluye intercambios de datos externos, conectividad con APIs, mensajería, middleware y dependencias de terceros.',
      },
      {
        label: 'Valor',
        text: 'Reduce riesgos en despliegues multi-sistema y asegura la fiabilidad de las integraciones críticas.',
      },
    ],
  },
  {
    id: 'acceptance',
    title: 'Pruebas de Aceptación',
    summary:
      'Etapa final para validar que el sistema responde a las expectativas del usuario antes del lanzamiento.',
    details: [
      {
        label: 'Enfoque',
        text: 'Evaluar el comportamiento global frente a criterios de aceptación definidos por stakeholders.',
      },
      {
        label: 'Objetivo',
        text: 'Determinar si el sistema está listo para ser implementado en el entorno del usuario final.',
      },
      {
        label: 'Ejecutor',
        text: 'Usuarios finales, clientes o áreas operativas, e incluso auditores externos.',
      },
      {
        label: 'Alcance',
        text: 'Incluye funcionalidad, rendimiento, usabilidad, compatibilidad, accesibilidad, seguridad y confiabilidad.',
      },
      {
        label: 'Tipos',
        text: 'Alfa y beta para recopilar comentarios tempranos y escenarios escritos por testers.',
      },
    ],
  },
]

const analogySteps = [
  'Unidad: cada tuerca, sensor y pieza se revisa individualmente.',
  'Integración: se verifica que motor, transmisión y frenos hablen entre sí.',
  'Sistema: el automóvil completo se prueba en pista, midiendo desempeño y seguridad.',
  'Integración del sistema: se confirma que el coche se comunica con centros de control, servicios en la nube y otras máquinas.',
  'Aceptación: un cliente lo conduce para confirmar que cumple sus necesidades reales.',
]

const pyramidLevels = [
  {
    label: 'Pruebas Unitarias',
    description: 'Base que se automatiza con frecuencia para validar cada unidad o clase.',
    width: 'w-full',
  },
  {
    label: 'Pruebas de Integración de Componentes',
    description: 'Verifica módulos combinados para garantizar que colaboran correctamente.',
    width: 'w-5/6',
  },
  {
    label: 'Pruebas del Sistema',
    description: 'Evalúa el comportamiento completo del sistema en un entorno realista.',
    width: 'w-2/3',
  },
  {
    label: 'Pruebas de Integración del Sistema',
    description: 'Comprueba interoperabilidad con otros sistemas y servicios externos.',
    width: 'w-1/2',
  },
  {
    label: 'Pruebas de Aceptación',
    description: 'Validación final con usuarios para confirmar el valor de negocio.',
    width: 'w-1/3',
  },
]

const TestingLevelsSection = () => {
  return (
    <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 space-y-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">Niveles de pruebas</p>
        <h3 className="text-2xl font-semibold text-gray-900">Estructura recomendada para validar la calidad</h3>
        <p className="text-gray-600">
          Los niveles de pruebas de software agrupan las fases del ciclo de vida (SDLC) según ISTQB, con el objetivo
          de hacer las pruebas más eficientes, organizadas y enfocadas en riesgos específicos de cada componente o
          sistema. Los cinco niveles considerados son: Pruebas Unitarias, Integración de Componentes, Sistema,
          Integración del Sistema y Aceptación.
        </p>
        <p className="text-gray-600">
          Cada nivel puede ejecutar tanto pruebas funcionales como no funcionales, manteniendo la trazabilidad y la
          capacidad de localizar escenarios en etapas concretas, incluida la colaboración del sistema con otros entornos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {testingLevels.map((level) => (
          <article
            key={level.id}
            className="bg-gradient-to-br from-blue-50/70 to-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-gray-900">{level.title}</h4>
              <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">ISTQB</span>
            </div>
            <p className="text-sm text-gray-600">{level.summary}</p>
            <dl className="space-y-2 text-sm text-gray-700">
              {level.details.map((detail) => (
                <div key={detail.label} className="flex flex-col">
                  <dt className="text-xs font-semibold tracking-wide uppercase text-slate-500">{detail.label}</dt>
                  <dd className="">{detail.text}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5 space-y-2">
        <h4 className="text-lg font-semibold text-blue-900">Secuencia e importancia</h4>
        <p className="text-sm text-blue-900">
          El orden sugerido es: Pruebas Unitarias, Integración de Componentes, Sistema, Integración del Sistema y
          Aceptación. Cada nivel fortalece al anterior y permite detectar defectos cuando son más fáciles (y baratos)
          de corregir. Todos los niveles se deben completar antes del lanzamiento para evitar sorpresas en producción.
        </p>
        <p className="text-sm text-blue-900">
          Una vigilancia constante y una aproximación sistemática ayudan a cubrir la mayor cantidad de escenarios
          posibles dentro de cada etapa.
        </p>
      </div>

      <div className="bg-gradient-to-br from-slate-100 via-white to-slate-100 border border-slate-200 rounded-2xl p-5 space-y-3">
        <h4 className="text-lg font-semibold text-gray-900">Pirámide de niveles de prueba según ISTQB</h4>
        <p className="text-sm text-gray-600">
          La pirámide muestra un equilibrio saludable: muchas pruebas en la base (que está en la parte inferior, con pruebas
          unitarias) y una reducción gradual hacia la cúspide (aceptación), manteniendo siempre la integración del sistema
          para garantizar interoperabilidad.
        </p>
        <div className="space-y-2">
          {[...pyramidLevels].reverse().map((level) => (
            <div
              key={level.label}
              className={`mx-auto ${level.width} rounded-2xl bg-blue-50 border border-blue-100 px-4 py-2 shadow-sm`}
            >
              <div className="flex items-center justify-between text-sm text-blue-900">
                <span className="font-semibold">{level.label}</span>
                <span className="text-xs font-medium uppercase tracking-wide text-blue-500">ISTQB</span>
              </div>
              <p className="text-[0.75rem] text-blue-700 mt-1">{level.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 space-y-2">
        <h4 className="text-lg font-semibold text-gray-900">Analogía: fabricación de un automóvil</h4>
        <p className="text-sm text-gray-600">
          Imagínate el proceso de fabricar un coche para entender cuándo aplicas cada nivel de prueba.
        </p>
        <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
          {analogySteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default TestingLevelsSection

