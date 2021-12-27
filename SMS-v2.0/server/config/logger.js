"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getTimeStamp = function () {
    return new Date().toISOString();
};
var info = function (namespace, message, object) {
    if (object) {
        console.log("[".concat(getTimeStamp(), "] [INFO] [").concat(namespace, "] ").concat(message), object);
    }
    else {
        console.log("[".concat(getTimeStamp(), "] [INFO] [").concat(namespace, "] ").concat(message));
    }
};
exports.default = { info: info };
