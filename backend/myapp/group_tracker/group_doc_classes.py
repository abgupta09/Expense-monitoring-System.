from mongoengine import *

class Member(Document):
    name = StringField()
    email = EmailField()
    #to complete
    
    def to_json(self):
        return {
            "name": self.name,
            #to complete
        }
    
class Expenses(Document):
    name = StringField()
    amount = FloatField()
    date = DateTimeField()
    category = StringField()
    
    def to_json(self):
        return {
            "name": self.name,
            #to complete
        }
class Group(Document):
    group_name = StringField(max_length=50)
    memberIDs = ListField(StringField())
    group_expenses = ListField(StringField())
    
    def to_json(self):
        return {
            #to complete
        }