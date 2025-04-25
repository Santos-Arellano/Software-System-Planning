import java.util.List;

/**
 * Clase principal para probar la funcionalidad del sistema de biblioteca.
 * Demuestra el uso de expresiones lambda y referencias a métodos.
 */
public class Main {
    
    /**
     * Método principal para ejecutar la aplicación.
     * 
     * @param args Argumentos de línea de comandos (no utilizados)
     */
    public static void main(String[] args) {
        // Crear una biblioteca
        Library library = new Library();
        
        // Añadir algunos libros iniciales
        library.addBook(new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925));
        library.addBook(new Book("To Kill a Mockingbird", "Harper Lee", 1960));
        library.addBook(new Book("1984", "George Orwell", 1949));
        library.addBook(new Book("Animal Farm", "George Orwell", 1945));
        library.addBook(new Book("Brave New World", "Aldous Huxley", 1932));
        
        // Imprimir todos los libros usando el método por defecto
        System.out.println("All books in the library:");
        library.printAllBooks();
        
        // Buscar libros por autor utilizando expresiones lambda
        System.out.println("\nBooks by George Orwell:");
        List<Book> booksByAuthor = library.findBooksByAuthor("George Orwell");
        // Uso de referencia a método para imprimir
        booksByAuthor.forEach(System.out::println);
        
        // Ordenar libros por título utilizando expresiones lambda
        System.out.println("\nBooks sorted by title:");
        List<Book> sortedBooksByTitle = library.sortBooksByTitle();
        // Uso de referencia a método para imprimir
        sortedBooksByTitle.forEach(System.out::println);
    }
}
