"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mode = {
    prod: 'mongodb+srv://arun:1234@cluster0.t3qon.mongodb.net/creator-app-V1?retryWrites=true&w=majority',
    dev: 'mongodb://localhost:27017/creator-app'
};
// if env is true mode is production  
// if env is false mode is development
var env = true;
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
var SERVER_PORT = process.env.PORT || 5000;
var SESSION_SECRET = ' c4e0cfcc8ca41eff91baf0ace559d2f381927655';
var MONGODB_URI = env ? mode.prod : mode.dev;
var configService = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    sessionSecret: SESSION_SECRET,
    mongodbUri: MONGODB_URI
};
exports.default = configService;
