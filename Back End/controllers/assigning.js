const express = require('express');
const Assign = require('../models/assigning');

exports.assign_exercise = (req, res) => {
    const Data = {
        user_id: req.body.user_id,
        item: req.body.item,
    }
    Assign.count({ user_id: req.body.user_id, }, function (err, result) {
        if (err) {
            res.send(err)
        }
        else {
            if (result > 2) {
                res.status(404).json({
                    message: "count is greater then 3"
                })
            }
            else {
                Assign.create(Data)
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

        }
    })


}

exports.get_assined_exercise = (req, res) => {
    Assign.find(function (err, data) {
        if (!data) {
            res.send(err => {
                console.log("user dosenot exist")
            })
        } else {
            res.send(data);
        }
    })

}

exports.get_assirned_exercise_BY_id = (req, res) => {
    let id = req.params.userid;
    Assign.find({
        user_id: id
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

exports.delete_assirned_exercise = (req, res) => {
    Assign.findById(req.params.id, function (err, item) {
        if (!item)
            res.status(404).send('work not found');
        else
            item.delete().then(result => {
                res.json('exercise Deleted');
            })
                .catch(err => {
                    res.status(400).send("Delete not posible");
                });
    });
}