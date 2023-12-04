# User data model used for new users in the registration page
import bcrypt

class User:
    def __init__(self, email, password, name, dob, gender, course, college_year, smoker, traits, hobbies):
        self.email = email
        self.password_hash = self.hash_password(password)
        self.name = name
        self.dob = dob
        self.gender = gender
        self.course = course
        self.college_year = college_year
        self.smoker = smoker
        self.traits = traits
        self.hobbies = hobbies

    def hash_password(self, password):
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash)
