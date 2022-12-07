const Clarifai = require("clarifai");
const { response } = require("express");

const app = new Clarifai.App({
    apiKey: '337453dc403e4bc1a51a58899c91a6c5'
});
const handleApiCall = (req, res) => {
    const { input } = req.body;
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("Unable to connect API"))
}
const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        }).catch(err => res.status(400).json('Unable to get entries'))
}
module.exports = {
    handleImage : handleImage,
    handleApiCall : handleApiCall
}