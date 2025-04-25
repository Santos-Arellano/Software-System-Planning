import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementación extendida de la interfaz BookManager con funcionalidades adicionales.
 */
public class ExtendedLibrary extends Library implements ExtendedBookManager {
    
    /**
     * Ordena libros por año en orden ascendente.
     * Utiliza referencia de método con Comparator.
     * 
     * @return Lista de libros ordenados por año (ascendente)
     */
    @Override
    public List<Book> sortBooksByYearAscending() {
        return getBooks().stream()
                .sorted(Comparator.comparingInt(Book::getYear))
                .collect(Collectors.toList());
    }
    
    /**
     * Ordena libros por año en orden descendente.
     * Utiliza expresión lambda con Comparator inverso.
     * 
     * @return Lista de libros ordenados por año (descendente)
     */
    @Override
    public List<Book> sortBooksByYearDescending() {
        return getBooks().stream()
                .sorted((b1, b2) -> b2.getYear() - b1.getYear())
                .collect(Collectors.toList());
    }
    
    /**
     * Encuentra libros publicados antes de un año específico.
     * Utiliza expresión lambda para filtrar.
     * 
     * @param year El año para comparar
     * @return Lista de libros publicados antes del año especificado
     */
    @Override
    public List<Book> findBooksPublishedBefore(int year) {
        return getBooks().stream()
                .filter(book -> book.getYear() < year)
                .collect(Collectors.toList());
    }
    
    /**
     * Encuentra libros con títulos que contienen una subcadena específica.
     * Utiliza expresión lambda para filtrar.
     * 
     * @param substring La subcadena a buscar en los títulos
     * @return Lista de libros con títulos coincidentes
     */
    @Override
    public List<Book> findBooksByTitleContaining(String substring) {
        return getBooks().stream()
                .filter(book -> book.getTitle().toLowerCase().contains(substring.toLowerCase()))
                .collect(Collectors.toList());
    }
}
