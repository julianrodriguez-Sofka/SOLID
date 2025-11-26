# Principios SOLID - Dashboard interactivo y ejemplos

Este repositorio proboca una experiencia híbrida: una interfaz React creada con Vite que explica cada principio SOLID (y muestra ejemplos claros), más una colección de scripts en Python que ilustran buenas y malas aplicaciones de esos principios usando analogías culinarias (el chef repostero).

## Estructura y tecnologías principales

- `solid-web/`: aplicación React con Tailwind CSS, Vite, y un mini-dashboard que navega entre los principios, muestra explicaciones, ejemplos de código (en Python) y los beneficios asociados.
- `solid-web/src/data/principles.js`: contiene los datos maestros de cada principio (nombre, descripción, explicación extendida e ícono) para renderizar el sidebar y los detalles dinámicos.
- `solid-web/src/components/`: conjunto de componentes como `PrincipleSidebar`, `PrincipleDetail`, `ExamplesPanel`, `BenefitsSection` y `QuickReference` que orquestan la UI.
- `tailwind.config.js` y `postcss.config.js`: definen el scope del CSS compilado, asegurando que solo se genere lo que se usa en `src` y `index.html`.
- Directorios de ejemplos en Python:
  - `OpenClose/`: cubre el Principio Abierto/Cerrado con una implementación ideal, una anti-implementación y un ejemplo sin patrón.
  - `Escenario/isp`: escenarios ISP (correcto, interfaz monolítica, dependencia concreta) con scripts dedicados y un showcase.
  - `Escenario/dip`: escenarios DIP (buena aplicación, creación interna, falta de abstracción).
  - `Single Responsibility/`: ejemplos que contrastan aplicación correcta, anti-patrón y falta de patrón del SRP.
  - `Liskov Substitution Principle/`: muestra variantes correctas, anti-patrón y sin aplicación para LSP.

## Principios SOLID explicados

1. **S - Single Responsibility Principle (SRP)**: cada clase debe tener una única razón para cambiar. El conjunto `Single Responsibility` reproduce especialistas independientes (postres, reservas, platos y menú) orquestados por un `RestaurantOrchestrator`. Cambiar la lógica de menú no daña las clases de limpieza ni de reservas; el anti-patrón `OmniChef` rompe esta separación al combinar todas las tareas en un solo módulo, lo que obliga a tocar la clase cada vez que se altera el flujo completo.
2. **O - Open/Closed Principle (OCP)**: las clases deben estar abiertas para extensión pero cerradas para modificación. `ChefRepostero` trabaja sobre la interfaz abstracta `PreparacionDePostre` (definida con `abc.ABC`) y llama a métodos bien definidos (`tiempo_coccion`, `ingredientes`, `presentar`). Nuevas clases como `PastelDeFresas` o `SouffleChocolate` implementan la interfaz sin alterar el chef. En contraste, las versiones anti-patrón realizan `isinstance` o contienen métodos específicos (`preparar_pastel_fresas`), lo que requiere editar la clase cada vez que llega un nuevo postre y rompe el principio.
3. **L - Liskov Substitution Principle (LSP)**: los subtipos deben ser perfectamente intercambiables con sus padres. El ejemplo correcto hereda de `Chef` y devuelve el mismo tipo (`string`). El cliente `servir_plato` opera con un `Chef` y no necesita conocer el subtipo. Los anti-patrones devuelven `None` o un `dict`, rompiendo la promesa de la clase base y desencadenando fallos cuando el cliente asume un string (como llamar a `upper()` o `len()`).
4. **I - Interface Segregation Principle (ISP)**: los clientes no deberían depender de métodos que no usan. La `PastryStation` depende únicamente del contrato `Baker` (solo `bake_bread` y `make_pastries`) mientras que `MasterChefStation` hereda de una interfaz monolítica `MasterChefContract` que exige `fillet_fish`, `cut_vegetables`, `mix_cocktails`. El cliente se ve forzado a conocer métodos ajenos y la implementación concreta lanza errores en los métodos que no le competen, evidenciando la violación. Otro script muestra la dependencia directa en una clase `UniversalChef`, sin ningún contrato, lo cual tampoco respeta el principio.
5. **D - Dependency Inversion Principle (DIP)**: los módulos de alto nivel deben depender de abstracciones. `OrderManager` recibe una instancia de `ChefContract` y solo llama a `prepare_dish`, lo que permite inyectar cualquier chef concreto sin cambiar la clase de alto nivel. El escenario malo crea internamente al `PastryChef`, acoplando alto y bajo nivel; el tercero recibe la dependencia pero sigue dependiendo de la clase concreta `PastryChef`, por lo que el alto nivel necesita conocer los detalles de la implementación.

