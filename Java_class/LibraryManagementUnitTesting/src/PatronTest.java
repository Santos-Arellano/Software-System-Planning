///Users/santosa/Documents/GitHub/Software-System-Planning/Java_class/LibraryManagementUnitTesting/src/PatronTest.java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class PatronTest {
    @Test
    public void testCheckOutBook() {
        Patron patron = new Patron("John Doe");
        Book book = new Book("Test-Driven Development", "Kent Beck");

        patron.checkOutBook(book);
        assertTrue(patron.hasCheckedOutBook(book));
    }

    @Test
    public void testReturnBook() {
        Patron patron = new Patron("John Doe");
        Book book = new Book("Refactoring", "Martin Fowler");

        patron.checkOutBook(book);
        patron.returnBook(book);
        assertFalse(patron.hasCheckedOutBook(book));
    }
}
