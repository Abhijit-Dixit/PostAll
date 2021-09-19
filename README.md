# Welcome to PostAll
## An opensource network for sharing Posts with fellow Users...

### For Developers
* Tech Stack used - MERN
* nodeapi folder has details of backend API used
* nodeapi/routes folder contians files having endpoints of the API
* Feel free to reuse this API

### Directions to Build & Use - 
* Clone the Git Repo
* To Launch Frontend :-

    1) Inside react-front folder, run `npm install`
    2) Create a `.env` file and set `REACT_APP_API_URL=http://localhost:8080`
    3) Run `npm start`
* To Launch Backend :-
    
    1) Inside nodeapi folder, run `npm install`
    2) Create a .env file and set these variables :-
        
        a) `MONGO_URI` as provided by MongoDB Atlas        
        b) `JWT_SECRET` a random string for generating JWT token         
        c) `PORT=8080` i.e. the Frontend server's port
    3) Run `nodemon app.js` 