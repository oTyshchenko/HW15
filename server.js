const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGO_URI } = require('./config');
const People = require('./models/People');

const peopleRoutes = require('./routes/api/people');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log(`MongoBD conected`))
    .catch((err) => console.log(err))

app.use('/api/people', peopleRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server run at port ${PORT}`)
})