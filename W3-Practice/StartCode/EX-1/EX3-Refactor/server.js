const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;


// Middleware to parse form data 
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

//route get /
app.get('/', (req, res) => {
    res.send('Wecome to the Home Page');
});

//route get /contact
app.get('/contact', (req, res) => {
    res.send(`
        <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
          </form>
    `);
});

//route post /contact
app.post('/contact', (req, res) => {
    const name = req.body.name;
    console.log('Received name:', name);
    fs.appendFile('submissions.txt', name + '\n', err => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.send('Submission successful');
    });
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen (port, () => {
    console.log('Server is running at http://localhost:3000');
})