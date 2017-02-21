var mongoose = require('mongoose');
var credentials = require('../credentials');
var options = {
    server: {
        socketOptions: {
            keepAlive: 1000,
            connectTimeoutMS: 15000,
        }
    }
};
var nodeEnv = process.env.NODE_ENV || 'development';
mongoose.Promise = global.Promise;
switch(nodeEnv){    
    case 'production':        
        mongoose.connect(process.env.MONGOLAB_CONNSTRING, options);
        break;
    default:
        var credentials = require('../credentials.js');
        mongoose.connect(credentials.mongoose.development.connectionString, options);
        break;
}

module.exports = function(){
    return mongoose;
};