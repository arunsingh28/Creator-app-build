"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
var shield_middleware_1 = __importDefault(require("../middleware/shield.middleware"));
function default_1(router) {
    router.post("/admin/v1/login", admin_controller_1.default.Login);
    router.post("/admin/v1/register", admin_controller_1.default.Register);
    router.post("/admin/v1/accountTerminate", shield_middleware_1.default, admin_controller_1.default.AccountTerminate);
}
exports.default = default_1;
