# Principio de Inversión de Dependencias (DIP)

Este subdirectorio muestra tres formas de aplicar (o no aplicar) el DIP, siguiendo la analogía del chef y la gestión de pedidos.

## Escenarios disponibles

- **Escenario 1 (buena aplicación)**: `Escenario/dip/good_scenario.py` introduce la abstracción `ChefContract`, la orden depende de ella y la dependencia se inyecta desde afuera.
- **Escenario 2 (mala aplicación)**: `Escenario/dip/bad_scenario.py` ilustra cómo la clase de alto nivel crea ella misma a `PastryChef`, con lo que queda atada a ese detalle.
- **Escenario 3 (falta de aplicación)**: `Escenario/dip/missing_scenario.py` recibe la dependencia pero sin usar una interfaz o contrato, por lo que sigue dependiendo directamente de `PastryChef`.

## Cómo ejecutar

Simplemente corre los scripts con Python desde la raíz del proyecto:

```
python Escenario/dip/good_scenario.py
python Escenario/dip/bad_scenario.py
python Escenario/dip/missing_scenario.py
```

Cada archivo imprime dónde radica el cumplimiento o la violación del Principio de Inversión de Dependencias.

1. Escenario correcto – Escenario/dip/good_scenario.py
- Qué hace: OrderManager (clase de alto nivel) depende de la abstracción ChefContract, no de un chef concreto.
- Cómo funciona: la dependencia se inyecta desde afuera al constructor (OrderManager(PastryChef())). El manager llama siempre a prepare_dish() sin saber quién lo implementa.
- Ventaja: puedes agregar nuevos chefs (de pescado, de ensaladas, etc.) sin tocar OrderManager. Cumple DIP y evita modificar código de alto nivel cuando cambian los detalles (respeta OCP).

2. Mala aplicación – Escenario/dip/bad_scenario.py
- Qué ocurre: OrderManager crea internamente a PastryChef.
- Problema: el alto nivel queda rígidamente acoplado al chef de repostería. Para introducir otro chef hay que editar OrderManager.
- Consecuencia: violación del DIP y del OCP. Las clases de alto nivel dependen de detalles concretos y no hay forma sencilla de reemplazar o probar con un chef distinto.

3. Falta de abstracción – Escenario/dip/missing_scenario.py
- Qué ocurre: OrderManager recibe el chef desde afuera (inyección), pero el tipo de la dependencia sigue siendo la clase concreta PastryChef.
- Problema: sigue habiendo acoplamiento, porque ambos niveles dependen del mismo detalle. Si surge una nueva implementación, OrderManager tendría que conocer su tipo exacto.
- Claves: muestra que la inyección sola no basta; es esencial que ambas clases compartan una abstracción (contrato) para invertir correctamente las dependencias.