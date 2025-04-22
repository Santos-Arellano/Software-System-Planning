import sys
import os
import datetime

def save_question(user, question):
    history_dir = "/app/history"
    
    if not os.path.exists(history_dir):
        os.makedirs(history_dir)
    
    history_file = os.path.join(history_dir, "questions_history.txt")
    
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    entry = f"[{current_time}] {user}: {question}\n"
    
    with open(history_file, "a") as f:
        f.write(entry)
    
    print(f"Pregunta guardada en el historial para el usuario: {user}")

def main():

    if len(sys.argv) < 3:
        print("Uso: python app.py <usuario> <pregunta>")
        sys.exit(1)
    
    user = sys.argv[1]

    question = " ".join(sys.argv[2:])
    
    save_question(user, question)

if __name__ == "__main__":
    main()