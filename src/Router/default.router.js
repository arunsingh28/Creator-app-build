"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var URL_1 = __importDefault(require("./URL"));
function default_1(defaultRouter) {
    // trust first proxy
    defaultRouter.set("trust proxy", 1);
    // if wrong url 
    defaultRouter.get("*", function (req, res) {
        return res.send("invalid URL : <mark><b>".concat(req.hostname).concat(req.originalUrl, "</b></mark>\n        </br>\n        this page is redirecting to login page in 5 sec.\n        <script>\n        setTimeout(()=>{\n            console.log('redircting')\n            location.href = '").concat(URL_1.default.testing, "'\n        },5000)\n        </script>\n        "));
    });
}
exports.default = default_1;
