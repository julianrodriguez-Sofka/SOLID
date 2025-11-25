import { BookOpen, Code, Lightbulb } from 'lucide-react'

export const principles = [
  {
    id: 0,
    name: 'Single Responsibility Principle (SRP)',
    short: 'SRP',
    description:
      'Una clase debe tener una única razón para cambiar, es decir, debe tener una sola responsabilidad.',
    explanation:
      'Cada módulo o clase debe tener responsabilidad sobre una sola parte de la funcionalidad proporcionada por el software, y esa responsabilidad debe estar completamente encapsulada por la clase.',
    icon: BookOpen,
  },
  {
    id: 1,
    name: 'Open/Closed Principle (OCP)',
    short: 'OCP',
    description:
      'Las entidades de software deben estar abiertas para la extensión, pero cerradas para la modificación.',
    explanation:
      'Debes poder extender el comportamiento de una clase sin modificar su código fuente, utilizando mecanismos como la herencia o la composición.',
    icon: Lightbulb,
  },
  {
    id: 2,
    name: 'Liskov Substitution Principle (LSP)',
    short: 'LSP',
    description:
      'Los objetos de una clase derivada deben poder sustituir a los objetos de la clase base sin alterar el funcionamiento correcto del programa.',
    explanation:
      'Si una función funciona con una clase base, debe funcionar igualmente bien con cualquier subclase de esa clase base sin conocer la diferencia.',
    icon: Code,
  },
  {
    id: 3,
    name: 'Interface Segregation Principle (ISP)',
    short: 'ISP',
    description:
      'Los clientes no deben verse obligados a depender de interfaces que no utilizan.',
    explanation:
      'Es mejor tener muchas interfaces específicas y pequeñas que una interfaz grande y general. Esto evita que las clases implementen métodos que no necesitan.',
    icon: BookOpen,
  },
  {
    id: 4,
    name: 'Dependency Inversion Principle (DIP)',
    short: 'DIP',
    description:
      'Depende de abstracciones, no de concreciones. Los módulos de alto nivel no deben depender de módulos de bajo nivel.',
    explanation:
      'Ambos deben depender de abstracciones (interfaces o clases abstractas). Las abstracciones no deben depender de los detalles; los detalles deben depender de las abstracciones.',
    icon: Lightbulb,
  },
]

