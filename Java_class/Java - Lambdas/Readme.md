# Sistema de Gestión de Biblioteca

Este proyecto demuestra el uso de características de Java 8 como expresiones Lambda, Referencias a Métodos y Métodos por Defecto en interfaces mediante la creación de una aplicación simple de gestión de biblioteca.

## Estructura del Proyecto

- `Book.java`: Clase con atributos título, autor y año.
- `EBook.java`: Subclase de Book con un atributo adicional para el tamaño del archivo.
- `BookManager.java`: Interfaz con métodos para gestionar libros, incluyendo un método por defecto.
- `Library.java`: Clase que implementa la interfaz BookManager.
- `Main.java`: Clase con un método main para probar la funcionalidad.
- `ExtendedBookManager.java`: Interfaz extendida con métodos adicionales.
- `ExtendedLibrary.java`: Implementación extendida con funcionalidades adicionales.
- `ExtendedMain.java`: Clase con un menú basado en consola para interactuar con el sistema.

## Características de Java 8 Demostradas

### 1. Expresiones Lambda

Las expresiones lambda se utilizan para implementar interfaces funcionales de manera concisa. En este proyecto, se utilizan principalmente para filtrar y ordenar libros.

Ejemplos:
- Filtrar libros por autor:

filter(book -> book.getAuthor().equalsIgnoreCase(author))

text
- Ordenar libros por título:
.sorted((b1, b2) -> b1.getTitle().compareTo(b2.getTitle()))

text

### 2. Referencias a Métodos

Las referencias a métodos proporcionan una notación abreviada para expresiones lambda que simplemente llaman a un método existente. Hacen que el código sea más legible y conciso.

Ejemplos:
- Imprimir libros:
booksByAuthor.forEach(System.out::println);

text
- Ordenar libros por año:
.sorted(Comparator.comparingInt(Book::getYear))

text

### 3. Métodos por Defecto

Los métodos por defecto permiten añadir nuevos métodos a interfaces sin romper las implementaciones existentes. Proporcionan una implementación predeterminada que puede ser opcionalmente sobrescrita por las clases que implementan la interfaz.

Ejemplo:
- El método `printAllBooks` en la interfaz `BookManager`:
default void printAllBooks() {
getBooks().forEach(System.out::println);
}

text

## Funcionalidades Implementadas

- Gestión básica de libros (añadir, obtener todos)
- Filtrado de libros (por autor, título que contiene, publicados antes de un año)
- Ordenación de libros (por título, año ascendente, año descendente)
- Soporte para libros regulares y e-books
- Interfaz de usuario basada en consola

## Cómo Ejecutar

Compila y ejecuta la clase `Main` para la versión básica o `ExtendedMain` para la versión con menú interactivo:

javac *.java
java Main

text

o

javac *.java
java ExtendedMain

text

Sigue las indicaciones del menú para interactuar con el sistema de biblioteca.

## Referencias

- [Java Lambda Expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)
- [Java Method References](https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html)
- [Java Default Methods](https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html)
Aspectos Destacados de las Características Java Utilizadas
1. Expresiones Lambda
Las expresiones Lambda permiten definir funciones anónimas concisas:

En findBooksByAuthor para filtrar libros según el autor:

java
.filter(book -> book.getAuthor().equalsIgnoreCase(author))
En sortBooksByTitle para ordenar libros por título:

java
.sorted((b1, b2) -> b1.getTitle().compareTo(b2.getTitle()))
2. Referencias a Métodos
Las referencias a métodos son una sintaxis abreviada para expresiones lambda que solo llaman a un método existente:

En el método printAllBooks para imprimir cada libro:

java
getBooks().forEach(System.out::println);
En la clase Main para imprimir los resultados:

java
booksByAuthor.forEach(System.out::println);
3. Métodos por Defecto
Los métodos por defecto permiten añadir implementaciones de métodos a interfaces sin romper la compatibilidad con código existente:

El método printAllBooks en la interfaz BookManager:

java
default void printAllBooks() {
    getBooks().forEach(System.out::println);
}
