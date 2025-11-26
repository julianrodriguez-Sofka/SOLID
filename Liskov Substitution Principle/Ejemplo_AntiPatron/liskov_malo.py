# Ejemplo 1: Viola LSP
# La clase padre promete que todos los chefs pueden preparar comida caliente.

class Chef:
    def preparar_plato(self):
        return "Plato caliente listo"

# Un chef vegetariano NO debería romper lo que el padre promete.
# Pero aquí lo rompe totalmente devolviendo algo inesperado.

class ChefVegetariano(Chef):
    def preparar_plato(self):
        # Resultado inesperado: YA NO ES un plato caliente
        return None  # O un valor que nadie esperaba

# Código que falla por culpa de la violación de LSP
def servir_plato(chef: Chef):
    plato = chef.preparar_plato()
    print("Sirviendo:", plato.upper())  # Esto falla si es None

chef = ChefVegetariano()
servir_plato(chef)  # Error en tiempo de ejecución
