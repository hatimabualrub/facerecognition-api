const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: '18699',
		database: 'facerecognition'
	}
});

db.select('*').from('users').then(data => {
	console.log(data);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {
	res.send(database.users);
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db)});
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(3000, ()=> {
	console.log('app is running on port 3000');
})
