import java.util.List;

/**
 * Interfaz extendida para gestionar libros con funcionalidades adicionales.
 */
public interface ExtendedBookManager extends BookManager {
    /**
     * Ordena libros por año en orden ascendente.
     * 
     * @return Lista de libros ordenados por año (ascendente)
     */
    List<Book> sortBooksByYearAscending();
    
    /**
     * Ordena libros por año en orden descendente.
     * 
     * @return Lista de libros ordenados por año (descendente)
     */
    List<Book> sortBooksByYearDescending();
    
    /**
     * Encuentra libros publicados antes de un año específico.
     * 
     * @param year El año para comparar
     * @return Lista de libros publicados antes del año especificado
     */
    List<Book> findBooksPublishedBefore(int year);
    
    /**
     * Encuentra libros con títulos que contienen una subcadena específica.
     * 
     * @param substring La subcadena a buscar en los títulos
     * @return Lista de libros con títulos coincidentes
     */
    List<Book> findBooksByTitleContaining(String substring);
}
