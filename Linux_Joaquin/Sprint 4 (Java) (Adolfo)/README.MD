# 🏠 Home Automation System

A Java-based home automation system demonstrating the implementation of key design patterns for improved code structure, maintainability, and usability.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Design Patterns](#design-patterns)
- [System Components](#system-components)
- [Installation](#installation)
- [Usage](#usage)
- [Code Examples](#code-examples)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This project showcases a comprehensive home automation system built with Java, implementing three essential design patterns:

- **Singleton Pattern** - Ensures single instance of the automation controller
- **Builder Pattern** - Flexible object creation for complex configurations
- **Facade Pattern** - Simplified interface for complex subsystem interactions

The system manages lighting, security, and climate control through an intuitive interface that demonstrates best practices in software engineering.

## ✨ Features

### 🏠 **Smart Home Modes**
- **Home Mode**: Comfortable settings for daily living
- **Away Mode**: Energy-saving and security-focused configuration
- **Night Mode**: Optimized for sleep and security
- **Emergency Mode**: Maximum visibility and safety settings

### 💡 **Lighting System**
- Multiple light sources with individual configurations
- Customizable brightness levels (0-100%)
- Color temperature control (warm/cool/soft)
- Location-based light management
- Dimmable and non-dimmable light support

### 🔒 **Security System**
- Arm/Disarm functionality
- Multiple security modes (HOME/AWAY)
- Real-time status monitoring
- Integration with other subsystems

### 🌡️ **Climate Control**
- Temperature management
- Heating and cooling control
- Energy-saving modes
- Emergency safety features

### 📊 **System Monitoring**
- Real-time status reporting
- Component health checking
- System initialization tracking
- Comprehensive logging

## 🏗️ Design Patterns

### 🔄 Singleton Pattern
```java
AutomationController controller = AutomationController.getInstance();
```
- **Thread-safe implementation**
- **Single point of control**
- **State management**
- **Resource optimization**

### 🏗️ Builder Pattern
```java
LightSource light = new LightSource.Builder("warm white")
    .setLevel(75)
    .setLocation("Living Room")
    .setDimmable(true)
    .build();
```
- **Flexible object creation**
- **Optional parameters**
- **Method chaining**
- **Immutable objects**

### 🎭 Facade Pattern
```java
HomeSystemFacade home = new HomeSystemFacade();
home.activateHomeMode();
```
- **Simplified interface**
- **Complex operation encapsulation**
- **Subsystem coordination**
- **Reduced coupling**

## 🧩 System Components

| Component | Description | Pattern Used |
|-----------|-------------|--------------|
| `AutomationController` | Central system controller | Singleton |
| `LightSource` | Smart lighting management | Builder |
| `SecuritySystem` | Home security control | - |
| `TemperatureControl` | Climate management | - |
| `HomeSystemFacade` | Unified system interface | Facade |

## 🚀 Installation

### Prerequisites
- Java 8 or higher
- Java IDE (IntelliJ IDEA, Eclipse, VS Code)
- Basic understanding of Java and OOP concepts

### Setup Steps

1. **Clone or download the project files**
   ```bash
   # Create a new directory
   mkdir home-automation-system
   cd home-automation-system
   ```

2. **Copy the source code**
   - Copy the `HomeAutomationApp.java` file to your project directory

3. **Compile the program**
   ```bash
   javac HomeAutomationApp.java
   ```

4. **Run the application**
   ```bash
   java HomeAutomationApp
   ```

## 💻 Usage

### Basic Usage

```java
// Create the home system facade
HomeSystemFacade homeSystem = new HomeSystemFacade();

// Activate different modes
homeSystem.activateHomeMode();     // Comfortable daily settings
homeSystem.activateAwayMode();     // Energy-saving + security
homeSystem.activateNightMode();    // Sleep-optimized settings
homeSystem.emergencyMode();        // Maximum safety mode

// Monitor system status
homeSystem.showSystemStatus();

// Shutdown system
homeSystem.shutdownSystem();
```

### Advanced Configuration

```java
// Custom light configuration
LightSource customLight = new LightSource.Builder("blue")
    .setLevel(50)
    .setLocation("Bathroom")
    .setDimmable(false)
    .setStatus("ON")
    .build();

// Direct controller access
AutomationController controller = AutomationController.getInstance();
controller.initiateSystem();
```

## 📝 Code Examples

### Example 1: Creating Custom Lights
```java
// Kitchen light - bright and cool
LightSource kitchenLight = new LightSource.Builder("cool white")
    .setLevel(90)
    .setLocation("Kitchen")
    .setDimmable(false)
    .build();

// Bedroom light - soft and dimmable
LightSource bedroomLight = new LightSource.Builder("soft yellow")
    .setLevel(30)
    .setLocation("Bedroom")
    .setDimmable(true)
    .build();
```

### Example 2: System Mode Switching
```java
HomeSystemFacade home = new HomeSystemFacade();

// Morning routine
home.activateHomeMode();
home.showSystemStatus();

// Leaving house
home.activateAwayMode();

// Returning home
home.activateHomeMode();

// Bedtime
home.activateNightMode();
```

### Example 3: Singleton Verification
```java
AutomationController controller1 = AutomationController.getInstance();
AutomationController controller2 = AutomationController.getInstance();

// Verify same instance
System.out.println("Same instance: " + (controller1 == controller2));
// Output: Same instance: true
```

## 🏛️ Architecture

```
HomeAutomationApp
├── HomeSystemFacade (Facade Pattern)
│   ├── AutomationController (Singleton Pattern)
│   ├── LightSource (Builder Pattern)
│   │   └── Builder
│   ├── SecuritySystem
│   └── TemperatureControl
└── Main Application Logic
```

### Class Relationships
- **HomeSystemFacade** coordinates all subsystems
- **AutomationController** manages overall system state
- **LightSource** handles individual light configurations
- **SecuritySystem** manages home security features
- **TemperatureControl** handles climate management

## 🔧 Customization

### Adding New Light Types
```java
// Add new light with custom properties
LightSource rgbLight = new LightSource.Builder("RGB")
    .setLevel(80)
    .setLocation("Gaming Room")
    .setDimmable(true)
    .build();
```

### Extending the Facade
```java
// Add new methods to HomeSystemFacade
public void activatePartyMode() {
    // Custom party mode implementation
    controller.initiateSystem();
    // Set colorful lighting
    // Disable security temporarily
    // Adjust temperature for comfort
}
```

### Creating New Components
```java
class AudioSystem {
    private boolean enabled;
    private int volume;
    
    public void playMusic(String playlist) {
        // Implementation
    }
}
```

## 📊 Sample Output

```
=== Activating Home Mode ===
Home automation system initiated.
Configuring lights:
  LightSource{hue='warm white', level=75, status='ON', location='Living Room', dimmable=true}
  LightSource{hue='cool white', level=90, status='ON', location='Kitchen', dimmable=false}
  LightSource{hue='soft yellow', level=30, status='OFF', location='Bedroom', dimmable=true}
Security system disarmed.
Temperature set to 23°C
Home mode activated successfully!

=== System Status ===
Controller Status: Active
Security: Disarmed
Climate: 23°C (Off)
Lights configured and operational

Singleton verification: ✓ Same instance
```

## 🎓 Educational Value

This project demonstrates:

- **Design Pattern Implementation**: Real-world application of Singleton, Builder, and Facade patterns
- **Object-Oriented Programming**: Encapsulation, inheritance, and polymorphism principles
- **Code Organization**: Clean architecture and separation of concerns
- **Software Engineering**: Best practices for maintainable and extensible code
- **Java Features**: Advanced Java concepts and programming techniques

## 🤝 Contributing

This is an educational project. Suggestions for improvements:

1. **Fork the repository**
2. **Create a feature branch**
3. **Implement your changes**
4. **Add documentation**
5. **Submit a pull request**

### Ideas for Enhancement
- Add Observer pattern for event notifications
- Implement Strategy pattern for different automation algorithms
- Add Command pattern for undo/redo functionality
- Create Factory pattern for device creation
- Add persistence layer for settings storage

## 📚 Further Learning

### Related Design Patterns
- **Observer Pattern**: Event-driven notifications
- **Command Pattern**: Encapsulating requests as objects
- **Factory Pattern**: Object creation abstraction
- **Strategy Pattern**: Algorithm selection at runtime

### Recommended Reading
- "Design Patterns: Elements of Reusable Object-Oriented Software" by Gang of Four
- "Head First Design Patterns" by Freeman & Robson
- "Effective Java" by Joshua Bloch

