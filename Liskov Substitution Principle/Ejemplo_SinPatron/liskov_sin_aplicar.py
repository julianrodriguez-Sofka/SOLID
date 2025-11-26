# Ejemplo 2: Falta de aplicación (rompe LSP pero más sutil)
# El padre promete devolver un STRING describiendo el plato.

class Chef:
    def preparar_plato(self):
        return "Plato caliente"

# El hijo cambia la estructura del retorno.
# Ahora devuelve un diccionario, NO un string.
# Esto quiebra las expectativas del código que ya existe.

class ChefGourmet(Chef):
    def preparar_plato(self):
        return {
            "plato": "Plato caliente",
            "decoracion": "Flores comestibles"
        }

def servir_plato(chef: Chef):
    plato = chef.preparar_plato()
    print("LONGITUD DEL PLATO:", len(plato))  
    # Este código asume un string, pero recibe un diccionario.

chef = ChefGourmet()
servir_plato(chef)  # Se rompe o da resultado inesperado
