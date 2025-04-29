# Multithreaded Library Management System

## Overview of System Architecture

This multithreaded library management system simulates a library environment where multiple patrons can interact with library resources concurrently. The system is designed to handle multiple users borrowing and returning books simultaneously while maintaining data integrity through proper synchronization.

### Key Components:

1. **Book Class**: Represents individual books in the library with attributes like title, availability status, and borrower information.

2. **Library Class**: The central component that manages the library's resources, including book inventory and patron registrations. It provides synchronized methods to ensure thread safety when multiple patrons interact with the library.

3. **Patron Class**: Represents library users, implemented as Runnable to enable multithreaded behavior. Each patron performs various library operations in their own thread.

4. **LibraryDemo Class**: The main class that initializes the library with books and patrons, then starts the simulation of concurrent library usage.

### System Flow:

```
                    +-------------+
                    | LibraryDemo |
                    +-------------+
                           |
                           | creates & manages
                           v
                    +-------------+
                    |   Library   |
                    +-------------+
                           |
                     ______V______
                    /             \
             +-------+         +-------+
             | Book1 |   ...   | BookN |
             +-------+         +-------+
                    \             /
                     -------------
                           ^
                           | accesses via threads
          +----------------+----------------+
          |                |                |
    +----------+     +----------+     +----------+
    | Patron1  |     | Patron2  | ... | PatronN  |
    | (Thread) |     | (Thread) |     | (Thread) |
    +----------+     +----------+     +----------+
```

## Key Methods and Multithreading Handling

### Library Class Methods

#### `public synchronized void registerBook(String title)`
- **Purpose**: Adds a new book to the library's collection.
- **Thread Safety**: Synchronized to prevent concurrent modifications to the books collection.

#### `public synchronized void registerPatron(String name)`
- **Purpose**: Registers a new patron in the library system.
- **Thread Safety**: Synchronized to ensure atomic updates to both the patrons list and borrowedBooks map.

#### `public synchronized boolean borrowBook(String patronName, String bookTitle)`
- **Purpose**: Allows a patron to borrow a book.
- **Thread Safety**: 
  - Synchronized to prevent multiple patrons from borrowing the same book simultaneously.
  - Checks and updates book availability status atomically.
  - Updates the borrower's record atomically.
- **Edge Case Handling**: 
  - Verifies patron registration.
  - Checks if the requested book exists and is available.

#### `public synchronized boolean returnBook(String patronName, String bookTitle)`
- **Purpose**: Processes a book return.
- **Thread Safety**: 
  - Synchronized to handle concurrent returns.
  - Updates book status and patron's borrowed books list atomically.
- **Edge Case Handling**:
  - Verifies that the patron actually borrowed the book.
  - Ensures proper record-keeping for returned books.

#### `public synchronized void displayLibraryStatus()`
- **Purpose**: Shows the current state of the library.
- **Thread Safety**: Synchronized to ensure a consistent snapshot of the library state is displayed.

### Patron Class Methods

#### `public void run()`
- **Purpose**: Defines the behavior of a patron thread.
- **Multithreading Aspects**:
  - Simulates real-world timing with random delays.
  - Handles concurrent access to the shared Library object.
  - Performs multiple library actions (borrowing/returning) in sequence.

## How to Run the Application

1. **Compile the Java files**:
   ```bash
   javac Book.java Library.java Patron.java LibraryDemo.java
   ```

2. **Run the main class**:
   ```bash
   java LibraryDemo
   ```

3. **Expected Output**: 
   The program will display logs of library operations as they occur:
   - Book registrations
   - Patron registrations
   - Book borrowing attempts (successful and unsuccessful)
   - Book return events
   - Final library status after all operations complete

## Test Cases

### Test Case 1: Multiple Patrons Borrowing the Same Book Simultaneously

**Scenario**: Two or more patrons attempt to borrow the same book at nearly the same time.

**Expected Behavior**: 
- Only one patron should successfully borrow the book.
- Other patrons should receive a message indicating the book is not available.
- The library's record should show the book as borrowed by only one patron.

**Implementation**: 
```java
// In LibraryDemo.java:
// Create a specific test scenario
public static void testConcurrentBorrowing(Library library) {
    final String testBook = "Test Book";
    library.registerBook(testBook);
    
    Thread t1 = new Thread(() -> {
        library.borrowBook("Patron1", testBook);
    });
    
    Thread t2 = new Thread(() -> {
        library.borrowBook("Patron2", testBook);
    });
    
    t1.start();
    t2.start();
    
    try {
        t1.join();
        t2.join();
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    
    library.displayLibraryStatus();
}
```

