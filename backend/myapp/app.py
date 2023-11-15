from flask import Flask, request, jsonify
import mongoengine as db
import bcrypt
import certifi
import jwt
from datetime import datetime, timedelta
from jwt import ExpiredSignatureError, DecodeError
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()



app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Connect to MongoDB using mongoengine
password =  "IcWKBLzlI8shsDHO" #os.getenv("password")
dataBase_name = "ExpenseManagDB"
DB_URI = "mongodb+srv://abgupta:{}@cluster0.u08th6y.mongodb.net/{}?retryWrites=true&w=majority".format(password, dataBase_name)
db.connect(host=DB_URI, tlsCAFile=certifi.where())

# key and config
SECRET_KEY = "your_secret_key_here" 
app.config['SECRET_KEY'] = "your_secret_key_here"

# User Model
class User(db.Document):
    username = db.StringField(required=True, unique=True)
    password = db.StringField(required=True)
    first_name = db.StringField(required=True)
    last_name = db.StringField(required=True)
    email = db.EmailField(required=True, unique=True)
    
    def to_json(self):
        return {
            "user_id": str(self.id),
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email
        }
    
class PersonalExpense(db.Document):
    user_id = db.ReferenceField(User, required=True)
    amount = db.FloatField(required=True)
    name = db.StringField(required=True)
    date = db.DateTimeField(default=datetime.utcnow)

    def to_json(self):
        return {
            "expense_id": str(self.id),
            "user_id": str(self.user_id.id),
            "amount": self.amount,
            "name": self.name,
            "date": self.date.strftime('%Y-%m-%d')
        }



@app.route('/api/users/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    plain_password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    
    # Checking if the user already exists based on username or email
    existing_user = User.objects(db.Q(username=username) | db.Q(email=email)).first()
    if existing_user:
        return jsonify({"success": False, "message": "User with that username or email already exists"}), 400
    
    # Hashing the password before saving
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(plain_password.encode('utf-8'), salt)
    
    # Create new user
    new_user = User(
        username=username,
        password=hashed_password.decode('utf-8'),
        first_name=first_name,
        last_name=last_name,
        email=email
    ).save()
    
    # Generate JWT token
    token_payload = {
        "user_id": str(new_user.id),
        "username": new_user.username,
        # Token expires after 24 hours
        "exp": datetime.utcnow() + timedelta(hours=24)  
    }
    token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")
    
    return jsonify({"success": True, "message": "User registered successfully", "token": token, "data": new_user.to_json()}), 201



@app.route('/api/verify_token', methods=['POST'])
def verify_token():
    data = request.get_json()
    token = data.get('token')

    if not token:
        return jsonify({"success": False, "message": "Token is missing"}), 400

    try:
        # decode the token
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return jsonify({"success": True, "message": "Token is valid", "user_id": decoded_token["user_id"]}), 200
    except ExpiredSignatureError:
        return jsonify({"success": False, "message": "Token has expired"}), 401
    except DecodeError:
        return jsonify({"success": False, "message": "Token is invalid"}), 401


@app.route('/api/users/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # Check if the user exists
    user = User.objects(username=username).first()
    
    if not user:
        return jsonify({"success": False, "message": "Invalid username or password"}), 404
    
    # Validate the password
    if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        # If valid password, generate and send JWT token
        token = jwt.encode({"user_id": str(user.id)}, app.config['SECRET_KEY'])
        return jsonify({"success": True, "token": token, "data": user.to_json()}), 200
    else:
        return jsonify({"success": False, "message": "Invalid username or password"}), 401


def get_user_id_from_token(token):
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded_token["user_id"]
    except (ExpiredSignatureError, DecodeError):
        return None


@app.route('/api/personal_expenses/add', methods=['POST'])
def add_expense():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"success": False, "message": "Authentication token is missing"}), 401

    user_id = get_user_id_from_token(token)
    if not user_id:
        return jsonify({"success": False, "message": "Invalid or expired token"}), 401

    data = request.get_json()
    amount = data.get('amount')
    name = data.get('name')
    date = data.get('date', datetime.utcnow())

    if not amount or not name:
        return jsonify({"success": False, "message": "Amount and name are required"}), 400

    user = User.objects(id=user_id).first()
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    try:
        if isinstance(date, str):
            date = datetime.strptime(date, '%Y-%m-%d')
    except ValueError:
        return jsonify({"success": False, "message": "Invalid date format. Use YYYY-MM-DD"}), 400

    new_expense = PersonalExpense(user_id=user, amount=amount, name=name, date=date).save()
    return jsonify({"success": True, "message": "Expense added successfully", "data": new_expense.to_json()}), 201




if __name__ == '__main__':
    app.run(debug=True)

