# My Tiny Jounal
My Tiny Journal is an express back-end with React front-end app. A user can schedule plans, write diaries and track monthly habits.

## Server Setup

* Go to server directory ```cd server```
* Start SQL server and run ```createdb journal -O labber```
* Run ```npm i``` to install al the dependencies
* Create ```.env``` file by copying content from ```.env.example```
* Run ```npm run dev```
* Open http://localhost:3001/

## Client Setup

* Go to client directory ```cd client```
* Run ```npm i``` to install al the dependencies
* Run ```npm start```
* Open http://localhost:3000/

## Ports

* React front-end is running on port 3000
* Express back-end is running on port 3001

<!-- ## Cors

**Cross-Origin Resource Sharing**

* A web application makes a cross-origin HTTP request when it requests a resource that has a different domain (i.e. different ports)
* Web application using APIs can only request HTTP resources from the same origin the application was loaded from, unless the response from the other origin includes the right CORS headers.

## References

[Create React App with an Express Backend](https://daveceddia.com/create-react-app-express-backend/)

[Access-Control-Allow-Origin: Dealing with CORS Errors in React and Express](https://daveceddia.com/access-control-allow-origin-cors-errors-in-react-express/)

[Deploy React and Express to Heroku](https://daveceddia.com/deploy-react-express-app-heroku/) -->
