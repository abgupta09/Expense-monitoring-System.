# Expense-monitoring-System

_The main purpose of a Personal Expense Monitoring system is to provide users with a comprehensive and interactive platform to monitor, track, categorize, and analyze their expenses by setting a budget limit monthly or yearly. This also helps the user study and track their spending patterns and revisit their spending on a monthly or yearly basis._

The is a Expense Monitoring system is to provide users with a comprehensive and interactive platform to monitor, track, categorize, and analyze their expenses by setting a budget limit monthly. This also helps the user study and track their spending patterns and revisit their spending on a monthly or yearly basis. The Group allows users to create a group for managing group expense.

The Group expenses manger supports various split method based on which the an expense can be added to group. These split method allows user to settle their expenses and get the payment summary details.

The dashboard analytics will provide the details of your personal spending summary based on time series and spending category. This will help user inculcate a healthy spending habit which might lead financial security.

### To run this project follow the guidelines mention below:

- `Frontend` : The frontend is `react` based application. Go to the frontend folder and check the README file in it and follow the process.
- `Backend` : The backend is a `flask` restful webservices. Follow the instruction in the readme file there to make the server up and running.

## Deoplyment Processs:

1. Add Procfile in root directory: `web: gunicorn --chdir backend/myapp app:app`
2. Add requirements.txt in the root directory.
3. Got to front end and execute `npm run build`.
4. Ensure that build in not in .gitignore
5. Initialize git from root folder: `git init`
6. Create a heroku app: `heroku create`
7. Add the changes in git heroku and commit.
8. Push the changes to to heroku main: `git push heroku abhi/deployment-test:main`
9. Open heroku app: `heroku open`
10. Debug options:
    1. logs details: `heroku logs --tail -a serene-atoll-75134`
    2. process info: `heroku ps -a serene-atoll-75134`
    3. heroku bash access: `heroku run bash`

## app.py modification:

`pip install gunicorn`

`app = Flask(__name__, static_folder='/app/frontend/build', static_url_path='')`

Add serve api to deploy in heroku:

```python
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
```

Both frontend and backend are deployed on `Heroku` Salesforce server.

- Deplyment link: \***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***

### Team :

1. Abhishek Gupta
2. Jiuzhou Lu
3. Haolong Yang
4. Julia P
5. Siddharth Krishnakumar
