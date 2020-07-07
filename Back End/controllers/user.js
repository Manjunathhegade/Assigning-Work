const express = require('express');
const User = require('../models/user');

exports.user_Register = (req, res) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,

    }
    User.findOne({
        email: req.body.email
    })
        .then(result => {
            if (!result) {
                User.create(userData)
                    .then(userResult => {
                        res.status(200).json({
                            message: userResult.email + " " + "Registerd"
                        })
                    })
                    .catch(err => {
                        res.json({
                            message: "error" + err
                        })
                    })

            }
            else {
                res.json({
                    message: "User already exists..."
                })
            }
        })
        .catch(err => {
            console.log("error" + err);
        })
}

//get all user
exports.get_User = (req, res) => {
    User.find(function (err, profile) {
        if (!profile) {
            res.send(err => {
                console.log("user dosenot exist")
            })
        } else {
            res.send(profile);
        }
    })

}


//get user by id
exports.get_UserById = (req, res) => {
    let id = req.params.id;
    User.findOne({
        _id: id
    })
        .then(result => {
            if (result) {
                res.send(result);
            }

        })
        .catch(err => {
            res.status(400).send("Couldnot find user ID")
        })


}

//edit user
exports.edit_User = (req, res) => {
    const id = req.params.id;
    const updateOps = {};
    Object.keys(req.body).forEach((ops) => {
        updateOps[ops] = req.body[ops];
    });
    User.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}



exports.delete_User = (req, res) => {
    User.findById(req.params.id, function (err, item) {
        if (!item)
            res.status(404).send('user not found');
        else
            item.delete().then(result => {
                res.json('user Deleted');
            })
                .catch(err => {
                    res.status(400).send("Delete not posible");
                });
    });
}
