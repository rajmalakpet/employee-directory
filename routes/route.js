var mongoose = require('mongoose');

var employeesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    dob: {type: String, required: true},
    department: {type: String, required: true},
    gender: {type: String, required: true},
    age: {type: String, required: true}
})
mongoose.model('employees', employeesSchema, 'Employees');

var employeesModel = mongoose.model('employees');

module.exports.getEmployees = function(req, res){
    console.log('getEmployees was hit');
    employeesModel.find({}, function(err, db){
        if (err) {
            res.status(400).json({status: 400, error: err});
        } else {
            res.status(200).json({status: 200, data: db});
        }
    })
}

module.exports.addEmployee = function(req, res){
    console.log('addEmployee was hit with data: ', req.body)
    var record = new employeesModel();
    record.name = req.body.name;
    record.email = req.body.email;
    record.dob = req.body.dob,
    record.department = req.body.department;
    record.gender = req.body.gender;
    record.age = req.body.age;
    record.save(function(err){
        if (err) {
            console.log('error saving the record: ', err);
            res.status(400).json({status: 400, error: err});
        } else {
            res.status(200).json({status: 200, message: 'successfully saved the record'});
        }
    })
}

module.exports.updateEmployee = function(req, res){
    console.log('updateEmployee was hit with data: ', req.body);
    var _payloadOBJ = req.body;                                 //findOneAndUpdate, no model instance is required
    employeesModel.findOneAndUpdate({email: req.body.email}, _payloadOBJ, {upsert: true, new: true, runValidators: true}, function(err, doc){
        console.log('<=== findOneAndUpdate processed:');
        if (err) {
            res.status(400).json({status: 400, error: err});
            throw err
        } else {
            console.log('successfully updated document: ', doc)
            res.status(200).json({status: 200, message: doc});
        }
    })
}

module.exports.removeEmployee = function(req, res){
    console.log('removeEmployee was hit with data: ', req.body)
    var _uniqueEmail = req.body.email;                          //findOneAndUpdate, no model instance is required
    employeesModel.findOneAndDelete({email: _uniqueEmail}, function(err, doc){
        if (err) {
            res.status(400).json({status: 400, error: err});
            throw err
        } else {
            console.log('successfully deleted document: ', doc);
            res.status(200).json({status: 200, message: doc});
        }
    })
}