# My Tiny Jounal
My Tiny Journal is an express back-end with React front-end app. A user can schedule plans, write diaries and track monthly habits.

## Features

1. A user need to login to use the app.

2. On agenda page:

- User can open and close instructions bar by click the icon.

- User can create, edit, delete events on canlendar.

- User can go to diary page.

3. On diary page, user can create or edit diaries.

4. On tracker page, user can create and track their habits.

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