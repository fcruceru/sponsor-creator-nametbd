// Express
const express = require('express')
const cors = require('cors');
const app = express();
const port = 3000;



// Setting CORS on all requests
app.use(cors());

app.get('/testconn', (req, res) => {
    res.send('Working Connection');
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})