module.exports.errorHandler = function (err, req, res, next) {
    console.log(err);
    res.status(400).send(err);
};