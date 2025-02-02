# Watson Google Gemini Conversation API and Demo App In React
![logos](https://github.com/user-attachments/assets/2bf74e2f-9cac-4e0a-9904-ad74afa5f13d)

This project contains not only a self-sufficient API that can be used to manage conversations with Google Gemini, allowing a user to send both text prompts and text data files to be analyzed and have the history of their conversation maintained between logins, it also contains a fully functional demo for interfacing with that API. 

The API is written in NodeJS on the Express Framework, and the Frontend Demo is written in React, also served up by a NodeJS app running on the Express Framework. 

# Setup Instructions

## Step 1: Complete the Backend Setup Instructions
Before you start on setting up the frontend demo, please follow the setup instructions for the backend portion of the application. You can find them here: https://github.com/dereksweet/watson/tree/main/backend/README.md

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

## Step 4: Create a User

Follow the instructions in the API Documentation of the backend to create a user for yourself in your local database (https://github.com/dereksweet/watson/blob/main/backend/README.md#user-signup) 

Use the `login` endpoint on the API to verify that you created your user succesfully. It should return an access token for you to use as your Bearer token for any other secure requests. (https://github.com/dereksweet/watson/blob/main/backend/README.md#user-login)

## Step 5: Start the Development Server

```sh
npm run dev
```

By default, the demo will be available at `http://localhost:5173`.

# Demo Explanation

## Login Screen
When you first visit the Demo application you will be presented with a login screen: 

<img width="658" alt="Screenshot 2025-01-31 at 3 07 02 PM" src="https://github.com/user-attachments/assets/0295649f-af5a-4914-a95b-edc332cf4349" />

If you created your user correctly in Step 4 above the login should succeed. If you are having issues logging in verify that your user exists in your local Mongo DB.

# Main Demo Screen
If you were able to login correctly, you should see a screen that looks like the following:

<img width="839" alt="Screenshot 2025-01-31 at 3 08 54 PM" src="https://github.com/user-attachments/assets/e094c690-d38a-4840-8eae-6fac6ef545a2" />


The tabs at the top, "General Customer Service", "Technical Assistance", and "Financial Data", are just three arbitrary categories that I came up with to demonstrate that you can have multiple conversations with Watson and it will remember the three different contexts seperate from one another. There is no inherent financial knowledge that the "Financial Data" tab, for example, has access to that the other tabs do not. They are only intended to demonstrate how the chatbot COULD be used for different areas of your site. 

To start a conversation in one of the tabs, simply type something into the "Text Prompt" input and click "Send", or you can just press Enter as well. In a short time you will see your message, and the response from Watson, appear below. You can keep typing and sending prompts to Watson and it will respond in short time. 

You also have the option to send a text data file to Watson and it will ingest the data and help you answer any questions you have about it. You are restricted to only text-based data, however. Binary data like Word or Excel documents will not work.

Finally, there is a button at the bottom of each tab labelled "Reset This Conversation". If you click that button it will completely erase all context of that discussion and start fresh on that tab. The other tabs, however, will remain unaffected. 
