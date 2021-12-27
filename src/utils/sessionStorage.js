"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_session_1 = __importDefault(require("express-session"));
var config_1 = __importDefault(require("../../config/config"));
function sessionStorage(app) {
    app.use((0, express_session_1.default)({
        name: 'creatorSession',
        secret: config_1.default.sessionSecret,
        resave: false,
        store: new express_session_1.default.MemoryStore(),
        saveUninitialized: true,
        // if protocal is https then set secure to true
        cookie: {
            secure: false,
            maxAge: 60000,
            httpOnly: true,
            domain: 'localhost'
        }
    }));
}
exports.default = sessionStorage;
