"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var portListning_1 = __importDefault(require("../config/portListning"));
var app_router_1 = __importDefault(require("./Router/app.router"));
var default_router_1 = __importDefault(require("./Router/default.router"));
var sessionStorage_1 = __importDefault(require("./utils/sessionStorage"));
var mongoDB_connection_1 = require("./utils/mongoDB.connection");
// init dotnev
dotenv_1.default.config();
// init express to app
var app = (0, express_1.default)();
// cores
app.use((0, cors_1.default)());
// database connection
(0, mongoDB_connection_1.connectDB)();
//********* bodyParses ***********
// if data in json format
app.use(express_1.default.json());
// if data in plain text format
app.use(express_1.default.text());
// session layer
(0, sessionStorage_1.default)(app);
// Router 
(0, app_router_1.default)(app);
// default router
(0, default_router_1.default)(app);
// server start
(0, portListning_1.default)(app);
