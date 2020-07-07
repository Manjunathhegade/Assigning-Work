const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        trim: true
    },
    item: {
        type: String,
        required: true,
        trim: true
    }

})

module.exports = Assign = mongoose.model('assign', AssignSchema);