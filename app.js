const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const port = 3000;
const url = 'mongodb+srv://User:85398539@cluster0.7o6zl.mongodb.net/User'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => { app.listen(port) })
    .catch((err) => { console.log(err) });
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

/*app.get('/add-user', (req, res) => {
    const user = new User({
        name: 'Eren2',
        lastName: 'Eger2',
        tel: 11111,
        email: 'kill@gmail.com2',
        company: 'warior2',
        position: 'shifter2',
        age: 20,
        sex: 'male2',
        married: 'no2',
        country: 'Paradis2',
        town: 'Siganshina2'
    });

    user.save()
        .then((result) => {
            res.send(result)
        })

})

app.get('/all-user', (req, res) => {

    User.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })

})

app.get('/single-user', (req, res) => {

    User.findById('60cd9d200dc3ee15084d2e29')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })

})*/

app.get('/', (req, res) => {

    User.find()
        .then((result) => {
            res.render('index', { title: 'Main page', users: result })
        })
        .catch((err) => {
            console.log(err)
        })

});

app.get('/createUser', (req, res) => {
    res.render('createUser', { title: 'Create new user' })
});

app.get('/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
    .then((result) => {
        res.render('details', { title: 'details', user: result })
    })
});

app.delete('/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect : '/'})
    })
});

app.post('/', (req, res) => {
    const user = new User(req.body)

    user.save()
        .then((result) => {
            res.redirect('/')
        })
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});