from flask import Flask, render_template, request, redirect, url_for
import mysql.connector
import os

app = Flask(__name__)

def get_db_connection():
    connection = mysql.connector.connect(
        host=os.getenv('MYSQL_HOST', 'db'),
        user=os.getenv('MYSQL_USER', 'admin'),
        password=os.getenv('MYSQL_PASSWORD', 'example'),
        database=os.getenv('MYSQL_DATABASE', 'testdb')
    )
    return connection

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT 1")
        result = cursor.fetchone()
        # Read the remaining result set to avoid "Unread result found" error
        while cursor.nextset():
            pass
        cursor.close()
        connection.close()
        return render_template('success.html', message="Login to database successful!")
    except mysql.connector.Error as err:
        return render_template('index.html', error=str(err))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
