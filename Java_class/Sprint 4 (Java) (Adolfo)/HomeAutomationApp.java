// Singleton Pattern - AutomationController
class AutomationController {
    private static AutomationController instance;
    private boolean systemInitiated = false;
    
    private AutomationController() {
        // Private constructor to prevent direct instantiation
    }
    
    public static synchronized AutomationController getInstance() {
        if (instance == null) {
            instance = new AutomationController();
        }
        return instance;
    }
    
    public void initiateSystem() {
        if (!systemInitiated) {
            System.out.println("Home automation system initiated.");
            systemInitiated = true;
        } else {
            System.out.println("System already initiated.");
        }
    }
    
    public void shutdownSystem() {
        System.out.println("Home automation system shutdown.");
        systemInitiated = false;
    }
    
    public boolean isSystemInitiated() {
        return systemInitiated;
    }
}

// Builder Pattern - LightSource (Enhanced)
class LightSource {
    private final String hue;
    private final int level;
    private final String status;
    private final String location;
    private final boolean dimmable;
    
    private LightSource(Builder builder) {
        this.hue = builder.hue;
        this.level = builder.level;
        this.status = builder.status;
        this.location = builder.location;
        this.dimmable = builder.dimmable;
    }
    
    public static class Builder {
        private String hue;
        private int level = 50; // Default level
        private String status = "OFF"; // Default status
        private String location = "Unknown"; // Default location
        private boolean dimmable = true; // Default dimmable
        
        public Builder(String hue) {
            this.hue = hue;
        }
        
        public Builder setLevel(int level) {
            if (level >= 0 && level <= 100) {
                this.level = level;
            }
            return this;
        }
        
        public Builder setStatus(String status) {
            this.status = status;
            return this;
        }
        
        public Builder setLocation(String location) {
            this.location = location;
            return this;
        }
        
        public Builder setDimmable(boolean dimmable) {
            this.dimmable = dimmable;
            return this;
        }
        
        public LightSource build() {
            return new LightSource(this);
        }
    }
    
    // Getters
    public String getHue() { return hue; }
    public int getLevel() { return level; }
    public String getStatus() { return status; }
    public String getLocation() { return location; }
    public boolean isDimmable() { return dimmable; }
    
    @Override
    public String toString() {
        return "LightSource{" +
                "hue='" + hue + '\'' +
                ", level=" + level +
                ", status='" + status + '\'' +
                ", location='" + location + '\'' +
                ", dimmable=" + dimmable +
                '}';
    }
}

// Additional component for demonstration
class SecuritySystem {
    private boolean armed;
    private String mode;
    
    public SecuritySystem() {
        this.armed = false;
        this.mode = "HOME";
    }
    
    public void arm(String mode) {
        this.armed = true;
        this.mode = mode;
        System.out.println("Security system armed in " + mode + " mode.");
    }
    
    public void disarm() {
        this.armed = false;
        System.out.println("Security system disarmed.");
    }
    
    public boolean isArmed() { return armed; }
    public String getMode() { return mode; }
}

class TemperatureControl {
    private int temperature;
    private boolean heating;
    private boolean cooling;
    
    public TemperatureControl() {
        this.temperature = 22; // Default 22°C
        this.heating = false;
        this.cooling = false;
    }
    
    public void setTemperature(int temp) {
        this.temperature = temp;
        System.out.println("Temperature set to " + temp + "°C");
    }
    
    public void enableHeating() {
        this.heating = true;
        this.cooling = false;
        System.out.println("Heating enabled.");
    }
    
    public void enableCooling() {
        this.cooling = true;
        this.heating = false;
        System.out.println("Cooling enabled.");
    }
    
    public void turnOff() {
        this.heating = false;
        this.cooling = false;
        System.out.println("Temperature control turned off.");
    }
    
    public int getTemperature() { return temperature; }
    public boolean isHeating() { return heating; }
    public boolean isCooling() { return cooling; }
}

// Facade Pattern - HomeSystemFacade
class HomeSystemFacade {
    private final AutomationController controller;
    private final LightSource livingRoomLight;
    private final LightSource kitchenLight;
    private final LightSource bedroomLight;
    private final SecuritySystem security;
    private final TemperatureControl climate;
    
