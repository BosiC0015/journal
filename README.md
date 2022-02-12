# My Tiny Jounal
My Tiny Journal is an express back-end with React front-end app. A user can schedule plans, write diaries and track monthly habits.

## Features

1. A user need to login to use the app.
!["Login"](https://github.com/BosiC0015/scheduler/blob/master/client/public/gifs/1.gif)

2. On agenda page:

- User can open and close instructions bar by click the icon.
!["instructions"](https://github.com/BosiC0015/scheduler/blob/master/client/public/gifs/2.gif)

- User can create, edit, delete events on canlendar.
!["agenda"](https://github.com/BosiC0015/scheduler/blob/master/client/public/gifs/3.gif)

- User can go to diary page.
!["go-to-diary"](https://github.com/BosiC0015/scheduler/blob/master/client/public/gifs/4.gif)

3. On diary page, user can create or edit diaries.
!["diary"](https://github.com/BosiC0015/scheduler/blob/master/client/public/gifs/5.gif)

4. On tracker page, user can create and track their habits.
!["tracker"](https://github.com/BosiC0015/scheduler/blob/master/client/public/gifs/6.gif)

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