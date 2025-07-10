# Mini URL Shortener API

## Description

A REST API that shortens long URLs and redirects to the original URL.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- NanoID for unique short code generation

## Setup Instructions

```bash
git clone https://github.com/AnuragKush2527/URL-Shortener.git
cd URL-Shortener
npm install

## Add the following environment variables
PORT = (example - 5000)
MONGO_URI = (example - mongodb://localhost:27017/urlShortener)
BASE_URL = (example - https://localhost:5000)

## Run the server
npm start
```
