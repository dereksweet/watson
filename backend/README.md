## Overview
This is an API Application written in Node.js that interfaces with Google Gemini. It will not only handle the communications with the Google Gemini API but it will also manage various conversations with Gemini by tracking them, per user and conversation code, in a mongo DB. The user is identified by the Bearer token that is passed in for Authentication by the `sub` claim to ensure that a user can only work with their conversations. For this reason there is a signup endpoint to create a user, as well as a login endpoint to return an access token. 

