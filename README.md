# ISM 210: Mobile-Based Technologies and Multimedia
## CA 1 - Question 2
**Student:** Kanyinsola Oduntan
**Course:** ISM 210


---

## Assignment Question

> Extend the above API functionality to perform database CRUD operations by connecting to MongoDB Atlas hosted in the cloud.
> - Host and deploy the resulting backend API.
> - Push your codes to GitHub.
> - Submit both the URL where your backend is hosted and the GitHub URL.

---

## How I Went About It

### 1. Project Setup

I created a new Node.js project directory called `isms-backend-project` and initialized it using `npm init`. I then installed the required packages:

```bash
npm install express mongoose dotenv cors
```

- **Express.js** — the web application framework used in class for building the API
- **Mongoose** — the library for connecting to MongoDB, as suggested in the assignment hint
- **dotenv** — for storing the MongoDB Atlas connection string securely in a `.env` file
- **cors** — for handling cross-origin requests

### 2. MongoDB Atlas Setup

I created a free MongoDB Atlas account and set up a free-tier cluster (M0) hosted on AWS in the Ireland (eu-west-1) region. I then:

- Created a database user with read/write permissions
- Added `0.0.0.0/0` to the IP Access List to allow connections from any IP address (required for deployment)
- Obtained the connection string and stored it in a `.env` file

### 3. Extending the API with CRUD Operations

Starting from the Express.js API built in class, which had routes for `/api/server/status` and `/api/submit-form`, I extended it to include full CRUD (Create, Read, Update, Delete) operations that persist data to MongoDB Atlas.

I created a Mongoose schema and model (`models/CatPhoto.js`) to define the structure of the cat photo data based on the CatPhotoApp form from class:

- `indoorOutdoor` — whether the cat is indoor or outdoor
- `personality` — an array of personality traits (e.g., Loving, Lazy, Crazy)
- `catUrl` — a description or URL for the cat photo

### 4. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Server status check |
| GET | `/api/server/status` | Server status |
| POST | `/api/submit-form` | Create a new cat photo entry (saved to MongoDB) |
| GET | `/api/cat-photos` | Retrieve all cat photo entries |
| GET | `/api/cat-photos/:id` | Retrieve a single cat photo by its ID |
| PUT | `/api/cat-photos/:id` | Update a cat photo entry by its ID |
| DELETE | `/api/cat-photos/:id` | Delete a cat photo entry by its ID |

### 5. Testing with curl

I tested the API locally using curl commands:

**Create:**
```bash
curl -X POST http://localhost:3000/api/submit-form -H "Content-Type: application/json" -d '{"indoorOutdoor":"indoor","personality":["Loving","Lazy","Crazy"],"catUrl":"This is a very great and cool cat"}'
```

**Read all:**
```bash
curl http://localhost:3000/api/cat-photos
```

**Read one:**
```bash
curl http://localhost:3000/api/cat-photos/<id>
```

**Update:**
```bash
curl -X PUT http://localhost:3000/api/cat-photos/<id> -H "Content-Type: application/json" -d '{"indoorOutdoor":"outdoor","personality":["Playful"],"catUrl":"Updated cat entry"}'
```

**Delete:**
```bash
curl -X DELETE http://localhost:3000/api/cat-photos/<id>
```

### 6. Deployment

The API was deployed to Render and the code was pushed to GitHub.

- **GitHub URL:** https://github.com/kanyinotan08/isms-backend-project

---


## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
