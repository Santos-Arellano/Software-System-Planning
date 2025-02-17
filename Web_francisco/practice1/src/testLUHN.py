'''
#Idea de alternativa bajo cierto supuestos

cadena = "4772133046345184"  
suma = 0


for i in range(len(cadena)):

    if i % 2 == 0:  
        valueAddToSuma = int(cadena[i]) * 2

        if(valueAddToSuma >= 10):

            valueAddToSuma = valueAddToSuma - 9
        
        suma = suma + int(valueAddToSuma) + int(cadena[i+1])
        
        #if i == len(cadena)-1:
        #    suma = suma + int(valueAddToSuma)
        #else:
        #    suma = suma + int(valueAddToSuma) + int(cadena[i+1])
        
print(suma)
'''

cadena = "467213304634518"  
suma = 0
invertida = ""

for caracter in cadena:
    invertida = caracter + invertida

print(invertida)


for posicionDigito in range(len(invertida)):
    digito = int(invertida[posicionDigito])

    if posicionDigito % 2 == 1:
        digito *= 2
        if digito > 9:
            digito -= 9
    suma += digito
print(suma)
if suma % 10 == 0:
    print("Tarjeta valida")
else:
    print("Tarjeta Invalida")

