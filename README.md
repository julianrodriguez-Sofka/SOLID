# Principios SOLID - Dashboard interactivo

Este repositorio ahora contiene una interfaz React moderna que explica cada uno de los cinco principios SOLID
con ejemplo visuales, tarjetas de explicación y espacio para notas. La aplicación se separa en componentes específicos y
aprovecha Tailwind CSS para mantener estilos consistentes.

## Estructura del proyecto

- `solid-web/`: aplicación creada con Vite + React (actualizada para React 19).
- `solid-web/src/data/principles.js`: lista fuente de principios, incluido el nombre corto, descripción y explicación detallada.
- `solid-web/src/components/`: componentes reutilizables que componen el layout principal (sidebar, detalle, ejemplos, beneficios, etc.).
- `solid-web/src/App.jsx`: orquesta el layout y mantiene el principio activo mediante estado local.
- `tailwind.config.js` + `postcss.config.js`: configuración de Tailwind que asegura que solo el CSS utilizado en `src` y `index.html` se compile.

## Guía rápida

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

- Componentes desacoplados (`PrincipleSidebar`, `PrincipleDetail`, `ExamplesPanel`, etc.) para facilitar pruebas y mantenimiento.
- Datos centralizados (`principles` en un módulo separado) para facilitar cambios y localizaciones futuras.
- Tailwind CSS configurado con PostCSS para mantener el CSS minimalista y legible.
- Dependencias modernas (`react 19`, `lucide-react`) y scripts estándar de Vite/ESLint.