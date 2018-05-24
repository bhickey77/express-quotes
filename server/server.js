const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 5000;

const quotes = [
    {
        author: 'Stephen King',
        text: 'Get busy living or get busy dying.',
        image: 'photos/photo1.jpeg'
    },
    {
        author: 'Mark Caine',
        text: 'The first step toward success is taken when you refuse to be a captive of the environment in which you first find yourself',
        image: 'photos/photo2.jpeg'
    },
    {
        author: 'Helen Keller',
        text: 'When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us',
        image: 'photos/photo3.jpeg'
    }
]

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({ 
    extended: false,
    uploadDir: '/public/photos'
}))

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

app.get('/quotes', (req, res) => {
    res.send(quotes);
});

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/quotes', (req, res) => {
    quotes.push(req.body);
    
});

app.get('/random',  (req, res) => {
    res.send(getRandomQuote(quotes));
});


function getRandomQuote(quotes){
    let index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
}