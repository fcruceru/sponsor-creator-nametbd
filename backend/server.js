// Loading env variables
require('dotenv').config();

// Express
const express = require('express')
const cors = require('cors');
const app = express();
app.use(express.json());
const port = 3000;

// Setting CORS on all requests
app.use(cors());

// DB
const dao = require('./dao');

const auth = require('./utils/auth');

const bcrypt = require('bcrypt');


app.get('/testconn', (req, res) => {
    return res.send('Working Connection');
});

app.get('/resetDb', (req, res) => {
    try {
        dao.resetDb();
        return res.send("Successfully reset DB.");
    } catch (error) {
        return res.status(500).send("Error: \n" + error.message,)
    }
});

app.post('/register', async (req, res) => {
    try {
        let newUserId = await dao.addUser(req.body);
        let newUser = await dao.getUserById(newUserId);
        return res.status(201).send(newUser); // Status 201 = created
    } catch (error) {
        return res.status(500).send("Error: \n" + error.message,)
    }
});

app.post('/login', async (req, res) => {
    try {
        // Check user exists
        let user = await dao.getUserByEmail(req.body.email);
        if (!user) {
            return res.status(401).send({
                success: false,
                reason: "Invalid username entered. Are you sure you entered the correct username?"
            })
        }

        // Verify password
        if (!await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                reason: "Invalid password entered. Double check you entered the correct password and try again."
            })
        }
        else {
            let token = await auth.generateJwtToken(user);

            return res.status(200).send({
                user,
                token
            });
        }
    } catch (error) {
        return res.status(500).send("Error: \n" + error.message,)
    }
});

app.post('/updateTwitchToken', async (req, res) => {
    let user = await auth.getUserFromRequest(req);
    if (!user) {
        return res.status(401).send();
    }

    try {
        await dao.updateTwitchToken(user, req.body.token);
        let updatedUser = await dao.getUserById(user.ID);
        return res.status(200).send(updatedUser);
    } catch (error) {
        return res.status(500).send("Error: \n" + error.message,)
    }
});

app.get('/users/:id', function (req, res) {
    try {
        let user = dao.getUserById(req.params.id);
        return res.send(user);
    } catch (error) {
        return res.status(500).send("Error: \n" + error.message,)
    }
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});