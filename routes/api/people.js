const express = require('express');
const router = express.Router();
// people Model
const People = require('../../models/People');

// routes GET api/people
// get all people
router.get('/', async (req, res) => {
    try {
        const peoples = await People.find();
        if (!peoples) throw Error(`No items`);
        res.status(200).json(peoples);                
    } catch (err) {
        res.status(400).json({ msg: err });
    }
})

// routes GET api/people/:id
// get one people
router.get('/', async (req, res) => {
    try {
        const people = await People.findByid(req.params.id);
        if (!people) throw Error(`No items`);
        res.status(200).json(people);
    } catch (err) {
        res.status(400).json({ msg: err });
    }
})

// routes POST api/people
// create new people

router.post('/', async (req, res) => {
    const newPeople = new People(req.body);

    try {
        const people = await newPeople.save();
        if (!people) throw Error(`Somthing went wrong while saveing people`);
        res.status(200).json(people);
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

// routes DELETE api/people/:id
// delete people

router.delete('/:id', async (req, res) => {
    try {
        const people = await People.findByIdAndDelete(req.params.id);
        if (!people) throw Error(`No people found`);
        res.status(200).json({ succes: true });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

// routes UPDATE api/people/:id
// update people

router.patch('/:id', async (req, res) => {
    try {
        const people = await People.findByIdAndUpdate(req.params.id, req.body);
        if (!people) throw Error(`Something went wrong while updating the people`);
        res.status(200).json({ succes: true });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

module.exports = router;