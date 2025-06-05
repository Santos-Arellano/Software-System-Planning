# archivo: test_area_triangulo.py
import pytest
from area_triangulo import calcular_area_triangulo, validar_base, validar_altura

def test_area_triangulo_base_5_altura_7():
    """Prueba: Validar el resultado cuando la base sea 5 y la altura sea 7"""
    resultado = calcular_area_triangulo(5, 7)
    assert resultado == 17.5, f"Esperado 17.5, pero obtuvo {resultado}"

def test_no_acepta_base_negativa():
    """Prueba: Validar que no se acepten valores negativos para la base"""
    with pytest.raises(ValueError, match="La base debe ser mayor que cero"):
        calcular_area_triangulo(-5, 7)

def test_no_acepta_altura_negativa():
    """Prueba: Validar que no se acepten valores negativos para la altura"""
    with pytest.raises(ValueError, match="La altura no puede ser negativa"):
        calcular_area_triangulo(5, -7)

def test_base_no_puede_ser_cero():
    """Prueba: Validar que la base no sea cero"""
    with pytest.raises(ValueError, match="La base debe ser mayor que cero"):
        calcular_area_triangulo(0, 7)

def test_validar_base_positiva():
    """Prueba adicional: Validar función validar_base con valor positivo"""
    assert validar_base(5) == True

def test_validar_base_cero():
    """Prueba adicional: Validar función validar_base con cero"""
    assert validar_base(0) == False

def test_validar_altura_positiva():
    """Prueba adicional: Validar función validar_altura con valor positivo"""
    assert validar_altura(7) == True

def test_validar_altura_cero():
    """Prueba adicional: Validar función validar_altura con cero (válido)"""
    assert validar_altura(0) == True