import mongoengine as db
import certifi
import os
from dotenv import load_dotenv

load_dotenv()

# Replace PASSWORD with your actual MongoDB password
password = os.getenv("password")

# Use "testDb" as the database name
dataBase_name = "ExpenseManagDB"

DB_URI = "mongodb+srv://abgupta:{}@cluster0.u08th6y.mongodb.net/{}?retryWrites=true&w=majority".format(password, dataBase_name)

db.connect(host=DB_URI, tlsCAFile=certifi.where())

class User(db.Document):
    username = db.StringField(required=True, unique=True)
    password = db.StringField(required=True)  # Make sure to hash the password before saving
    token = db.StringField()  # JWT token for user authentication, optional depending on your setup
    budget = db.FloatField(default=0)

    def to_json(self):
        return {
            "user_id": str(self.id),
            "username": self.username,
            "budget": self.budget
            # Note: It's a good idea NOT to return the hashed password or token in a toJSON method
        }

class Expense(db.Document):
    userId = db.ReferenceField(User, required=True)
    name = db.StringField(required=True)
    cost = db.FloatField(required=True)
    date = db.DateTimeField(required=True)  # Using DateTimeField to store datetime information

    meta = {
        'indexes': [
            'name',
            'date',
            ('userId', 'date')
        ]
    }

    def to_json(self):
        return {
            "expense_id": str(self.id),
            "user_id": str(self.userId.id),
            "name": self.name,
            "cost": self.cost,
            "date": self.date.strftime('%Y-%m-%d')  # Converting datetime to string in 'YYYY-MM-DD' format
        }
