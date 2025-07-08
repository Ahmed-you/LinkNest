# LinkNest Backend

Welcome to the **LinkNest** backend project! This backend handles user authentication (local and Google OAuth), secure session management with JWT, and basic CRUD operations for categories and links.

---

##  Tech Stack

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **Passport.js** (Google OAuth)
* **JWT (jsonwebtoken)**
* **CSRF Protection (csurf)**

---

##  Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/linknest.git
cd linknest
```

Install dependencies:

```bash
npm install
```

3. Setup `.env` file:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/yourdbname
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

4. Run the database build script (adjust for your setup):

```bash
psql -U your_username -d yourdbname -f server/database/config/build.sql
```

5. Start the server:

```bash
npm run dev
```

---

##  Available Routes

### Auth Routes (`/api/auth`)

| Route              | Method | Protected | Description           |
| ------------------ | ------ | --------- | --------------------- |
| `/register`        | POST   | No        | Register new user     |
| `/login`           | POST   | No        | User login            |
| `/logout`          | POST   | No        | Clear token           |
| `/google`          | GET    | No        | Google OAuth login    |
| `/google/callback` | GET    | No        | Google OAuth callback |
| `/csrf-token`      | GET    | No        | Get CSRF token        |

### User Routes (`/api/dashboard`)

| Route        | Method | Protected | Description         |
| ------------ | ------ | --------- | ------------------- |
| `/dashboard` | GET    | ✅ Yes     | Protected dashboard |
|              |        |           |                     |

### Categories Routes (`/api/categories`)

| Route             | Method | Protected | Description           |
| ----------------- | ------ | --------- | --------------------- |
| `/categories`     | GET    | ✅ Yes     | Get all categories    |
| `/categories`     | POST   | ✅ Yes     | Create new category   |
| `/categories/:id` | PUT    | ✅ Yes     | Update category by ID |
| `/categories/:id` | DELETE | ✅ Yes     | Delete category by ID |

### Links Routes (`/api/links`)

| Route                | Method | Protected | Description              |
| -------------------- | ------ | --------- | ------------------------ |
| `/links/:categoryId` | GET    | ✅ Yes     | Get links by category ID |
| `/links/:categoryId` | POST   | ✅ Yes     | Create link in category  |
| `/links/:id`         | PUT    | ✅ Yes     | Update link by ID        |
| `/links/:id`         | DELETE | ✅ Yes     | Delete link by ID        |

---

##  Security Features

* Passwords hashed using **bcrypt**.
* CSRF protection with **csurf**.
* JWT stored in **HttpOnly cookies**.
* Helmet for HTTP headers.
* Rate limiting.

---

##  To Improve or Add (Suggestions)

* Write automated tests (Jest, Supertest).

---

##  📄 License

MIT License. Feel free to use and improve!

---

**Developed by: ニカ**

---

For any questions, feel free to reach out!

---
