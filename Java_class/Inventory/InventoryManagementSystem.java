package Inventory;

import java.util.ArrayList;  
import java.util.List;  
import java.util.Scanner;  
import Inventory.Model.Item;
import Inventory.Model.Inventory;

public class InventoryManagementSystem {
    public static void main(String[] args) {  
        Inventory inventory = new Inventory(); // Create inventory instance  
        Scanner scanner = new Scanner(System.in);  
        boolean running = true;  
  
        while (running) {  
            System.out.println("Inventory Management System");  
            System.out.println("1. Add Item");  
            System.out.println("2. Display Items");  
            System.out.println("3. Remove Item");  
            System.out.println("4. Exit");  
            System.out.print("Choose an option: ");  
            int choice = scanner.nextInt();  
            scanner.nextLine(); // Consume newline  
  
            switch (choice) {  
                case 1:  
                    // Add an item  
                    System.out.print("Enter item name: ");  
                    String itemName = scanner.nextLine();  
                    System.out.print("Enter quantity: ");  
                    int quantity = scanner.nextInt();  
                    inventory.addItem(new Item(itemName, quantity)); // Create and add new item to inventory  
                    break;  
  
                case 2:  
                    // Display items  
                    inventory.displayItems(); // Show all items in inventory  
                    break;  
  
                case 3:  
                    // Remove an item  
                    System.out.print("Enter item name to remove: ");  
                    String removeItemName = scanner.nextLine();  
                    System.out.print("Enter quantity to remove: ");  
                    int removeQuantity = scanner.nextInt();  
                    inventory.removeItem(removeItemName, removeQuantity); // Attempt to remove specified quantity of item  
                    break;  
  
                case 4:  
                    // Exit the program  
                    running = false; // Exit the loop  
                    break;  
  
                default:  
                    System.out.println("Invalid option. Please try again."); // Handle invalid input  
            }  
        }  
  
        scanner.close(); // Close the scanner resource  
        System.out.println("Thank you for using the Inventory Management System!"); // Final message  
    }  
    
}
