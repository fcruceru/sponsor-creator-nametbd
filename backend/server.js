// Express
const express = require('express')
const cors = require('cors');
const app = express();
app.use(express.json());
const port = 3000;

// DB
const dao = require('./dao');

// Setting CORS on all requests
app.use(cors());

app.get('/testconn', (req, res) => {
    res.send('Working Connection');
});

app.get('/resetDb', (req, res) => {
    try {
        dao.resetDb();
        res.send("Successfully reset DB.");
    } catch (error) {
        res.status(500).send("Error: \n" + error.message, )
    }
});

app.post('/register', async (req, res) => {
    try {
        let newUserId = await dao.addUser(req.body);
        let newUser = await dao.getUserById(newUserId);
        res.status(201).send(newUser); // Status 201 = created
    } catch (error) {
        res.status(500).send("Error: \n" + error.message, )
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});