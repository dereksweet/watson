# Watson Google Gemini Conversation API and Demo App In React
![logos](https://github.com/user-attachments/assets/2bf74e2f-9cac-4e0a-9904-ad74afa5f13d)

This project contains not only a self-sufficient API that can be used to manage conversations with Google Gemini, allowing a user to send both text prompts and text data files to be analyzed and have the history of their conversation maintained between logins, it also contains a fully functional demo for interfacing with that API. 

The API is written in NodeJS on the Express Framework, and the Frontend Demo is written in React, also served up by a NodeJS app running on the Express Framework. 

# Setup Instructions

## Step 1: Complete the Backend Setup Instructions
Before you start on setting up the frontend demo, please follow the setup instructions for the backend portion of the application. You can find them here: https://github.com/dereksweet/watson/tree/main/backend

## Step 2: Install Frontend Dependencies

If you are still in the `backend` folder go back to the root folder

```sh
cd ..
```

Then install the front end dependencies

```sh
npm install
```

## Step 3: Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
VITE_BACKEND_URL=http://localhost:3001/api/v1
```

## Step 5: Start the Development Server

```sh
npm run dev
```

By default, the demo will be available at `http://localhost:5173`.

# Demo Explanation
