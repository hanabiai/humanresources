var async = require('async');
var hrDB = require(process.cwd() + '/lib/connect-db')();
var Employee = require('../models/employee');
var Team = require('../models/team');

var data = {
    employees: [
        {
            id: '1000003',
            name: {
                first: 'Colin',
                last: 'Ihrig'
            },
            image: 'images/employees/1000003.png',
            address: {
                lines: ['11 Wall Street'],
                city: 'New York',
                state: 'NY',
                zip: 10118
            }
        },  {
            id: '1000021',
            name: {
                first: 'Adam',
                last: 'Bretz'
            },
            address: {
                lines: ['46 18th St', 'St. 210'],
                city: 'Pittsburgh',
                state: 'PA',
                zip: 15222
            }
        }, {
            id: '1000022',
            name: {
                first: 'Matt',
                last: 'Liegey'
            },
            address: {
                lines: ['2 S Market Square', '(Market Square)'],
                city: 'Pittsburgh',
                state: 'PA',
                zip: 15222
            }
        }, {
            id: '1000025',
            name: {
                first: 'Aleksey',
                last: 'Smolenchuk'
            },
            image: 'images/employees/1000025.png' /* invalid image */,
            address: {
                lines: ['3803 Forbes Ave'],
                city: 'Pittsburgh',
                state: 'PA',
                zip: 15213
            }
        }, {
            id: '1000030',
            name: {
                first: 'Sarah',
                last: 'Gay'
            },
            address: {
                lines: ['8651 University Blvd'],
                city: 'Pittsburgh',
                state: 'PA',
                zip: 15108
            }
        }, {
            id: '1000031',
            name: {
                first: 'Dave',
                last: 'Beshero'
            },
            address: {
                lines: ['1539 Washington Rd'],
                city: 'Mt Lebanon',
                state: 'PA',         zip: 15228
            }
        }
    ],
    teams: [
        {
        name: 'Software and Services Group'
        },
        {
        name: 'Project Development'
        }
    ]
};

var addEmps = function(cb){
    console.info('Adding employees');
    Employee.create(data.employees, function(err){
        if(err) return console.error('Error: ' + err);
        console.info('Done adding employees');
        cb();
    });
};

var delEmps = function(cb){
    console.info('Deleting employees');
    Employee.remove({}, function(err){
        if(err) return console.error('Error: ' + err);
        console.info('Done deleting employees');
        cb();
    });
};

var addTeams = function(cb){
    console.info('Adding teams');
    Team.create(data.teams, function(err, team1){
        if(err) return console.error('Error: ' + err);
        data.team_id = team1._id;
        console.info('Done adding teams');
        cb();
    });
};

var delTeams = function(cb){
    console.info('Deleting teams');
    Team.remove({}, function(err){
        if(err) return console.error('Error: ' + err);
        console.info('Done deleting teams');
        cb();
    });
};

var updEmpTeams = function(cb){
    console.info('Updating employees teams');
    var team = data.teams[0];

    // Set everyone to be on the same team to start
    Employee.update({}, { team: data.team_id }, { multi: true }, function(err, numberAffected){
        if(err) return console.error('Error: ' + err);
        console.info('Done updating employees teams');
        cb();
    });
};

async.series([
    delEmps,
    delTeams,
    addEmps,
    addTeams,
    updEmpTeams
], function(err, results){
    if(err) console.error('Error: ' + err);
    hrDB.connection.close();
    console.log('Done!');
});