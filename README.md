## Prerequisites
For running the project, you need the following to be installed on your machine

* Node
* npm

## Install
Clone/download the project. Enter the project root directory and install required dependencies with
```
npm install
```

## Run in development mode
In the project root directory, run
```
npm start
```
The application will be available, by default at <br>
[http://localhost:3000](http://localhost:3000) 


## Run in production mode
For checking PWA features of the app, you need to run the production build of the application. <br>
Install "serve" package with 
```
npm install serve -g
```
Build production version of the application
```
npm build
```
Run the production build with

```
serve -s build
```
The application will be available, by default at <br>
[http://localhost:5000](http://localhost:5000) 


#### Credits
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

