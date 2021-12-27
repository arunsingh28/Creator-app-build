"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("../config/config"));
var logger_1 = __importDefault(require("../config/logger"));
var DB_1 = require("./utils/DB");
var router_1 = __importDefault(require("./routes/router"));
var admin_1 = __importDefault(require("./routes/admin"));
var cors_1 = __importDefault(require("cors"));
var session_middleware_1 = __importDefault(require("./middleware/session.middleware"));
// init express variable to app =====================
var app = (0, express_1.default)();
var NAMESPACE = "server";
// body parser =======================================
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(express_1.default.urlencoded({ extended: false }));
// databse connection =================================
(0, DB_1.connectDB)();
// Policy =================================
app.use((0, cors_1.default)());
// logger =============================================
app.use(function (req, res, next) {
    logger_1.default.info(NAMESPACE, "METHOD - [".concat(req.method, "], URL - [").concat(req.url, "], IP - [").concat(req.socket.remoteAddress, "]"));
    res.on("finish", function () {
        logger_1.default.info(NAMESPACE, "METHOD - [".concat(req.method, "], URL - [").concat(req.url, "], IP - [").concat(req.socket.remoteAddress, "], STATUS - [").concat(res.statusCode, "]"));
    });
    next();
});
// app.use((req, res, next) => {
//   res.append("Access-Control-Allow-Origin", ["*"]);
//   res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.append("Access-Control-Allow-Headers", "application/json");
//   next();
// });
// proxy ==============================================
// app.set("trust proxy", 1);
// session ============================================
(0, session_middleware_1.default)(app);
// Public router ========================================
(0, router_1.default)(app);
// Admin router ========================================
(0, admin_1.default)(app);
// invalid url handling ===============================
app.use(function (req, res, next) {
    var error = new Error("Page not found");
    return res
        .status(404)
        .json({ message: error.message, statusCode: res.statusCode });
});
// server start ======================================
var server = app.listen(config_1.default.port, function () {
    console.log("Server started on port ".concat(config_1.default.port));
});
// handle server crash ===============================
process.on("unhandledRejection", function (err, promise) {
    console.log("logged Error: ".concat(err));
    server.close(function () { return process.exit(1); });
});
