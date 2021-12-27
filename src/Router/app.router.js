"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var admin_controls_1 = __importDefault(require("../Controllers/admin.controls"));
var URL_1 = __importDefault(require("./URL"));
var index_auth_1 = require("../Middlewares/Auth/index.auth");
// update update
function default_1(router) {
    // home page for REST
    router.get(URL_1.default.testing, admin_controls_1.default.home);
    // login api @method POST
    router.post(URL_1.default.login, admin_controls_1.default.loginApi);
    // register api @method POST
    router.post(URL_1.default.register, admin_controls_1.default.registerApi);
    // logout api @method GET
    router.get(URL_1.default.logout, admin_controls_1.default.logoutApi);
    /*
    hasloggedin api
    @method POST
    @access private
    */
    router.post(URL_1.default.changeUserName, index_auth_1.requireAuth, admin_controls_1.default.changeUserName);
}
exports.default = default_1;
