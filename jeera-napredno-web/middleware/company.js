const mongoose = require('mongoose');
const companySchema = require('../schema/Company');
const Company = mongoose.model('Company', companySchema);


module.exports.addCompany = function (req, res, next){
    const newCompany = new Company(
        {
            name: req.body.name
        }
    );

    newCompany.save()
        .then((doc) => {return res.send(doc)})
        .catch((err) => {return next(err)});
};