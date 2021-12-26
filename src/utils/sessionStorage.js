"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatorSession = void 0;
var express_session_1 = __importDefault(require("express-session"));
var config_1 = __importDefault(require("../../config/config"));
var CreatorSession = /** @class */ (function () {
    function CreatorSession() {
        this.firstName = '';
        this.lastName = '';
        this.password = '';
        this.email = '';
        this.userName = '';
        // platefrom: Array<CreatorDocument> = [];
    }
    return CreatorSession;
}());
exports.CreatorSession = CreatorSession;
function sessionStorage(app) {
    app.use((0, express_session_1.default)({
        secret: config_1.default.sessionSecret,
        resave: false,
        saveUninitialized: true,
        // if protocal is https then set secure to true
        cookie: { secure: false }
    }));
}
exports.default = sessionStorage;
