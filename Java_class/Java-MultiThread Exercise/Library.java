import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Library {
    private List<Book> books;
    private List<String> patrons;
    private Map<String, List<Book>> borrowedBooks;

    public Library() {
        this.books = new ArrayList<>();
        this.patrons = new ArrayList<>();
        this.borrowedBooks = new HashMap<>();
    }

    public synchronized void registerBook(String title) {
        books.add(new Book(title));
        System.out.println("Libro registrado: " + title);
    }

    public synchronized void registerPatron(String name) {
        patrons.add(name);
        borrowedBooks.put(name, new ArrayList<>());
        System.out.println("Usuario registrado: " + name);
    }

    public synchronized boolean borrowBook(String patronName, String bookTitle) {
        // Verificar si el usuario está registrado
        if (!patrons.contains(patronName)) {
            System.out.println("Error: El usuario " + patronName + " no está registrado en la biblioteca");
            return false;
        }

        // Buscar el libro
        Book bookToBorrow = null;
        for (Book book : books) {
            if (book.getTitle().equals(bookTitle) && book.isAvailable()) {
                bookToBorrow = book;
                break;
            }
        }

        // Verificar si el libro existe y está disponible
        if (bookToBorrow == null) {
            System.out.println("Error: El libro '" + bookTitle + "' no está disponible para " + patronName);
            return false;
        }

        // Prestar el libro
        bookToBorrow.setAvailable(false);
        bookToBorrow.setBorrowedBy(patronName);
        borrowedBooks.get(patronName).add(bookToBorrow);
        System.out.println(patronName + " ha tomado prestado: " + bookTitle);
        return true;
    }

    public synchronized boolean returnBook(String patronName, String bookTitle) {
        // Verificar si el usuario está registrado
        if (!patrons.contains(patronName)) {
            System.out.println("Error: El usuario " + patronName + " no está registrado en la biblioteca");
            return false;
        }

        // Buscar en la lista de libros prestados al usuario
        List<Book> patronBooks = borrowedBooks.get(patronName);
        Book bookToReturn = null;
        
        for (Book book : patronBooks) {
            if (book.getTitle().equals(bookTitle)) {
                bookToReturn = book;
                break;
            }
        }

        // Verificar si el usuario tiene el libro
        if (bookToReturn == null) {
            System.out.println("Error: " + patronName + " no tiene prestado el libro '" + bookTitle + "'");
            return false;
        }

        // Devolver el libro
        bookToReturn.setAvailable(true);
        bookToReturn.setBorrowedBy(null);
        patronBooks.remove(bookToReturn);
        System.out.println(patronName + " ha devuelto: " + bookTitle);
        return true;
    }

    public synchronized void displayLibraryStatus() {
        System.out.println("\n===== ESTADO DE LA BIBLIOTECA =====");
        System.out.println("Libros registrados: " + books.size());
        System.out.println("Usuarios registrados: " + patrons.size());
        
        System.out.println("\nLibros:");
        for (Book book : books) {
            System.out.println("  " + book);
        }
        
        System.out.println("\nLibros prestados por usuario:");
        for (String patron : patrons) {
            List<Book> patronBooks = borrowedBooks.get(patron);
            System.out.println("  " + patron + ": " + patronBooks.size() + " libros");
            for (Book book : patronBooks) {
                System.out.println("    - " + book.getTitle());
            }
        }
        System.out.println("===================================\n");
    }

    public List<Book> getBooks() {
        return new ArrayList<>(books); // Devuelve una copia para evitar problemas de concurrencia
    }
}