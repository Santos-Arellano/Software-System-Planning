public class FacadeDemo {
    public static void main(String[] args) {
        ComputerFacade computer = new ComputerFacade();
        System.out.println("Iniciando computadora usando el patrón Facade:");
        computer.startComputer();
    }
}