### Test Case 2: Patrons Returning Books in Random Sequence

**Scenario**: Multiple patrons borrow books and return them in an unpredictable order.

**Expected Behavior**: 
- Each book should be correctly tracked in terms of its availability status.
- The system should correctly associate books with their current borrowers.
- Returns should be properly processed regardless of timing.

**Implementation**: 
The general `Patron.run()` method with random delays already implements this test case.

### Test Case 3: Comprehensive Library Operations

**Scenario**: Create a scenario with multiple operations running concurrently:
- Some patrons are registering
- Some patrons are borrowing books
- Some patrons are returning books
- Periodic status checks of the library

**Expected Behavior**: 
- All operations should complete without errors.
- The final library state should be consistent with the operations performed.
- No inconsistencies in book availability or borrower records.

**Implementation**: 
The existing `LibraryDemo.main()` method implements this test case by creating multiple patrons who perform a variety of operations.

### Test Case 4: Edge Case Handling

**Scenario**: Test system behavior with edge cases:
- Attempt to borrow an already borrowed book
- Attempt to return a book not borrowed by that patron
- Attempt to borrow/return with an unregistered patron

**Expected Behavior**:
- The system should handle all edge cases gracefully.
- Appropriate error messages should be displayed.
- The library state should remain consistent.

**Implementation**:
This is handled by the validation logic in the `borrowBook()` and `returnBook()` methods.

## Sample Logging Output

Below is a sample of what the application log might look like during execution:

```
(base) santosa@MacBook-Pro-de-Santos-1358 Java - MultiThread Exercise % javac Book.java Library.java Patron.java LibraryDemo.java
(base) santosa@MacBook-Pro-de-Santos-1358 Java - MultiThread Exercise % java LibraryDemo
Libro registrado: El señor de los anillos
Libro registrado: Cien años de soledad
Libro registrado: Don Quijote de la Mancha
Libro registrado: Harry Potter
Libro registrado: 1984
Libro registrado: El Principito
Libro registrado: La Odisea
Libro registrado: Crimen y castigo
Usuario registrado: Usuario1
Usuario registrado: Usuario5
Usuario5 ha tomado prestado: Harry Potter
Usuario1 ha tomado prestado: El señor de los anillos
Usuario registrado: Usuario4
Usuario registrado: Usuario3
Usuario3 ha tomado prestado: Cien años de soledad
Usuario registrado: Usuario2
Usuario4 ha tomado prestado: 1984
Usuario2 ha tomado prestado: Crimen y castigo
Usuario2 ha tomado prestado: Don Quijote de la Mancha
Usuario2 ha tomado prestado: El Principito
Usuario3 ha devuelto: Cien años de soledad
Usuario1 ha tomado prestado: Cien años de soledad


Operaciones de usuarios completadas. Estado final de la biblioteca:

===== ESTADO DE LA BIBLIOTECA =====
Libros registrados: 8
Usuarios registrados: 5

Libros:
  Book{title='El señor de los anillos', available=false, borrowedBy='Usuario1'}
  Book{title='Cien años de soledad', available=false, borrowedBy='Usuario1'}
  Book{title='Don Quijote de la Mancha', available=false, borrowedBy='Usuario2'}
  Book{title='Harry Potter', available=false, borrowedBy='Usuario5'}
  Book{title='1984', available=false, borrowedBy='Usuario4'}
  Book{title='El Principito', available=false, borrowedBy='Usuario2'}
  Book{title='La Odisea', available=true}
  Book{title='Crimen y castigo', available=false, borrowedBy='Usuario2'}

Libros prestados por usuario:
  Usuario1: 2 libros
    - El señor de los anillos
    - Cien años de soledad
  Usuario5: 1 libros
    - Harry Potter
  Usuario4: 1 libros
    - 1984
  Usuario3: 0 libros
  Usuario2: 3 libros
    - Crimen y castigo
    - Don Quijote de la Mancha
    - El Principito
===================================
```

## Conclusion

This multithreaded library management system demonstrates effective synchronization techniques in Java to handle concurrent operations on shared resources. The synchronized methods ensure that the library's state remains consistent even when multiple patrons interact with it simultaneously. The system successfully handles edge cases and maintains data integrity throughout its operation.