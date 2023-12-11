import json
import mongoengine as db
from datetime import datetime
import certifi

# Define your ExpenseMock model here (as you did in your Flask app)
class MockExpense(db.Document):
    user_id = db.StringField(required=True)
    amount = db.FloatField(required=True)
    name = db.StringField(required=True)
    date = db.DateTimeField(default=datetime.utcnow)
    category = db.StringField(required=True)  # Additional string field 'category'

    def to_json(self):
        return {
            "expense_mock_id": str(self.id),
            "user_id": str(self.user_id.id),
            "amount": self.amount,
            "name": self.name,
            "date": self.date.strftime('%Y-%m-%d'),
            "category": self.category
        }

# Connect to MongoDB using mongoengine
password =  "IcWKBLzlI8shsDHO" #os.getenv("password")
dataBase_name = "ExpenseManagDB"
DB_URI = "mongodb+srv://abgupta:{}@cluster0.u08th6y.mongodb.net/{}?retryWrites=true&w=majority".format(password, dataBase_name)
db.connect(host=DB_URI, tlsCAFile=certifi.where())

#MockExpense.objects.delete()
#print("Data refresh complete.")

# Read the JSON file
with open('/Users/jiuzhoulu/Documents/courses/673/MOCK_DATA.json', 'r') as file:
    data = json.load(file)

# Import data
for item in data:
    expense = MockExpense(
        user_id=item['user_id'],
        amount=item['amount'],
        name=item['name'],
        date=datetime.strptime(item['date'], '%m/%d/%Y'),
        category=item['category']
    )
    expense.save()

print("Data import complete.")
