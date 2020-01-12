const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const predict = require('./predict');

app.use(express.json());

app.post('/emote_rate', (req, res) => {
    predict(req.body.comment)
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.listen('5000', () => {
    console.log('listening to port 5000')
});