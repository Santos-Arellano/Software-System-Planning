package Inventory.Model;

import java.util.ArrayList;  
import java.util.List;  

public class Item {
    private String name;  
    private int quantity;  
  
    public Item(String name, int quantity) {  
        this.name = name;  
        this.quantity = quantity; // Set quantity when creating an item  
    }  
  
    public String getName() {  
        return name;  
    }  
  
    public int getQuantity() {  
        return quantity;  
    }  
  
    public void addQuantity(int amount) {  
        quantity += amount; // Increase item quantity  
    }  
  
    public void removeQuantity(int amount) {  
        if (quantity >= amount) {  
            quantity -= amount; // Decrease item quantity if enough stock  
        } else {  
            System.out.println("Not enough stock to remove."); // Handle insufficient stock  
        }  
    }  
}
