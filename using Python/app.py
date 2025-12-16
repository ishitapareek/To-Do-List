from flask import Flask, render_template, request, redirect, url_for, session
import pymysql
pymysql.install_as_MySQLdb()
from flask_mysqldb import MySQL
from pymysql.cursors import DictCursor

app = Flask(__name__)
app.secret_key = '12345'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'admin'  
app.config['MYSQL_DB'] = 'to_do_list'

mysql = MySQL(app)

#signup
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        cursor = mysql.connection.cursor(DictCursor)

        # 🔍 Check if username already exists
        cursor.execute("SELECT * FROM Login_Info WHERE Username = %s", (username,))
        existing_user = cursor.fetchone()

        if existing_user:
            return render_template("sign-up-page.html", error="Username already exists. Please choose another.")

        # ✅ Insert new user
        cursor.execute("INSERT INTO Login_Info (Username, Password) VALUES (%s, %s)", (username, password))
        mysql.connection.commit()

        return redirect(url_for('login'))

    return render_template("sign-up-page.html")



#login
@app.route('/login', methods = ['GET', 'POST'])

def login():

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        cursor = mysql.connection.cursor(DictCursor)
        cursor.execute("SELECT * FROM Login_Info WHERE Username = %s AND Password = %s", (username, password))
        user = cursor.fetchone()

        if user:
            session['username'] = user['Username']  #store username in session
            return redirect(url_for('todo'))
        
        else:
            return render_template("login-page.html", error = "Incorrect username or password.")

    return render_template("login-page.html")


#forgot password
@app.route('/forgot', methods = ['GET', 'POST'])

def forgot():
    message = None

    if request.method == 'POST':
        username = request.form['username']
        new_password = request.form['new_password']

        cursor = mysql.connection.cursor()
        cursor.execute("UPDATE Login_Info SET  Password = %s WHERE Username = %s", (new_password, username))
        mysql.connection.commit()

        if cursor.rowcount:
            message = "Password changed. <a href='/login'>Log in</a> again."

        else:
            message = "Username does not exist."

    return render_template("forgot-page.html", message = message)


#homepage
@app.route('/', methods = ['GET', 'POST'])

def todo():
    if 'username' not in session:
        return redirect(url_for('login'))

    username = session['username']
    cursor = mysql.connection.cursor(DictCursor)

    #handle form submission
    if request.method == 'POST':
        task = request.form.get('task')
        status = request.form.get('status')
        completion_date = request.form.get('completion_date') or None

        if task:  #insert if task is not empty
            cursor.execute(
                "INSERT INTO Tasks (Task, Username, Status, Completion_Date) VALUES (%s, %s, %s, %s)",
                (task, username, status, completion_date)
            )

            mysql.connection.commit()

    #fetch tasks for logged-in user
    cursor.execute(
        "SELECT id, Task, Status, Completion_Date FROM Tasks WHERE Username = %s ORDER BY id DESC",
        [username]
    )

    tasks = cursor.fetchall()

    return render_template("to-do-list.html", tasks = tasks)


#delete
@app.route('/delete/<int:task_id>', methods = ['GET', 'POST'])

def delete(task_id):
    if 'username' not in session:
        return redirect(url_for('login'))

    username = session['username']
    cursor = mysql.connection.cursor()
    cursor.execute("DELETE FROM Tasks WHERE id = %s AND Username = %s", (task_id, username))
    mysql.connection.commit()

    return redirect(url_for('todo'))


#logout
@app.route('/logout', methods = ['POST'])

def logout():
    session.clear()
    return redirect(url_for('login'))


#update
@app.route('/edit/<int:task_id>', methods = ['POST', 'GET'])

def edit(task_id):
    if 'username' not in session:
        return redirect(url_for('login'))

    cursor = mysql.connection.cursor(DictCursor)

    if request.method == 'GET':
        #show edit form
        cursor.execute("SELECT * FROM Tasks WHERE id = %s AND Username = %s", (task_id, session['username']))
        task = cursor.fetchone()
        return render_template('edit-task.html', task=task)

    #handle form submit
    new_text = request.form['task']
    new_status = request.form['status']
    new_date = request.form['completion_date'] or None

    cursor.execute(
        "UPDATE Tasks SET Task = %s, Status = %s, Completion_Date = %s WHERE id = %s AND Username = %s",
        (new_text, new_status, new_date, task_id, session['username'])
    )
    
    mysql.connection.commit()
    return redirect(url_for('todo'))



if __name__ == '__main__':
    app.run(debug = True)