    public HomeSystemFacade() {
        this.controller = AutomationController.getInstance();
        
        // Create different lights using Builder pattern
        this.livingRoomLight = new LightSource.Builder("warm white")
                .setLevel(75)
                .setStatus("ON")
                .setLocation("Living Room")
                .setDimmable(true)
                .build();
                
        this.kitchenLight = new LightSource.Builder("cool white")
                .setLevel(90)
                .setStatus("ON")
                .setLocation("Kitchen")
                .setDimmable(false)
                .build();
                
        this.bedroomLight = new LightSource.Builder("soft yellow")
                .setLevel(30)
                .setStatus("OFF")
                .setLocation("Bedroom")
                .setDimmable(true)
                .build();
        
        this.security = new SecuritySystem();
        this.climate = new TemperatureControl();
    }
    
    // Facade methods for common operations
    public void activateHomeMode() {
        System.out.println("=== Activating Home Mode ===");
        controller.initiateSystem();
        System.out.println("Configuring lights:");
        System.out.println("  " + livingRoomLight);
        System.out.println("  " + kitchenLight);
        System.out.println("  " + bedroomLight);
        security.disarm();
        climate.setTemperature(23);
        System.out.println("Home mode activated successfully!\n");
    }
    
    public void activateAwayMode() {
        System.out.println("=== Activating Away Mode ===");
        controller.initiateSystem();
        System.out.println("Turning off all lights for energy saving...");
        security.arm("AWAY");
        climate.setTemperature(18); // Energy saving temperature
        System.out.println("Away mode activated successfully!\n");
    }
    
    public void activateNightMode() {
        System.out.println("=== Activating Night Mode ===");
        controller.initiateSystem();
        System.out.println("Setting bedroom light for night mode:");
        System.out.println("  " + bedroomLight);
        security.arm("HOME");
        climate.setTemperature(20);
        System.out.println("Night mode activated successfully!\n");
    }
    
    public void emergencyMode() {
        System.out.println("=== EMERGENCY MODE ACTIVATED ===");
        controller.initiateSystem();
        System.out.println("All lights set to maximum brightness!");
        security.disarm(); // Allow easy exit
        climate.turnOff(); // Safety first
        System.out.println("Emergency mode active - all systems ready!\n");
    }
    
    public void showSystemStatus() {
        System.out.println("=== System Status ===");
        System.out.println("Controller Status: " + (controller.isSystemInitiated() ? "Active" : "Inactive"));
        System.out.println("Security: " + (security.isArmed() ? "Armed (" + security.getMode() + ")" : "Disarmed"));
        System.out.println("Climate: " + climate.getTemperature() + "°C " + 
                          (climate.isHeating() ? "(Heating)" : climate.isCooling() ? "(Cooling)" : "(Off)"));
        System.out.println("Lights configured and operational\n");
    }
    
    public void shutdownSystem() {
        System.out.println("=== Shutting Down Home System ===");
        security.disarm();
        climate.turnOff();
        controller.shutdownSystem();
        System.out.println("All systems shutdown successfully!\n");
    }
}

// Main application class
public class HomeAutomationApp {
    public static void main(String[] args) {
        // Using Facade pattern for simplified interaction
        HomeSystemFacade homeSystem = new HomeSystemFacade();
        
        // Demonstrate different scenarios
        homeSystem.activateHomeMode();
        homeSystem.showSystemStatus();
        
        homeSystem.activateAwayMode();
        homeSystem.showSystemStatus();
        
        homeSystem.activateNightMode();
        homeSystem.showSystemStatus();
        
        homeSystem.emergencyMode();
        homeSystem.showSystemStatus();
        
        homeSystem.shutdownSystem();
        
        // Demonstrate Singleton pattern - same instance
        AutomationController controller1 = AutomationController.getInstance();
        AutomationController controller2 = AutomationController.getInstance();
        System.out.println("Singleton verification: " + (controller1 == controller2 ? "✓ Same instance" : "✗ Different instances"));
    }
}