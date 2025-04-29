import java.util.List;
import java.util.Random;

public class Patron implements Runnable {
    private String name;
    private Library library;
    private Random random;
    
    public Patron(String name, Library library) {
        this.name = name;
        this.library = library;
        this.random = new Random();
    }
    
    @Override
    public void run() {
        try {
            // Registrar al usuario
            library.registerPatron(name);
            
            // Simular acciones del usuario en la biblioteca
            for (int i = 0; i < 5; i++) { // Cada usuario realiza 5 acciones
                // Obtener lista de libros disponibles
                List<Book> books = library.getBooks();
                if (!books.isEmpty()) {
                    // Seleccionar un libro aleatorio
                    Book selectedBook = books.get(random.nextInt(books.size()));
                    
                    // Decidir si tomar prestado o devolver un libro
                    if (selectedBook.isAvailable()) {
                        // Intentar tomar prestado
                        library.borrowBook(name, selectedBook.getTitle());
                    } else if (selectedBook.getBorrowedBy() != null && 
                               selectedBook.getBorrowedBy().equals(name)) {
                        // Devolver un libro que el usuario tenga prestado
                        library.returnBook(name, selectedBook.getTitle());
                    }
                }
                
                // Esperar un tiempo aleatorio entre acciones (entre 1 y 3 segundos)
                Thread.sleep(random.nextInt(2000) + 1000);
            }
        } catch (InterruptedException e) {
            System.out.println(name + " fue interrumpido: " + e.getMessage());
        }
    }
    
    public String getName() {
        return name;
    }
}