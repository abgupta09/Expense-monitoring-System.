from flask import Flask
from flask_mongoengine import MongoEngine
from constants import *
#init app
app = Flask(__name__)
db = MongoEngine()
db.init_app()

#connect to mongodb database
app.config["MONGODB_HOST"] = DB_URL

#

if __name__ == '__main__':
    app.run()