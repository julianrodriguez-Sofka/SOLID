# Principio de Responsabilidad Única (SRP) — Python

El Principio de Responsabilidad Única (Single Responsibility Principle) establece que una clase debe tener una única responsabilidad y, por tanto, una sola razón para cambiar. Si una clase concentra varias funciones (repostería, reservas, limpieza, carta, etc.), se vuelve frágil: cualquier cambio en uno de esos ámbitos la obliga a modificarse.

Analogía (chef): Un chef dedicado sólo a la repostería cambia su trabajo cuando cambia el menú de postres. Si el chef también gestiona entradas, reservas y limpieza, cualquier ajuste en carta, proceso de reservas o normas de higiene lo fuerza a cambiar — violando el SRP.

Estructura de escenarios:

1. python "SOLID/Single Responsibility/Patron/Principio_aplicado_correctamente/ejemplo_correcto.py"

2. python "SOLID/Single Responsibility/Anti-Patron/Mala_aplicacion/ejemplo_malo.py"

3. python "SOLID/Single Responsibility/Falta_de_aplicacion/Sin_patron/ejemplo_sin_patron.py"

1. `Patron/Principio_aplicado_correctamente/` — Implementación que cumple SRP (cada clase una responsabilidad).
2. `Anti-Patron/Mala_aplicacion/` — Clase que agrupa demasiadas responsabilidades (violación directa).
3. `Falta_de_aplicacion/Sin_patron/` — Código sin diseño OO claro; mezcla de tareas en funciones procedurales.

Cómo ejecutar ejemplos (PowerShell):
```powershell
cd "Single Responsibility/Patron/Principio_aplicado_correctamente"
python ejemplo_correcto.py

cd "../Anti-Patron/Mala_aplicacion"
python ejemplo_malo.py

cd "../Falta_de_aplicacion/Sin_patron"
python ejemplo_sin_patron.py
```

Archivos clave:
- `ejemplo_correcto.py` — Muestra separación clara (DessertChef, ReservationManager, DishWasher, MenuManager, Orchestrator).
- `ejemplo_malo.py` — Muestra una sola clase `OmniChef` con múltiples razones de cambio (comentarios marcando violación).
- `ejemplo_sin_patron.py` — Procedural: funciones sueltas mezclan responsabilidades sin encapsulación.

Objetivo didáctico: Comparar rápidamente el coste de concentrar responsabilidades frente a segregarlas.
