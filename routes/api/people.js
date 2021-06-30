const express = require('express');
const router = express.Router();

const People = require('../../models/People');

router.get('/', async (req, res) => {
    try {
        const people = await People.find();
        if (!people) throw Error(`No items`);
        res.status(200).json(people);                
    } catch (err) {
        res.status(400).json({ msg: err });
    }
})

router.get('/', async (req, res) => {
    try {
        const person = await People.findById(req.params.id);
        if (!person) throw Error(`No items`);
        res.status(200).json(person);
    } catch (err) {
        res.status(400).json({ msg: err });
    }
})

router.post('/', async (req, res) => {
    const newPerson = new People(req.body);

    try {
        const person = await newPerson.save();
        if (!person) throw Error(`Something went wrong while saving people`);
        res.status(200);
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const person = await People.findByIdAndDelete(req.params.id);
        if (!person) throw Error(`No people found`);
        res.status(200);
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const person = await People.findByIdAndUpdate(req.params.id, req.body);
        if (!person) throw Error(`Something went wrong while updating the people`);
        res.status(200);
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

module.exports = router;