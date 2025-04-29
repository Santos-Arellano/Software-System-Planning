import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementación de la interfaz BookManager.
 * Demuestra el uso de expresiones lambda y referencias a métodos.
 */
public class Library implements BookManager {
    private List<Book> books;
    
    /**
     * Construye una nueva biblioteca vacía.
     */
    public Library() {
        this.books = new ArrayList<>();
    }
    
    /**
     * Añade un libro a la biblioteca.
     * 
     * @param book El libro a añadir
     */
    @Override
    public void addBook(Book book) {
        books.add(book);
    }
    
    /**
     * Devuelve todos los libros en la biblioteca.
     * 
     * @return Lista de todos los libros
     */
    @Override
    public List<Book> getBooks() {
        return books;
    }
    
    /**
     * Encuentra libros de un autor específico.
     * Utiliza expresión lambda para filtrar libros.
     * 
     * @param author El nombre del autor a buscar
     * @return Lista de libros del autor especificado
     */
    @Override
    public List<Book> findBooksByAuthor(String author) {
        return books.stream()
                .filter(book -> book.getAuthor().equalsIgnoreCase(author))
                .collect(Collectors.toList());
    }
    
    /**
     * Ordena libros por título.
     * Utiliza expresión lambda para la comparación.
     * 
     * @return Lista de libros ordenados por título
     */
    @Override
    public List<Book> sortBooksByTitle() {
        return books.stream()
                .sorted((b1, b2) -> b1.getTitle().compareTo(b2.getTitle()))
                .collect(Collectors.toList());
    }
}
