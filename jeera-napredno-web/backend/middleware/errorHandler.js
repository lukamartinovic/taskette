module.exports.errorHandler = function (err, req, res, next) {
    console.log(err.message);
    switch(err.message){
        case "Unauthorized":
            return res.status(403).send(err.message);
            break;
        case "401":
            return res.status(401);
            break;
        default: res.status(400).send(err);
    }

};