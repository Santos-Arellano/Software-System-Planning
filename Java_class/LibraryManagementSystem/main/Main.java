package main;

import services.LibraryService;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        LibraryService library = new LibraryService();
        Scanner scanner = new Scanner(System.in);
        boolean running = true;

        while (running) {
            System.out.println("\nLibrary Management System");
            System.out.println("1. Add Book");
            System.out.println("2. Remove Book");
            System.out.println("3. Display Books");
            System.out.println("4. Register Patron");
            System.out.println("5. View Patrons");
            System.out.println("6. Borrow Book");
            System.out.println("7. Return Book");
            System.out.println("8. Search Book");
            System.out.println("9. Exit");
            System.out.print("Choose an option: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1 -> library.addBook();
                case 2 -> library.removeBook();
                case 3 -> library.displayBooks();
                case 4 -> library.registerPatron();
                case 5 -> library.viewPatrons();
                case 6 -> library.borrowBook();
                case 7 -> library.returnBook();
                case 8 -> library.searchBook();
                case 9 -> {
                    System.out.println("Exiting system...");
                    running = false;
                }
                default -> System.out.println("Invalid option. Try again.");
            }
        }
    }
}




//  javac main/Main.java
//  java main.Main
