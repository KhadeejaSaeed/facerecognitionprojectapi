const Clarifai = require ('clarifai');

const app = new Clarifai.App({
 apiKey: 'dbe4d66417c4418fb31674d1838f8754'
});

const handleApiCall = (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.imageURL)
    .then(data=>res.json(data))
    .catch(err=>res.status(400).json("Unable to work with Api."))
}

const handleImage = (req,res,db) => {
    const {id}= req.body;
    db('users').where({id}).increment({entries:1})
    .returning("entries")
    .then(entries => res.json(entries[0]))
    .catch(err=>res.status(400).json("Error getting entries"));
}

module.exports = {
    handleImage:handleImage,
    handleApiCall:handleApiCall
}