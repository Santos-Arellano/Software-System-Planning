package Inventory.Model;

import java.util.ArrayList;  
import java.util.List;  

public class Inventory {  
    private List<Item> items;  
  
    public Inventory() {  
        items = new ArrayList<>(); // Initialize items list  
    }  
  
    public void addItem(Item item) {  
        items.add(item); // Add item to inventory  
    }  
  
    public void displayItems() {  
        System.out.println("Current Inventory:");  
        for (Item item : items) {  
            System.out.println(item.getName() + " - Quantity: " + item.getQuantity()); // Display item details  
        }  
    }  
  
    public void removeItem(String itemName, int quantity) {  
        for (Item item : items) {  
            if (item.getName().equals(itemName)) {  
                item.removeQuantity(quantity); // Attempt to remove the specified quantity  
                return;  
            }  
        }  
        System.out.println("Item not found in inventory."); // Handle item not found  
    }  
}  