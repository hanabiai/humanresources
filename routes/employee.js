var express = require('express');
var router = express.Router();
var Employee = require('../models/employee');
var Team = require('../models/team');

/* GET home page. */
router.get('/employees', function(req, res, next) {
    Employee.find().sort('name.last').exec(function(err, docs){
        if(err) return next(err);
        res.json(docs);
    });
});

router.get('/employees/:employeeId', function(req, res, next){
    Employee.findOne({id: req.params.employeeId}).populate('team').exec(function(err, doc){
        if(err) return next(err);
        if(!doc) res.sendStatus(404);     // invalid user
        res.json(doc);
    });
});

router.put('/employees/:employeeId', function(req, res, next){
    delete req.body._id;
    req.body.team = req.body.team._id;

    Employee.update({id:req.params.employeeId}, req.body, function(err, num, response){
        if(err) return next(err);
        res.send(200);
    });
});

module.exports = router;
