const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db = knex({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL
    }
});

const app =  express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Success");
});

app.get("/profile/:id", (req, res) => {profile.handleProfile(req, res, db)})
app.put("/image", (req, res) => {image.handleImage(req, res, db)})
app.post("/signin", (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.post("/imageUrl", (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 8080, () => {
    console.log(`app working on port ${process.env.PORT}`)
});