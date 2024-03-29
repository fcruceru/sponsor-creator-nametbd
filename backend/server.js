// Loading env variables
require("dotenv").config({ path: "backend/.env" });

// Express
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const port = 3000;

const fetch = require("node-fetch"); // TODO: Consider switching to v3 (needs ESM to work)

// Setting CORS on all requests
app.use(cors());

const dao = require("./dao");
const auth = require("./utils/auth");
const bcrypt = require("bcrypt");
const axios = require("axios");

app.get("/testconn", (req, res) => {
    return res.send("Working Connection");
});

app.get("/resetDb", (req, res) => {
    try {
        dao.resetDb();
        return res.send("Successfully reset DB.");
    } catch (error) {
        return res.status(500).send("Error: \n" + error.message);
    }
});
// TODO: Fix auth on register (logout on register)
app.post("/register", async (req, res) => {
    try {
        let type = req.query.type;
        let newUserId;
        if (type === "creator") {
            newUserId = await dao.addCreator(req.body);
        } else if (type === "sponsor") {
            newUserId = await dao.addSponsor(req.body);
        } else {
            // TODO: Change to check for type & general exception
            return res.status(500).send("Error: Missing user type.");
        }

        let newUser = dao.getUserById(type, newUserId);
        return res.status(201).send(newUser); // Status 201 = created
    } catch (error) {
        return res.status(500).send("Error: \n" + error.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        // Check user exists
        let user = dao.getUserByEmail(req.query.type, req.body.email);
        if (!user) {
            return res.status(401).send({
                success: false,
                reason: "Invalid username entered. Are you sure you entered the correct username?"
            });
        }

        // Verify password
        if (!(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).send({
                success: false,
                reason: "Invalid password entered. Double check you entered the correct password and try again."
            });
        } else {
            let token = await auth.generateJwtToken(user, req.query.type);

            return res.status(200).send({
                user,
                token
            });
        }
    } catch (error) {
        return res.status(500).send("Error: \n" + error.message);
    }
});

app.post("/updateTwitchToken", async (req, res) => {
    let user = await auth.getUserFromRequest(req);
    if (!user) {
        return res.status(401).send();
    }

    // Getting JWT token from twitch
    let data;
    try {
        data = (
            await axios.post(
                // TODO: Create new app on launch (to re-generate clientId)
                `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&code=${req.body.code}&grant_type=authorization_code&redirect_uri=${process.env.REDIRECT_URI}`
            )
        ).data;
    } catch (error) {
        console.error(`Error getting auth token from Twitch:\n${error.name}: ${error.message}`);
    }

    if (!data) {
        return res.status(500).send({
            success: false,
            reason: "Twitch Authorization failed"
        });
    }

    try {
        await dao.updateTwitchToken(user, data);
        let updatedUser = dao.getUserById("creator", user.ID); // TODO: Clean this up
        return res.status(200).send(updatedUser);
    } catch (error) {
        return res.status(500).send("Error: \n" + error.message);
    }
});

app.post("/updateTwitchMetrics", async (req, res) => {
    let user = await auth.getUserFromRequest(req);
    if (!user) {
        return res.status(401).send();
    }
    // TODO: Check action token exists

    // Multiple step process to get all the metrics from Twitch
    // More steps will be implemented as development progresses

    // BroadcasterId and username
    let channelInformation = {};
    try {
        let response = (
            await axios.get(`https://api.twitch.tv/helix/users`, {
                headers: {
                    Authorization: "Bearer " + user.twitch_token.access_token,
                    "Client-Id": process.env.TWITCH_CLIENT_ID
                }
            })
        ).data.data[0];
        channelInformation = { ...response };
    } catch (error) {
        console.error(error.response.data);
        return res.status(500).send("Error: \n" + error.response.data.message);
    }

    // Basic channel information
    try {
        let response = (
            await axios.get(`https://api.twitch.tv/helix/channels?broadcaster_id=${channelInformation.id}`, {
                headers: {
                    Authorization: "Bearer " + user.twitch_token.access_token,
                    "Client-Id": process.env.TWITCH_CLIENT_ID
                }
            })
        ).data.data[0];
        channelInformation = { ...channelInformation, ...response };
    } catch (error) {
        console.error(error.response.data);
        return res.status(500).send("Error: \n" + error.response.data.message);
    }

    // Follows
    try {
        let response = (
            await axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${channelInformation.id}`, {
                headers: {
                    Authorization: "Bearer " + user.twitch_token.access_token,
                    "Client-Id": process.env.TWITCH_CLIENT_ID
                }
            })
        ).data;
        channelInformation.total_follows = response.total;
    } catch (error) {
        console.error(error.response.data);
        return res.status(500).send("Error: \n" + error.response.data.message);
    }

    // Subs
    // TODO: This will error out if the user is not a partner/affiliate
    try {
        let response = (
            await axios.get(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${channelInformation.id}`, {
                headers: {
                    Authorization: "Bearer " + user.twitch_token.access_token,
                    "Client-Id": process.env.TWITCH_CLIENT_ID
                }
            })
        ).data;
        channelInformation.total_subs = response.total;
    } catch (error) {
        console.error(error.response.data);
        //return res.status(500).send("Error: \n" + error.response.data.message);
    }

    // Get metrics from twitchTracker
    // TODO: Look into implementing this properly
    // Setting subs to >0 for testing
    channelInformation.total_subs++;
    if (channelInformation.total_subs > 0) {
        // TODO: Rework this in a cleaner way
        try {
            await fetch(`https://twitchtracker.com/api/channels/summary/Fuzzyfoyz`).then(async (res) => {
                let trackerStats = await res.json();
                channelInformation = { ...channelInformation, ...trackerStats };
            });
        } catch (error) {
            console.error(error.response.data);
            return res.status(500).send("Error: \n" + error.response.data.message);
        }
    }

    // Save to user model
    dao.updateTwitchMetrics(user, channelInformation);

    // Return user to be updated in vuex store
    let updatedUser = dao.getUserById("creator", user.ID);
    return res.send(updatedUser);
});

app.get("/users/:id", async function (req, res) {
    // TODO: Permissions
    let user = await auth.getUserFromRequest(req);
    if (!user) {
        return res.status(401).send();
    }

    try {
        let type = req.query.type;
        if (type === "creator" || type === "sponsor") {
            let user = dao.getUserById(type, req.params.id);
            return res.send(user);
        } else {
            // TODO: Change to check for type & general exception
            return res.status(500).send("Error: Missing user type.");
        }
    } catch (error) {
        return res.status(500).send("Error: \n" + error.message);
    }
});

app.get("/user", async function (req, res) {
    // TODO: Permissions
    try {
        let user = await auth.getUserFromRequest(req);
        if (!user) {
            return res.status(401).send();
        }
        return user;
    } catch (error) {
        return res.status(500).send("Error: \n" + error.message);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
