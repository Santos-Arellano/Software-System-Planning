from model.Objects.Nakama import Nakama
from dbConnection.FirebaseConnection import FirebaseConnection

class NakamaDAO:
    def __init__(self):
        self.firebase_connection = FirebaseConnection()  # Initialize connection
        if self.firebase_connection.db is not None:
            self.nakama_ref = self.firebase_connection.db.collection('nakamas')  # Set reference to the collection
        else:
            self.nakama_ref = None  # In case the connection could not be established

    def add_nakama(self, nakama):
        if self.nakama_ref is None:
            print("❌ Cannot connect to Firebase....")
            return

        try:
            if not isinstance(nakama, Nakama):
                raise ValueError("❌ The object is not an instance of Nakama")
            self.nakama_ref.add(nakama.create_dictionary())  # Add to Firebase
        except Exception as e:
            print(f"❌ Error adding Nakama: {e}")

    # Method to get all Nakamas
    def get_nakamas(self):
        if self.nakama_ref is None:
            print("❌ Cannot connect to Firebase.....")
            return []

        try:
            return [doc.create_dictionary() for doc in self.nakama_ref.stream()]
        except Exception as e:
            print(f"❌ Error retrieving Nakamas from Firebase: {e}")
            return []
