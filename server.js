const express= require ('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const { response } = require('express');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'admin',
      database : 'smart-brain'
    }
});

const app= express();
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => res.json("success"));
app.post('/signin', (req,res) => signin.handleSignIn(req,res,db,bcrypt));
app.post('/register', (req,res) => register.handleRegister(req,res,db,bcrypt));
app.get('/profile/:id', (req,res) => profile.handleProfile(req,res,db));
app.put('/image', (req,res) => image.handleImage(req,res,db));
app.post('/imageURL', (req,res) => image.handleApiCall(req,res));

app.listen(8080, () => {
    console.log("App is running on port 8080");
});