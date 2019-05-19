module.exports.errorHandler = function (err, req, res, next) {
    console.log(err);
    res.status(200).send(err);
};