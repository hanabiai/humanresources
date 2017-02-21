var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
var Team = require('../models/team');

router.get('/teams', function(req, res, next){
    Team.find().sort('name').exec(function(err, docs){
        if(err) return next(err);
        res.json(docs);
    });
});

router.get('/teams/:teamId', function(req, res, next){
    Team.findOne({_id:req.params.teamId}, function(err, doc){
        if(err) return next(err);
        if(!doc) res.sendStatus(404);     // invalid team
        res.json(doc);
    });
});

module.exports = router;