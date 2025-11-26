# Principios SOLID - Dashboard interactivo y ejemplos

Este repositorio combina una interfaz React moderna que explica cada uno de los cinco principios SOLID con tarjetas visuales y ejemplos didácticos, y una colección de scripts en Python que ilustran malas y buenas aplicaciones (empezando por el Principio Abierto/Cerrado) usando la analogía de un chef repostero.

## Estructura del proyecto

- `solid-web/`: aplicación creada con Vite + React (actualizada para React 19) que navega entre los principios y muestra detalles junto a ejemplos y beneficios.
- `solid-web/src/data/principles.js`: datos maestros de cada principio con nombre corto, descripción, explicación y el icono que los representa.
- `solid-web/src/components/`: componentes reutilizables (`PrincipleSidebar`, `PrincipleDetail`, `ExamplesPanel`, `BenefitsSection`, `QuickReference`, etc.) que componen el layout principal.
- `solid-web/src/App.jsx`: orquesta el layout, mantiene el principio activo y selecciona los ejemplos y beneficios correspondientes.
- `tailwind.config.js` + `postcss.config.js`: configuración de Tailwind que asegura que sólo el CSS utilizado en `src` y `index.html` se compile.
- `Escenario/`: ejemplos en Python para cada principio (OCP, ISP, DIP, etc.) usando analogías como el chef y la gestión de órdenes.

## Guía rápida para la interfaz React

1. Posiciónate en el proyecto:
   ```
   cd solid-web
   ```
2. Instala dependencias:
   ```
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```
   npm run dev
   ```
   Vite mostrará la URL local (por defecto `http://localhost:5173`).
4. Para generar la versión de producción:
   ```
   npm run build
   ```

## Buenas prácticas implementadas

- Componentes desacoplados para facilitar pruebas y mantenimiento.
- Datos centralizados para facilitar cambios y localizaciones futuras.
- Tailwind CSS + PostCSS para mantener el CSS minimalista y legible.
- Dependencias modernas (`react 19`, `lucide-react`) y scripts estándar de Vite/ESLint.

## Ejemplos en Python: Principio de Abierto/Cerrado y más

La carpeta `Escenario/` combina analogías culinarias con scripts en Python que muestran cómo aplicar (o violar) cada principio. El subdirectorio `Python_Patron` y los ejemplos dentro de `Escenario/ocp_*` son especialmente útiles para aprender el OCP. El enfoque del chef repostero destaca que:

- El Chef sólo interactúa con recetas (clases) que cumplen un contrato (`PreparacionDePostre`), así el mismo código del chef no se modifica cuando llega un nuevo postre.
- Existen tres scripts que contrastan el resultado: la siguiente implementación ideal, otra que todavía usa condicionales acoplados y un último que muestra una estructura rígida sin abstracciones.
- Las lecciones clave son claras: un sistema que respeta OCP permite extender funcionalidades sin tocar el código existente, mientras que uno sin OCP se vuelve rígido, difícil de mantener y propenso a bugs.

### Ejemplos principales para OCP

1. **OCP Aplicado Correctamente (`ocp_correcto.py`)**
   - Usa la interfaz `PreparacionDePostre` y clases como `PastelDeFresas` o `SouffleChocolate`.
   - El `ChefRepostero` sólo conoce el contrato y usa polimorfismo para preparar cualquier receta nueva.

2. **Mala aplicación del OCP (`ocp_mala_aplicacion.py`)**
   - El chef depende de condicionales (`if/elif`) y necesita modificarse cada vez que se introduce un nuevo postre.
   - Hay dependencia hacia clases concretas y el polimorfismo no se aprovecha correctamente.

3. **Falta total de OCP (`ocp_sin_aplicar.py`)**
   - El chef tiene métodos hardcodeados para cada postre y no existen abstracciones.
   - La clase base debe editarse para crecer, generando alto acoplamiento y cero extensibilidad.

## Cómo ejecutar los ejemplos en Python

```bash
python Python_Patron/ocp_correcto.py
python Ejemplo_SinPatron/ocp_sin_patron.py
python Ejemplo_AntiPatron/ocp_antipatron.py
python Escenario/isp/correct_scenario.py
python Escenario/isp/bad_scenario.py
python Escenario/isp/missing_scenario.py
python Escenario/dip/good_scenario.py
python Escenario/dip/bad_scenario.py
python Escenario/dip/missing_scenario.py
```

