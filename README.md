# Principio de Abierto y Cerrado (OCP) — Ejemplos en Python

Proyecto educativo que muestra cómo aplicar, mal aplicar y no aplicar el Principio de Abierto y Cerrado del paradigma SOLID usando una analogía de un Chef Repostero.

El objetivo es demostrar cómo debe comportarse una arquitectura que permita extender funcionalidad sin modificar el código base, evitando introducir errores y manteniendo el sistema flexible.

# ¿Qué es el Principio de Abierto/Cerrado?

El OCP (Open/Closed Principle) establece que:

Las clases, módulos o funciones deben estar abiertas para extensión pero cerradas para modificación.

Esto significa que el código existente no debería modificarse al agregar nuevas funcionalidades; en su lugar, se deben extender las capacidades mediante nuevas clases o implementaciones.

# Analogía del Chef Repostero

El Chef representa una clase base cuya responsabilidad es preparar postres.

Cada postre es una “Tarjeta de Receta” (clase que implementa una abstracción).

Las nuevas recetas deben extender el sistema sin modificar el código del Chef.

El Chef solo sabe trabajar con recetas que cumplen un contrato (interfaz).

# Contenido del Proyecto

Este repositorio contiene tres ejemplos en Python, uno mostrando el OCP aplicado correctamente, uno con mala aplicación y uno que lo viola completamente.

# 1. OCP Aplicado Correctamente — Implementación Ideal
✔ Características

No se modifica el código del Chef para agregar nuevos postres.

Se usa una abstracción (interfaz) llamada PreparacionDePostre.

Cada nueva receta es una nueva clase que implementa esa interfaz.

Totalmente conforme al Principio Abierto/Cerrado.

# Archivo: ocp_correcto.py

Incluye:

Interfaz PreparacionDePostre

Ejemplo de recetas: PastelDeFresas, SouffleChocolate

ChefRepostero que usa polimorfismo

# 2. Mala Aplicación del OCP — OCP roto parcialmente

# Problemas

Existe una pseudo–abstracción, pero el Chef sigue usando if/elif.

El Chef se modifica siempre que llega un nuevo postre.

Uso incorrecto del polimorfismo.

# Archivo: ocp_mala_aplicacion.py

Incluye:

Condicionales acoplados

Dependencia del Chef hacia clases concretas

# 3. Falta Total de OCP — Antipatrones

# Problemas graves

El Chef tiene métodos para cada postre.

No hay abstracciones.

Su única forma de crecer es modificando la clase base cada vez.

Alto acoplamiento y cero extensibilidad.

# Archivo: ocp_sin_aplicar.py

Incluye:

Métodos hardcodeados para cada postre

Estructura completamente rígida

# Cómo ejecutar los ejemplos

python3 ocp_correcto.py
python3 ocp_mala_aplicacion.py
python3 ocp_sin_aplicar.py

# Lecciones Clave

# Un sistema que respeta OCP permite:

Agregar funcionalidad sin tocar lo existente

Reducir riesgos de errores en producción

Facilitar el mantenimiento

Mejorar la escalabilidad

# Un sistema sin OCP:

Se vuelve rígido

Es difícil de mantener

Requiere editar código base para cada cambio

Aumenta la probabilidad de bugs