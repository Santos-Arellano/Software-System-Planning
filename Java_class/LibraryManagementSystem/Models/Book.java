package models;

public class Book {
    private String title;
    private String author;
    private String isbn;
    private int copiesAvailable;

    public Book(String title, String author, String isbn, int copiesAvailable) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.copiesAvailable = copiesAvailable;
    }

    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public String getIsbn() { return isbn; }
    public int getCopiesAvailable() { return copiesAvailable; }

    public void borrowBook() {
        if (copiesAvailable > 0) {
            copiesAvailable--;
        } else {
            System.out.println("No copies available.");
        }
    }

    public void returnBook() {
        copiesAvailable++;
    }

    @Override
    public String toString() {
        return "Title: " + title + ", Author: " + author + ", ISBN: " + isbn + ", Copies: " + copiesAvailable;
    }
}
