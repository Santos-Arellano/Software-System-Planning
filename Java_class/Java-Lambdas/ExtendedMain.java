import java.util.List;
import java.util.Scanner;

/**
 * Clase principal extendida con menú interactivo para el sistema de biblioteca.
 */
public class ExtendedMain {
    private static ExtendedLibrary library = new ExtendedLibrary();
    private static Scanner scanner = new Scanner(System.in);
    
    /**
     * Método principal para ejecutar la aplicación.
     * 
     * @param args Argumentos de línea de comandos (no utilizados)
     */
    public static void main(String[] args) {
        // Añadir algunos libros iniciales
        initializeLibrary();
        
        // Mostrar mensaje de bienvenida
        System.out.println("Bienvenido al Sistema de Gestión de Biblioteca");
        
        // Bucle de menú principal
        boolean exit = false;
        while (!exit) {
            displayMenu();
            int choice = getChoice();
            
            switch (choice) {
                case 1:
                    addBook();
                    break;
                case 2:
                    findBooksByAuthor();
                    break;
                case 3:
                    sortBooks();
                    break;
                case 4:
                    findBooksPublishedBefore();
                    break;
                case 5:
                    findBooksByTitleContaining();
                    break;
                case 6:
                    printAllBooks();
                    break;
                case 7:
                    exit = true;
                    System.out.println("Gracias por usar el Sistema de Gestión de Biblioteca. ¡Adiós!");
                    break;
                default:
                    System.out.println("Opción inválida. Por favor, inténtelo de nuevo.");
            }
        }
        
        scanner.close();
    }
    
    /**
     * Inicializa la biblioteca con algunos libros de muestra.
     */
    private static void initializeLibrary() {
        library.addBook(new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925));
        library.addBook(new Book("To Kill a Mockingbird", "Harper Lee", 1960));
        library.addBook(new Book("1984", "George Orwell", 1949));
        library.addBook(new Book("Animal Farm", "George Orwell", 1945));
        library.addBook(new Book("Brave New World", "Aldous Huxley", 1932));
        library.addBook(new EBook("Digital Fortress", "Dan Brown", 2000, 2.5));
    }

    /**
     * Muestra el menú principal.
     */
    private static void displayMenu() {
        System.out.println("\n===== MENU =====");
        System.out.println("1. Añadir libro");
        System.out.println("2. Buscar libros por autor");
        System.out.println("3. Ordenar libros");
        System.out.println("4. Buscar libros publicados antes de un año");
        System.out.println("5. Buscar libros por título");
        System.out.println("6. Mostrar todos los libros");
        System.out.println("7. Salir");
        System.out.print("Elija una opción: ");
    }

    /**
     * Obtiene la elección del usuario.
     * 
     * @return El número de opción elegido
     */
    private static int getChoice() {
        int choice = 0;
        try {
            choice = Integer.parseInt(scanner.nextLine());
        } catch (NumberFormatException e) {
            // Si se ingresa algo que no es un número, devolvemos 0
            // que no coincide con ninguna opción válida
        }
        return choice;
    }

    /**
     * Pide datos y añade un nuevo libro a la biblioteca.
     */
    private static void addBook() {
        System.out.print("Ingrese el título: ");
        String title = scanner.nextLine();
        
        System.out.print("Ingrese el autor: ");
        String author = scanner.nextLine();
        
        System.out.print("Ingrese el año: ");
        int year = Integer.parseInt(scanner.nextLine());
        
        System.out.print("¿Es un e-book? (s/n): ");
        String isEbook = scanner.nextLine();
        
        if (isEbook.equalsIgnoreCase("s")) {
            System.out.print("Ingrese el tamaño del archivo (MB): ");
            double fileSize = Double.parseDouble(scanner.nextLine());
            library.addBook(new EBook(title, author, year, fileSize));
            System.out.println("E-book añadido correctamente.");
        } else {
            library.addBook(new Book(title, author, year));
            System.out.println("Libro añadido correctamente.");
        }
    }

    /**
     * Busca y muestra libros por autor.
     */
    private static void findBooksByAuthor() {
        System.out.print("Ingrese el nombre del autor: ");
        String author = scanner.nextLine();
        
        List<Book> books = library.findBooksByAuthor(author);
        
        if (books.isEmpty()) {
            System.out.println("No se encontraron libros del autor: " + author);
        } else {
            System.out.println("Libros encontrados:");
            books.forEach(System.out::println);
        }
    }

    /**
     * Muestra opciones de ordenación y ordena los libros.
     */
    private static void sortBooks() {
        System.out.println("Opciones de ordenación:");
        System.out.println("1. Por título");
        System.out.println("2. Por año (ascendente)");
        System.out.println("3. Por año (descendente)");
        System.out.print("Elija una opción: ");
        
        int choice = Integer.parseInt(scanner.nextLine());
        List<Book> sortedBooks = null;
        
        switch (choice) {
            case 1:
                sortedBooks = library.sortBooksByTitle();
                System.out.println("Libros ordenados por título:");
                break;
            case 2:
                sortedBooks = library.sortBooksByYearAscending();
                System.out.println("Libros ordenados por año (ascendente):");
                break;
            case 3:
                sortedBooks = library.sortBooksByYearDescending();
                System.out.println("Libros ordenados por año (descendente):");
                break;
            default:
                System.out.println("Opción no válida.");
                return;
        }
        
        sortedBooks.forEach(System.out::println);
    }

    /**
     * Busca y muestra libros publicados antes de un año específico.
     */
    private static void findBooksPublishedBefore() {
        System.out.print("Ingrese el año: ");
        int year = Integer.parseInt(scanner.nextLine());
        
        List<Book> books = library.findBooksPublishedBefore(year);
        
        if (books.isEmpty()) {
            System.out.println("No se encontraron libros publicados antes de " + year);
        } else {
            System.out.println("Libros publicados antes de " + year + ":");
            books.forEach(System.out::println);
        }
    }

    /**
     * Busca y muestra libros que contienen una subcadena en el título.
     */
    private static void findBooksByTitleContaining() {
        System.out.print("Ingrese parte del título: ");
        String titlePart = scanner.nextLine();
        
        List<Book> books = library.findBooksByTitleContaining(titlePart);
        
        if (books.isEmpty()) {
            System.out.println("No se encontraron libros con título que contenga: " + titlePart);
        } else {
            System.out.println("Libros encontrados:");
            books.forEach(System.out::println);
        }
    }

    /**
     * Muestra todos los libros en la biblioteca.
     */
    private static void printAllBooks() {
        System.out.println("Todos los libros en la biblioteca:");
        library.printAllBooks();
    }
}
