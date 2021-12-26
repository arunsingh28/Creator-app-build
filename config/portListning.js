"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("./config"));
// server port listening fucntion 
// default port is 80
function default_1(app) {
    app.listen(config_1.default.port, function () {
        console.log("server is up on port : ".concat(config_1.default.port, "\n**visit http://").concat(config_1.default.hostname, ":").concat(config_1.default.port, "**"));
    });
}
exports.default = default_1;
