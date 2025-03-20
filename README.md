Test Assignment: API for Short URLs

Task Description:

It is necessary to develop a REST API for a URL shortening service and a React frontend to test the REST API.

TypeScript must be used for both the frontend and backend.

It is desirable to use Dockerfile and docker-compose to run the project with a single command.

Backend

Required Functionality:

Create a short link:
POST /shorten: accepts JSON with the following fields:

originalUrl (required) - the original URL,

expiresAt (optional) - the expiration date of the shortened link,

alias (optional) - a custom alias for the URL (maximum length of 20 characters)
The endpoint returns a unique shortened URL.

Redirection:

GET /{shortUrl}: redirects the user to the original URL.
If the link is not found, it returns a 404 error.

Get link information:

GET /info/{shortUrl}: returns information about the shortened link:
originalUrl (the original link),
createdAt (creation date),
clickCount (number of clicks on the short link).

Delete a short link:

DELETE /delete/{shortUrl}: deletes a short link.

Additional Functionality
Click Statistics
Add a table to store click statistics for short links. Save the date and IP address for each click on a short link.

Add a method:

GET /analytics/{shortUrl}: returns the number of clicks on the link and the last 5 IP addresses.

Tests (1-2 to choose from):

Test:
Creating a link with a unique alias.
Redirection to the original URL.

Desirable

Express.js or NestJS framework.
DB: PostgreSQL, MySQL, MariaDB
ORM

Frontend

Required Functionality:

Frontend for creating short links with functions for deletion and retrieving information (statistics).
