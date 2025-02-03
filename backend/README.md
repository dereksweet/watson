# Watson Google Gemini Conversation API
![logos](https://github.com/user-attachments/assets/993a02f4-a1f4-4f2f-8e1d-39c17260e4c0)

This is an API Application written in Node.js that interfaces with Google Gemini. It will not only handle the communications with the Google Gemini API but it will also manage various conversations with Gemini by tracking them, per user and conversation code, in a mongo DB. The user is identified by the Bearer token that is passed in for Authentication by the `sub` claim to ensure that a user can only work with their conversations. For this reason there is a signup endpoint to create a user, as well as a login endpoint to return an access token. 

# Setup Instructions

## Step 1: Clone the Repository
If you have arrived here from the Frontend README, then you don't need to do this first step. If you are setting this project up in isolation, though, then you will still need to clone the code repository: 

```sh
git clone git@github.com:dereksweet/watson.git
```

## Step 2: Move into the backend folder

```
cd watson/backend
```

## Step 2: Install Dependencies

```sh
npm install
```

## Step 3: Setup Google Service Account

- You must setup a Google Cloud Project
- Create a Service Account for that project
- Create a key for that service account
- Download the credentials file for that key and place it in backend/secrets/watson-credentials.json

## Step 4: Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3001
DATABASE_URL=mongodb://localhost:27017/watson
GOOGLE_APPLICATION_CREDENTIALS={FULL PATH TO YOUR CLONED CODE}/backend/secrets/watson-credentials.json
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:5173
GEMINI_PROJECT={Your google console project ID}
GEMINI_LOCATION=us-central1
GEMINI_MODEL=gemini-1.0-pro
```

## Step 5: Start the Development Server

```sh
npm run dev
```

By default, the API will be available at `http://localhost:3001/api/v1`.

# API Documentation

This API provides various endpoints for health checks, user management, and conversations. It is built using Express.js and includes authentication for protected routes.

---

## Health Check
### Check API Health
**Endpoint:** `GET /api/v1/health`

**Access:** Public

**Description:** Performs a basic health check and verifies connectivity with the Google Gemini service.

**Responses:**
- `200 OK`: Returns health status and Gemini service response.
- `500 Internal Server Error`: If the health check fails.

---

## User Management
### User Signup
**Endpoint:** `POST /api/v1/user/signup`

**Access:** Public

**Description:** Creates a new user.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Responses:**
- `201 Created`: Successfully created user.
- `400 Bad Request`: If username already exists.

---
### User Login
**Endpoint:** `POST /api/v1/user/login`

**Access:** Public

**Description:** Logs in a user and returns a JWT token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Responses:**
- `200 OK`: Login success with token.
- `400 Bad Request`: Incorrect credentials.

---
### User Logout
**Endpoint:** `POST /api/v1/user/logout`

**Access:** Public

**Description:** Logs out a user by clearing authentication cookies.

**Responses:**
- `200 OK`: Successfully logged out.

---
### Get User Info
**Endpoint:** `GET /api/v1/users/:id`

**Access:** Public

**Description:** Retrieves user information by user ID.

**Path Parameters:**
- `id` (string): User ID.

**Responses:**
- `200 OK`: Returns user details.

---

## Conversations
### Get Conversation
**Endpoint:** `GET /api/v1/conversations/:code`

**Access:** Private (Requires authentication)

**Description:** Retrieves a conversation by its unique code.

**Path Parameters:**
- `code` (string): Unique conversation identifier.

**Responses:**
- `200 OK`: Returns the conversation.
- `500 Internal Server Error`: If an error occurs.

---
### Delete Conversation
**Endpoint:** `DELETE /api/v1/conversations/:code`

**Access:** Private (Requires authentication)

**Description:** Deletes a conversation by its unique code.

**Path Parameters:**
- `code` (string): Unique conversation identifier.

**Responses:**
- `200 OK`: Successfully deleted the conversation.
- `500 Internal Server Error`: If an error occurs.

---
### Create or Update Conversation
**Endpoint:** `POST /api/v1/conversations/:code`

**Access:** Private (Requires authentication)

**Description:** Creates or updates a conversation with a new prompt and optional file.

**Path Parameters:**
- `code` (string): Unique conversation identifier.

**Request Body:**
```json
{
  "prompt": "string"
}
```

**Optional File Upload:**
- `file` (File): Optional uploaded file.

**Responses:**
- `200 OK`: AI-generated response.
- `400 Bad Request`: If the prompt is missing.
- `500 Internal Server Error`: If an error occurs.
