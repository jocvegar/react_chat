const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('@pusher/chatkit-server');


const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:5546b511-0858-41f6-9711-4967ef9b60c3',
  key: 'e321377c-c160-45d0-a431-3e9f43cf6bcf:WaFuzI4vAGxl2FgjrdcjkGr/Cjjz+EMEhdHf7RqXwh4=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
	const { username } = req.body

	chatkit.createUser({
	  id: username,
	  name: username,
	})
	.then(() => res.sendStatus(201))
	.catch((err) => {
	    if(err.error === 'services/chatkit/user_already_exists') {
	    	res.sendStatus(200)
	    } else {
	    	res.status(err.statusCode).json(err);
	    	console.log(err);
	    }
	  });
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
