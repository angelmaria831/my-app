## NextJS - My-App with React, Tailwind, TS, Jest

To start the application : npm run dev,
To test the application  : npm test


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## DB - Mongo Atlas

User Model with sample data - First Name, Last Name, Username, Password, Email, isAdmin(default:false)

## Login

1. Takes a username and a password and on submission sends them both to an API endpoint called /login

2. The API endpoint should accept POST requests with username and password in the body. When the API endpoint gets "username" as username and "password" as password then it returns a 200 response with a success and when it is anything else - it should return an error stating that the authentication failed.

3. After successful login - user should be redirected to a user page where it would show some basic info for that user fetch from DB

4. Creates token (expiry :1day) data with _id, username and email and stored in cookies 
![image](https://github.com/user-attachments/assets/31c1a21c-9c86-4e78-b08b-c5709e47045d)

## Profile

1. On success Login, user is redirected to Profile Page with dummy user data.

2. Showing Loading spinner until data is fetched from DB

3. Logout button to reset the token. Redirects to Login Page.
   ![image](https://github.com/user-attachments/assets/3aa59ee8-63ff-4fee-9d9e-25de89984699)

## Signup

1. Simple registration with user data.

2. On successful registration redirects to Login Page.
![image](https://github.com/user-attachments/assets/bb060c2b-5cef-425c-aa3f-757f636d51a3)

## Testing using Jest

1. Handled testcases for Login and Profile Page


