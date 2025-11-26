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
  'Aceptación: un cliente lo conduce para confirmar que cumple sus necesidades reales.',
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
          sistema.
        </p>
        <p className="text-gray-600">
          Cada nivel puede ejecutar tanto pruebas funcionales como no funcionales, manteniendo la trazabilidad y la
          capacidad de localizar escenarios en etapas concretas.
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
          El orden sugerido es: Pruebas Unitarias, Integración, Sistema y Aceptación. Cada nivel fortalece el
          anterior y permite detectar defectos cuando son más fáciles (y baratos) de corregir. Todos los niveles se
          deben completar antes del lanzamiento para evitar sorpresas en producción.
        </p>
        <p className="text-sm text-blue-900">
          Una vigilancia constante y una aproximación sistemática ayudan a cubrir la mayor cantidad de escenarios
          posibles dentro de cada etapa.
        </p>
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

