const mongoose = require("mongoose");

//Author schema

const PublicationSchema = mongoose.Schema({
    id : Number,
    name : String,
    books: [String],
});

//Author model
const PublicationModel = mongoose.model(PublicationSchema);

module.exports = PublicationModel;