## Profundizando en los scripts

### Open/Closed Principle (OCP)
- **`OpenClose/Python_Patron/ocp_correcto.py`**: usa `abc.ABC` para definir el contrato; cada método abstracto (`tiempo_coccion`, `ingredientes`, `presentar`) representa un punto de extensión. El chef recibe una receta y en tiempo de ejecución apenas interactúa con la abstracción, lo que permite añadir nuevos postres sin tocar `ChefRepostero`.
- **`OpenClose/Ejemplo_AntiPatron/ocp_antipatron.py`**: el chef contiene lógica condicional para cada clase concreta y se basa en `isinstance`. Esto significa que agregar un nuevo postre obliga a modificar el método `preparar`, lo que viola el principio porque la clase no está cerrada a cambios.
- **`OpenClose/Ejemplo_SinPatron/ocp_sin_patron.py`**: el chef expone métodos específicos por receta (`preparar_pastel_fresas`, `preparar_souffle_chocolate`) y selecciona la lógica con cadenas, mezclando control de flujo con la implementación. No hay ninguna abstracción reutilizable, por lo tanto no se pueden extender funcionalidades sin tocar la clase base.

### Interface Segregation Principle (ISP)
- **`Escenario/isp/correct_scenario.py`**: la `PastryStation` solo conoce `Baker`, de modo que cualquier clase que implemente `bake_bread` y `make_pastries` puede ser utilizada. Se demuestra con `PastryChef`, que implementa únicamente lo necesario.
- **`Escenario/isp/bad_scenario.py`**: `MasterChefContract` obliga a implementar cinco métodos aunque solo se usen algunos. La implementación lanza `RuntimeError` en los que exceden su dominio, lo que muestra que la interfaz es demasiado amplia.
- **`Escenario/isp/missing_scenario.py`**: el cliente depende directamente de `UniversalChef`, que mezcla panadería, pesca, vegetales y coctelería; aunque recibe la instancia por inyección, sigue dependiendo de detalles concretos.
- **`Escenario/isp/isp_showcase.py`**: recorre los tres escenarios secuencialmente para evidenciar el contraste entre la interfaz especializada, la interfaz monolítica y la dependencia directa.

### Dependency Inversion Principle (DIP)
- **`Escenario/dip/good_scenario.py`**: define `ChefContract` como abstracción y `OrderManager` solo conoce ese contrato. La inyección del `PastryChef` en el constructor demuestra la inversión de dependencias y facilita mocks para pruebas.
- **`Escenario/dip/bad_scenario.py`**: `OrderManager` instancia a `PastryChef` internamente, generando una dependencia rígida; no se puede sustituir el chef sin modificar el alto nivel.
- **`Escenario/dip/missing_scenario.py`**: aunque recibe la dependencia desde afuera, el parámetro es del tipo concreto `PastryChef`. Por lo tanto, la inversión nunca ocurre realmente y el alto nivel sigue dependiendo de una concreción.

### Single Responsibility Principle (SRP)
- **`Single Responsibility/Patron/Principio_aplicado_correctamente/ejemplo_correcto.py`**: muestra especialistas con responsabilidades claras (`DessertChef`, `ReservationManager`, `DishWasher`, `MenuManager`) y un `RestaurantOrchestrator` que solo coordina. Cada módulo solo cambia por su propia razón.
- **`Single Responsibility/Anti-Patron/Mala_aplicacion/ejemplo_malo.py`**: `OmniChef` concentra cocina, reservas, menú y limpieza, lo que genera múltiples razones de cambio y acoplamiento.
- **`Single Responsibility/Falta_de_aplicacion/Sin_patron/ejemplo_sin_patron.py`**: código procedural sin clases, donde las funciones mezclan tareas, evidenciando la falta de encapsulación.

### Liskov Substitution Principle (LSP)
- **`Liskov Substitution Principle/Ejemplo_PatronCorrecto/liskov_correcto.py`**: el subtipo `ChefEspecialista` hereda de `Chef` y extiende el resultado sin alterar el tipo (`str`), por lo que `servir_plato` funciona en ambos casos.
- **`Liskov Substitution Principle/Ejemplo_AntiPatron/liskov_malo.py`**: el subtipo `ChefVegetariano` retorna `None`, rompiendo la promesa de `Chef` y provocando un error cuando el cliente llama a `upper()`.
- **`Liskov Substitution Principle/Ejemplo_SinPatron/liskov_sin_aplicar.py`**: el subtipo retorna un diccionario, así el cliente que asume un string se rompe al llamar a `len()` o realizar operaciones de string.

