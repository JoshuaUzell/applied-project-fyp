from pymongo import MongoClient # Database services
from user import User # User model
from dotenv import load_dotenv # Loading environment variables
import os
load_dotenv()
# String connection and database name
URI = os.getenv("MONGO_URI")
MONGO_DATABASE = "ShareWay"

# Create a new client and connect to the server
def connect_to_database():
    try:
        client = MongoClient(URI)
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        return client
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        return None

# Adding user to Database
def add_user(user, client):
    if not client:
        return

    with client as db_client:
        db = db_client[MONGO_DATABASE]
        users_collection = db.Users

        user_data = {
            "email": user.email,
            "password": user.password_hash,
            "username": user.name,
            "name": user.name,
            "dob": user.dob,
            "gender": user.gender,
            "course": user.course,
            "college_year": user.college_year,
            "smoker": user.smoker,
            "traits": user.traits,
            "hobbies": user.hobbies
        }

        users_collection.insert_one(user_data)
        print(f"User {user.name} added successfully.")

if __name__ == "__main__":
    # Example of creating and adding a user
    new_user = User(
        email="mary@example.com",
        password="user_password",
        name="Mary Higgins",
        dob="1995-08-22",
        gender="Female",
        course="Biology",
        college_year=2,
        smoker=False,
        traits=["Friendly", "Organized", "Adventurous"],
        hobbies=["Reading", "Traveling", "Photography"]
    )

    database_client = connect_to_database()
    add_user(new_user, database_client)
