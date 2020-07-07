const express = require('express');
const Exercise = require('../models/exercise');

exports.exercise_Register = (req, res) => {
    const Data = {
        name: req.body.name,
    }
    Exercise.create(Data)
        .then(userResult => {
            res.status(200).json({
                message: "Saved"
            })
        })
        .catch(err => {
            res.json({
                message: "error" + err
            })
        })



}

//get all exercise
exports.get_exercise = (req, res) => {
    Exercise.find(function (err, profile) {
        if (!profile) {
            res.send(err => {
                console.log("user dosenot exist")
            })
        } else {
            res.send(profile);
        }
    })

}


//get exercise by id
exports.get_exerciseById = (req, res) => {
    let id = req.params.id;
    Exercise.findOne({
        _id: id
    })
        .then(result => {
            if (result) {
                res.send(result);
            }

        })
        .catch(err => {
            res.status(400).send("Couldnot find exercise id")
        })


}

//edit exercise
exports.edit_exercise = (req, res) => {
    const id = req.params.id;
    const updateOps = {};
    Object.keys(req.body).forEach((ops) => {
        updateOps[ops] = req.body[ops];
    });
    Exercise.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}



exports.delete_exercise = (req, res) => {
    Exercise.findById(req.params.id, function (err, item) {
        if (!item)
            res.status(404).send('exercise not found');
        else
            item.delete().then(result => {
                res.json('exercise Deleted');
            })
                .catch(err => {
                    res.status(400).send("Delete not posible");
                });
    });
}
