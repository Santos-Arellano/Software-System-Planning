/**
 * Representa un libro con título, autor y año de publicación.
 */
public class Book {
    private String title;
    private String author;
    private int year;
    
    /**
     * Constructor de un nuevo libro.
     * 
     * @param title Título del libro
     * @param author Autor del libro
     * @param year Año de publicación
     */
    public Book(String title, String author, int year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
    
    /**
     * Obtiene el título del libro.
     * 
     * @return El título
     */
    public String getTitle() {
        return title;
    }
    
    /**
     * Obtiene el autor del libro.
     * 
     * @return El autor
     */
    public String getAuthor() {
        return author;
    }
    
    /**
     * Obtiene el año de publicación del libro.
     * 
     * @return El año
     */
    public int getYear() {
        return year;
    }
    
    /**
     * Devuelve una representación en cadena del libro.
     * 
     * @return Una representación en cadena del libro
     */
    @Override
    public String toString() {
        return "Book{title='" + title + "', author='" + author + "', year=" + year + "}";
    }
}
