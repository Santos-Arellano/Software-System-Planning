///Users/santosa/Documents/GitHub/Software-System-Planning/Java_class/LibraryManagementUnitTesting/src/LibraryTest.java
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;  
  
public class LibraryTest {  
  
    @Test  
    public void testAddBook() {  
        Library library = new Library();  
        Book book = new Book("1984", "George Orwell");  
        library.addBook(book);  
        assertTrue(library.listAvailableBooks().contains(book));  
    }  
    @Test
public void testCheckOutNonExistentBook() {
    Library library = new Library();
    Patron patron = new Patron("John Doe");
    Book book = new Book("Invisible Book", "Unknown Author");

    boolean result = library.checkOutBook(patron, book, 7);

    assertFalse(result, "No se puede prestar un libro que no existe en la biblioteca");
}
@Test
public void testReturnUnborrowedBook() {
    Library library = new Library();
    Patron patron = new Patron("John Doe");
    Book book = new Book("Clean Code", "Robert C. Martin");

    boolean result = library.returnBook(patron);

    assertFalse(result, "No se puede devolver un libro que nunca fue prestado");
}
@Test
public void testFineCalculation() {
    Library library = new Library();
    Patron patron = new Patron("Alice");
    Book book = new Book("Refactoring", "Martin Fowler");

    library.addBook(book);
    library.addPatron(patron);
    library.checkOutBook(patron, book, 5);  

    book.setDueDate(LocalDate.now().minusDays(5)); 

    double fine = library.calculateFine(patron);

    assertEquals(2.5, fine, 0.01, "La multa debería ser $2.50 por 5 días de retraso");
}

    @Test
    public void testAddDuplicateBook() {
        Library library = new Library();
        Book book1 = new Book("Moby Dick", "Herman Melville");
        Book book2 = new Book("Moby Dick", "Herman Melville");
    
        library.addBook(book1);
        library.addBook(book2);
    
        long count = library.listAvailableBooks().stream()
                             .filter(book -> book.getTitle().equals("Moby Dick"))
                             .count();
    
        assertEquals(1, count, "El libro duplicado no debería agregarse");
    }
    
    @Test  
    public void testCalculateFineAfterReturn() {  
        // Setup  
        Library library = new Library();  
        Patron patron = new Patron("Alice Smith");  
        Book book = new Book("Design Patterns", "Erich Gamma");  
  
        library.addBook(book);  
        library.addPatron(patron);  
          
        // Check out for 2 days  
        library.checkOutBook(patron, book, 2);   
          
        // Simulate that 2 days have passed, and set the due date  
        book.setDueDate(LocalDate.now().minusDays(2));  
  
        // Return the book  
        library.returnBook(patron);   
  
        // Act: Calculate fine after returning  
        double fineAfterReturn = library.calculateFine(patron);   
  
        // Assert: No fine should be calculated after return  
        assertEquals(0, fineAfterReturn, "The fine should be zero after returning the book.");  
    }  
}  
 