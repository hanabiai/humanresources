var mongoose = require('mongoose');
var async = require('async');

var Schema = mongoose.Schema;
var teamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    members: {
        type: [Schema.Types.Mixed],
    }
}, { autoIndex: false });

function _attachMembers(Employee, result, cb) {
    Employee.find({ team: result._id }, function(err, employees){
        if(err) return cb(err);
        result.members = employees;
        cb(null, result);
    });
}

// teamSchema.plugin(postFind, {
//     find: function(result, cb){
//         var Employee = mongoose.model('Employee');

//         async.each(result, function(item, cb){
//             _attachMembers(Employee, item, cb);
//         }, function(err){
//             if(err) return cb(err);
//             cb(null, result);
//         });
//     },
//     findOne: function(result, cb){
//         var Employee = mongoose.model('Employee');
//         _attachMembers(Employee, result, cb);
//     }
// });

module.exports = mongoose.model('Team', teamSchema);