public class PrototypeDemo {
    public static void main(String[] args) {
        // Documento original
        Document original = new Document("Informe Inicial", "Contenido del informe.");
        System.out.println("Documento original:");
        original.showInfo();

        // Clonando el documento
        Document copia = original.clone();
        copia.setTitle("Informe Copiado");
        copia.setContent("Contenido modificado del informe copiado.");

        System.out.println("Documento clonado:");
        copia.showInfo();

        // Confirmamos que son objetos diferentes
        System.out.println("¿Son objetos diferentes? " + (original != copia));
    }
}
