// Interfaz Cloneable para permitir la clonación
public class Document implements Cloneable {
    private String title;
    private String content;

    public Document(String title, String content) {
        this.title = title;
        this.content = content;
    }

    // Método para mostrar la información del documento
    public void showInfo() {
        System.out.println("Título: " + title);
        System.out.println("Contenido: " + content);
        System.out.println("---------------------------");
    }

    // Método para clonar el objeto
    @Override
    public Document clone() {
        try {
            return (Document) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException("No se pudo clonar el objeto");
        }
    }

    // Setters para modificar después de clonar
    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