## Ejemplos en Python por principio

### Open/Closed Principle (OCP)
- `OpenClose/Python_Patron/ocp_correcto.py`: el chef depende de la interfaz `PreparacionDePostre`, extendiendo sin tocar la clase.
- `OpenClose/Ejemplo_AntiPatron/ocp_antipatron.py`: uso de condicionales e inspección de tipo, por lo que cada nueva receta obliga a modificar al chef.
- `OpenClose/Ejemplo_SinPatron/ocp_sin_patron.py`: métodos específicos por postre; no hay espacio para extenderse sin tocar la clase.

### Interface Segregation Principle (ISP)
- `Escenario/isp/correct_scenario.py`: la `PastryStation` solo conoce el contrato `Baker`.
- `Escenario/isp/bad_scenario.py`: interfaz monolítica `MasterChefContract` con métodos obligatorios.
- `Escenario/isp/missing_scenario.py`: dependencia directa de `UniversalChef`, sin abstracción.
- `Escenario/isp/isp_showcase.py`: ejecuta los tres escenarios en secuencia.

### Dependency Inversion Principle (DIP)
- `Escenario/dip/good_scenario.py`: `OrderManager` recibe `ChefContract` desde afuera y delega correctamente.
- `Escenario/dip/bad_scenario.py`: crea internamente el `PastryChef`, acoplando alto y bajo nivel.
- `Escenario/dip/missing_scenario.py`: acoplamiento al tipo concreto aunque la dependencia llegue desde afuera.

### Single Responsibility Principle (SRP)
- `Single Responsibility/Patron/Principio_aplicado_correctamente/ejemplo_correcto.py`: cada clase (postres, reservas, lavado, menú) cumple una única responsabilidad.
- `Single Responsibility/Anti-Patron/Mala_aplicacion/ejemplo_malo.py`: `OmniChef` mezcla tareas mientras `full_shift` las ejecuta todas.
- `Single Responsibility/Falta_de_aplicacion/Sin_patron/ejemplo_sin_patron.py`: código procedural sin separación de responsabilidades.

### Liskov Substitution Principle (LSP)
- `Liskov Substitution Principle/Ejemplo_PatronCorrecto/liskov_correcto.py`: el subtipo devuelve el mismo tipo (string) y el cliente funciona.
- `Liskov Substitution Principle/Ejemplo_AntiPatron/liskov_malo.py`: el subtipo regresa `None`, rompiendo la promesa.
- `Liskov Substitution Principle/Ejemplo_SinPatron/liskov_sin_aplicar.py`: cambia la estructura (diccionario) y el cliente que espera un string falla.

## Cómo ejecutar los ejemplos

### Interfaz React (`solid-web`)
1. Desde la raíz del repositorio:
   ```bash
   cd solid-web
   ```
2. Instala dependencias (ya hay un `package-lock.json` listo):
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Vite mostrará la URL local (por defecto `http://localhost:5173`) con la UI interactiva. Abre el principio deseado para ver tarjetas, ejemplos, snippets y beneficios.
4. Para producción:
   ```bash
   npm run build
   ```

### Scripts Python
Desde la raíz del repositorio:
```bash
python "OpenClose/Python_Patron/ocp_correcto.py"
python "OpenClose/Ejemplo_AntiPatron/ocp_antipatron.py"
python "OpenClose/Ejemplo_SinPatron/ocp_sin_patron.py"
python "Escenario/isp/correct_scenario.py"
python "Escenario/isp/bad_scenario.py"
python "Escenario/isp/missing_scenario.py"
python "Escenario/dip/good_scenario.py"
python "Escenario/dip/bad_scenario.py"
python "Escenario/dip/missing_scenario.py"
python "Single Responsibility/Patron/Principio_aplicado_correctamente/ejemplo_correcto.py"
python "Single Responsibility/Anti-Patron/Mala_aplicacion/ejemplo_malo.py"
python "Single Responsibility/Falta_de_aplicacion/Sin_patron/ejemplo_sin_patron.py"
python "Liskov Substitution Principle/Ejemplo_PatronCorrecto/liskov_correcto.py"
python "Liskov Substitution Principle/Ejemplo_AntiPatron/liskov_malo.py"
python "Liskov Substitution Principle/Ejemplo_SinPatron/liskov_sin_aplicar.py"
```
Cada script imprime mensajes en consola que ilustran cómo se cumple o se viola el principio correspondiente. Ejecutarlos en orden ayuda a comparar comportamientos.