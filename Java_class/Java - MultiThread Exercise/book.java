public class Book {
    private String title;
    private boolean available;
    private String borrowedBy;

    public Book(String title) {
        this.title = title;
        this.available = true;
        this.borrowedBy = null;
    }

    public String getTitle() {
        return title;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getBorrowedBy() {
        return borrowedBy;
    }

    public void setBorrowedBy(String borrowedBy) {
        this.borrowedBy = borrowedBy;
    }

    @Override
    public String toString() {
        return "Book{title='" + title + "', available=" + available + 
               (borrowedBy != null ? ", borrowedBy='" + borrowedBy + "'" : "") + "}";
    }
}