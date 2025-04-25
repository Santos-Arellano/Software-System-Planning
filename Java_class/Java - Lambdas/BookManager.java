import java.util.List;

/**
 * Interfaz para gestionar una colección de libros.
 * Demuestra el uso de métodos por defecto en interfaces.
 */
public interface BookManager {
    /**
     * Añade un libro a la colección.
     * 
     * @param book El libro a añadir
     */
    void addBook(Book book);
    
    /**
     * Devuelve todos los libros en la colección.
     * 
     * @return Lista de todos los libros
     */
    List<Book> getBooks();
    
    /**
     * Encuentra libros de un autor específico.
     * 
     * @param author El nombre del autor a buscar
     * @return Lista de libros del autor especificado
     */
    List<Book> findBooksByAuthor(String author);
    
    /**
     * Ordena los libros por título.
     * 
     * @return Lista de libros ordenados por título
     */
    List<Book> sortBooksByTitle();
    
    /**
     * Método por defecto que imprime todos los libros en la colección.
     * Demuestra el uso de referencias a métodos (System.out::println).
     */
    default void printAllBooks() {
        getBooks().forEach(System.out::println);
    }
}
