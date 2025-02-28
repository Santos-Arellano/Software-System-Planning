package services;

import models.Book;
import models.Patron;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class LibraryService {
    private List<Book> books = new ArrayList<>();
    private List<Patron> patrons = new ArrayList<>();
    private Scanner scanner = new Scanner(System.in);

    public void addBook() {
        System.out.println("\nEnter book details:");
        System.out.print("Title: ");
        String title = scanner.nextLine();
        System.out.print("Author: ");
        String author = scanner.nextLine();
        System.out.print("ISBN: ");
        String isbn = scanner.nextLine();
        System.out.print("Copies: ");
        int copies = scanner.nextInt();
        scanner.nextLine(); // Consume newline

        books.add(new Book(title, author, isbn, copies));
        System.out.println("Book added successfully!");
    }

    public void removeBook() {
        System.out.print("\nEnter ISBN of the book to remove: ");
        String isbn = scanner.nextLine();

        books.removeIf(book -> book.getIsbn().equals(isbn));
        System.out.println("Book removed successfully!");
    }

    public void displayBooks() {
        System.out.println("\nLibrary Books:");
        for (Book book : books) {
            System.out.println(book);
        }
    }

    public void registerPatron() {
        System.out.println("\nEnter patron details:");
        System.out.print("Name: ");
        String name = scanner.nextLine();
        System.out.print("ID: ");
        String id = scanner.nextLine();
        System.out.print("Contact: ");
        String contact = scanner.nextLine();

        patrons.add(new Patron(name, id, contact));
        System.out.println("Patron registered successfully!");
    }

    public void viewPatrons() {
        System.out.println("\nRegistered Patrons:");
        for (Patron patron : patrons) {
            System.out.println(patron);
        }
    }

    public void borrowBook() {
        System.out.print("\nEnter ISBN of the book to borrow: ");
        String isbn = scanner.nextLine();
        for (Book book : books) {
            if (book.getIsbn().equals(isbn) && book.getCopiesAvailable() > 0) {
                book.borrowBook();
                System.out.println("Book borrowed successfully!");
                return;
            }
        }
        System.out.println("Book not available.");
    }

    public void returnBook() {
        System.out.print("\nEnter ISBN of the book to return: ");
        String isbn = scanner.nextLine();
        for (Book book : books) {
            if (book.getIsbn().equals(isbn)) {
                book.returnBook();
                System.out.println("Book returned successfully!");
                return;
            }
        }
        System.out.println("Book not found.");
    }

    public void searchBook() {
        System.out.print("\nEnter title, author, or ISBN to search: ");
        String query = scanner.nextLine().toLowerCase();
        for (Book book : books) {
            if (book.getTitle().toLowerCase().contains(query) ||
                book.getAuthor().toLowerCase().contains(query) ||
                book.getIsbn().equals(query)) {
                System.out.println(book);
            }
        }
    }
}
