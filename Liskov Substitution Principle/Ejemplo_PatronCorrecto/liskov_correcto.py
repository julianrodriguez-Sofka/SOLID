# Ejemplo 3: Correcto — Cumple LSP
# El padre promete devolver un string describiendo el plato.

class Chef:
    def preparar_plato(self):
        return "Plato caliente"

# El hijo agrega detalles, pero mantiene el TIPO y la PROMESA.
# Sigue siendo un string, solo más descriptivo.

class ChefEspecialista(Chef):
    def preparar_plato(self):
        plato_base = super().preparar_plato()
        return plato_base + " con especias especiales"

def servir_plato(chef: Chef):
    plato = chef.preparar_plato()
    print("Sirviendo:", plato.upper())

chef = ChefEspecialista()
servir_plato(chef)  # Funciona perfecto
