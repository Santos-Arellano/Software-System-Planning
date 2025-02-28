package models;

public class Patron {
    private String name;
    private String id;
    private String contactInfo;

    public Patron(String name, String id, String contactInfo) {
        this.name = name;
        this.id = id;
        this.contactInfo = contactInfo;
    }

    public String getName() { return name; }
    public String getId() { return id; }
    public String getContactInfo() { return contactInfo; }

    @Override
    public String toString() {
        return "Name: " + name + ", ID: " + id + ", Contact: " + contactInfo;
    }
}
