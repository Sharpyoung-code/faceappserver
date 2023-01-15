const Clarifai = require("clarifai");
const { response } = require("express");

const app = new Clarifai.App({
    apiKey: 'Enter your Api key'
});

const handleApiCall = (req, res) => {
    const { input } = req.body;

    app.models
       .predict(
        {
            id: 'face-detection',
            name: 'face-detection',
            version: '6dc7e46bc9124c5c8824be4822abe105',
            type: 'visual-detector',
        }, input)
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