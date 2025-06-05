# archivo: area_triangulo.py

def calcular_area_triangulo(base, altura):
    """
    Calcula el área de un triángulo usando la fórmula: (base * altura) / 2
    
    Args:
        base (float): La base del triángulo
        altura (float): La altura del triángulo
    
    Returns:
        float: El área del triángulo
    
    Raises:
        ValueError: Si la base o altura son negativos o si la base es cero
    """
    if base <= 0:
        raise ValueError("La base debe ser mayor que cero")
    
    if altura < 0:
        raise ValueError("La altura no puede ser negativa")
    
    return (base * altura) / 2

def validar_base(base):
    """Valida que la base sea un número positivo mayor que cero"""
    return base > 0

def validar_altura(altura):
    """Valida que la altura sea un número positivo o cero"""
    return altura >= 0