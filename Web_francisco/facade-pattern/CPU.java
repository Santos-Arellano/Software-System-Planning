public class CPU {
    public void freeze() {
        System.out.println("CPU congelada...");
    }

    public void jump(long position) {
        System.out.println("CPU salta a la posición " + position);
    }

    public void execute() {
        System.out.println("CPU ejecutando instrucciones...");
    }
}
