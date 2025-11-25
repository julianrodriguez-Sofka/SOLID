# Principio de Segregación de Interfaces (ISP)

Este directorio usa la analogía del chef para explicar tres situaciones comunes del Principio de Segregación de Interfaces: la implementación correcta, una interfaz demasiado grande y una dependencia directa con una clase que mezcla responsabilidades.

## Escenarios incluidos

- **Escenario 1 (buena aplicación)**: `PastryStation` depende únicamente del contrato `Baker`, así la estación solo conoce los métodos que realmente necesita.
- **Escenario 2 (mala aplicación)**: `MasterChefStation` obliga a la clase `PastryChefWithMasterContract` a conocer todas las operaciones de `MasterChefContract` que no usa.
- **Escenario 3 (falta de aplicación)**: `PastryStationWithoutInterface` trabaja directamente con una clase concreta (`UniversalChef`) que reúne todas las habilidades.

## Cómo ejecutar (Python incluido por defecto)

Cada escenario está empaquetado en un script independiente que incluye todo el código necesario para ilustrar ese caso particular:

Comandos de Ejecucion en la terminal:

python Escenario/isp/correct_scenario.py
python Escenario/isp/bad_scenario.py
python Escenario/isp/missing_scenario.py
python Escenario/isp/isp_showcase.py

Estos comandos muestran únicamente el escenario elegido y su salida. Si quieres revivir la secuencia completa original, ejecuta:

```
python Escenario/isp/isp_showcase.py
```

El script `isp_showcase.py` conserva toda la lógica agrupada, por lo que sigue siendo útil como referencia o para comparar los tres casos juntos.

