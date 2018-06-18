const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('@pusher/chatkit-server');


const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:e00ca932-e9eb-4bc3-977e-6fe565d22222',
  key: 'e3978992-3f62-4251-b139-61891e74c6b0:z0n2un/vXENrNhKubicirnHU+b76bP2tgoSJwMetc7k=',
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

// app.post('/authenticate', (req, res) => {
// 	const { grant_type } = req.body
// 	res.json(chatkit.authenticate({ grant_type, user_id: req.query.user_id },
// 		req.query.user_id))
// })

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });

  res.status(authData.status)
     .send(authData.body);
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
