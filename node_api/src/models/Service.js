const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    designation: {
        type: String,
        required: [true, 'Please enter a designation'],
    },
    description: {
        type: String,
        required: [true, 'Please enter a description'],
    },
    duree: {
        type: Number,
        required: [true, 'Please enter a duration'],
    },
    prix: {
        type: Number,
        required: [true, 'Please enter a price']
    },
    commission: {
        type: Number,
        required: [true, 'Please enter a commission']
    },
    img: {
        type: String,
        required: [true, 'Please enter an image']
    }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;