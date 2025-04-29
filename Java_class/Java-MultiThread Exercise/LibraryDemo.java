import java.util.ArrayList;
import java.util.List;

public class LibraryDemo {
    public static void main(String[] args) {
        // Crear una instancia de la biblioteca
        Library library = new Library();
        
        // Registrar algunos libros
        String[] bookTitles = {
            "El señor de los anillos", 
            "Cien años de soledad", 
            "Don Quijote de la Mancha",
            "Harry Potter", 
            "1984", 
            "El Principito",
            "La Odisea", 
            "Crimen y castigo"
        };
        
        for (String title : bookTitles) {
            library.registerBook(title);
        }
        
        // Crear múltiples usuarios
        int numberOfPatrons = 5;
        List<Thread> threads = new ArrayList<>();
        
        for (int i = 0; i < numberOfPatrons; i++) {
            Patron patron = new Patron("Usuario" + (i + 1), library);
            Thread thread = new Thread(patron);
            threads.add(thread);
        }
        
        // Iniciar los hilos de los usuarios
        for (Thread thread : threads) {
            thread.start();
        }
        
        // Esperar a que todos los hilos terminen
        try {
            for (Thread thread : threads) {
                thread.join();
            }
            
            // Mostrar el estado final de la biblioteca
            System.out.println("\n\nOperaciones de usuarios completadas. Estado final de la biblioteca:");
            library.displayLibraryStatus();
            
        } catch (InterruptedException e) {
            System.out.println("Hilo principal interrumpido: " + e.getMessage());
        }
    }
}