# To-Do List App 📝

A full-stack To-Do List web application built in two versions — a **vanilla JavaScript** frontend-only version and a **Python (Flask) + MySQL** backend version.

---

## 📁 Project Structure

```
To-Do-List-master/
│
├── using JS/                        # Frontend-only version
│   ├── login-page/                  # Login (localStorage-based)
│   ├── sign-up-page/                # Sign-up (localStorage-based)
│   ├── forgot-password-page/        # Password reset page
│   └── home-page/                   # Task manager UI
│       ├── to-do-list.html
│       ├── to-do-list.js            # Core task logic (localStorage)
│       ├── to-do-list.css
│       ├── misc/list-database.js    # Experimental MySQL2 integration
│       └── icons/                   # Edit & delete icons
│
├── using Python/                    # Full-stack Flask version
│   ├── app.py                       # Flask backend (routes & MySQL logic)
│   ├── to-do-list.sql               # Database schema & seed data
│   ├── templates/                   # Jinja2 HTML templates
│   │   ├── login-page.html
│   │   ├── sign-up-page.html
│   │   ├── forgot-page.html
│   │   ├── to-do-list.html
│   │   └── edit-task.html
│   └── static/                      # CSS & icons
│
├── Flowchart.drawio
├── Functional Diagram.drawio
├── Pseudocode.docx
└── Report File.docx
```

---

## ✨ Features

- **User Authentication** — Sign up, log in, log out, and reset forgotten passwords
- **Per-user Task Isolation** — Each user only sees their own tasks
- **Add Tasks** — Create tasks with a status and optional completion date
- **Edit Tasks** — Inline editing of task text, status, and due date
- **Delete Tasks** — Remove individual tasks or clear all at once
- **Task Status Tracking** — Mark tasks as Not Started, In Progress, or Completed
- **Session Management** — Server-side sessions keep users logged in (Flask version)

---

## 🛠️ Tech Stack

### JavaScript Version
| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Storage | `localStorage` (browser-based) |

### Python Version
| Layer | Technology |
|---|---|
| Backend | Python, Flask |
| Database | MySQL (via `flask-mysqldb` + `pymysql`) |
| Frontend | HTML, CSS, Jinja2 templates |

---

## 🚀 Getting Started

### JavaScript Version

No server required — just open in a browser.

1. Navigate to `using JS/sign-up-page/sign-up-page.html` to create an account
2. Log in via `using JS/login-page/login-page.html`
3. Manage tasks on the home page

> User credentials and tasks are stored in `localStorage`. Clearing browser storage will reset all data.

---

### Python (Flask) Version

#### Prerequisites
- Python 3.x
- MySQL server running locally
- `pip` packages: `flask`, `flask-mysqldb`, `pymysql`

#### Setup

1. **Install dependencies**
   ```bash
   pip install flask flask-mysqldb pymysql
   ```

2. **Set up the database**

   Open MySQL and run the schema file:
   ```bash
   mysql -u root -p < "using Python/to-do-list.sql"
   ```

3. **Configure the app**

   Open `using Python/app.py` and update the database credentials:
   ```python
   app.config['MYSQL_HOST'] = 'localhost'
   app.config['MYSQL_USER'] = 'root'
   app.config['MYSQL_PASSWORD'] = 'your_password'
   app.config['MYSQL_DB'] = 'to_do_list'
   ```

4. **Run the app**
   ```bash
   cd "using Python"
   python app.py
   ```

5. Visit `http://127.0.0.1:5000` in your browser

---

## 🗄️ Database Schema

```sql
CREATE TABLE Login_Info (
    Username VARCHAR(500),
    Password VARCHAR(500)
);

CREATE TABLE Tasks (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    Task            VARCHAR(500),
    Status          VARCHAR(500),
    Completion_Date DATE,
    Username        VARCHAR(500)
);
```

---

## 📄 Documentation

The repo includes supporting project documents:

- `Flowchart.drawio` — Application flow diagram
- `Functional Diagram.drawio` — Functional architecture
- `Pseudocode.docx` — Logic pseudocode
- `Report File.docx` — Full project report

---

## ⚠️ Notes

- Passwords are stored in plain text in the current implementation. For production use, hash passwords with `bcrypt` or `werkzeug.security`.
- The `app.secret_key` in `app.py` should be replaced with a strong key before deployment.
