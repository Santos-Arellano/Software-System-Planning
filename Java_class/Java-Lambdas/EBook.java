/**
 * Representa un libro electrónico con atributo adicional para tamaño de archivo.
 */
public class EBook extends Book {
    private double fileSizeMB;
    
    /**
     * Construye un nuevo EBook con título, autor, año y tamaño de archivo especificados.
     * 
     * @param title Título del libro
     * @param author Autor del libro
     * @param year Año de publicación
     * @param fileSizeMB Tamaño del archivo en megabytes
     */
    public EBook(String title, String author, int year, double fileSizeMB) {
        super(title, author, year);
        this.fileSizeMB = fileSizeMB;
    }
    
    /**
     * Devuelve el tamaño del archivo del e-book en megabytes.
     * 
     * @return El tamaño del archivo en MB
     */
    public double getFileSizeMB() {
        return fileSizeMB;
    }
    
    /**
     * Devuelve una representación en cadena del e-book.
     * 
     * @return Una representación en cadena del e-book
     */
    @Override
    public String toString() {
        return "EBook{" + 
               "title='" + getTitle() + "', " +
               "author='" + getAuthor() + "', " +
               "year=" + getYear() + ", " +
               "fileSizeMB=" + fileSizeMB + "}";
    }
}
