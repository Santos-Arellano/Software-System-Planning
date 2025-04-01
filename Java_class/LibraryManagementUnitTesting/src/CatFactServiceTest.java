///Users/santosa/Documents/GitHub/Software-System-Planning/Java_class/LibraryManagementUnitTesting/src/CatFactServiceTest.java
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.Scanner;

public class CatFactServiceTest {
    @Test
    public void testMockedCatFactAPI() throws IOException {
        HttpURLConnection connection = mock(HttpURLConnection.class);
        when(connection.getResponseCode()).thenReturn(200);

        String mockResponse = "{\"fact\":\"Cats sleep for 70% of their lives.\",\"length\":42}";

        Scanner scanner = mock(Scanner.class);
        when(scanner.hasNext()).thenReturn(true, false);
        when(scanner.nextLine()).thenReturn(mockResponse);

        String fact = fetchCatFact(connection, scanner);

        assertEquals("Cats sleep for 70% of their lives.", fact, "Debería devolver un hecho sobre gatos");
    }

 private String fetchCatFact(HttpURLConnection connection, Scanner scanner) throws IOException {
    StringBuilder response = new StringBuilder();
    while (scanner.hasNext()) {
        response.append(scanner.nextLine());
    }
    return response.toString(); // Devuelve la respuesta completa
}
