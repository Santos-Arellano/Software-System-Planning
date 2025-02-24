class Nakama:
    def __init__(self, name, role, crew):
        self.__name = name
        self.__role = role
        self.__crew = crew

    # Getters
    def get_name(self):
        return self.__name

    def get_role(self):
        return self.__role

    def get_crew(self):
        return self.__crew

    # Setters
    def set_name(self, name):
        self.__name = name

    def set_role(self, role):
        self.__role = role

    def set_crew(self, crew):
        self.__crew = crew

    # Dictionary representation for Firebase
    def create_dictionary(self):
        return {
            "name": self.__name,
            "role": self.__role,
            "crew": self.__crew
        }


