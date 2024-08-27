const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    user_id:{
        type:   mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required']
    },
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Contact', contactSchema);