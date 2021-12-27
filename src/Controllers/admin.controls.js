"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_model_1 = __importDefault(require("../Models/Creators/index.model"));
function loginApi(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userName, password, creator;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, userName = _a.userName, password = _a.password;
                    if (!(!userName || !password)) return [3 /*break*/, 1];
                    return [2 /*return*/, res.status(406).json({ message: 'username or password is not valid', auth: false })];
                case 1: return [4 /*yield*/, index_model_1.default.findUser(userName, password)];
                case 2:
                    creator = _b.sent();
                    if (!creator) {
                        return [2 /*return*/, res.status(406).json({ message: 'username or password is not valid', auth: false })];
                    }
                    // console.log(creator)
                    return [2 /*return*/, res.status(200).json({ message: 'login success', auth: true })];
            }
        });
    });
}
function registerApi(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, firstName, lastName, email, password, userName, newCreator, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(req.body);
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password, userName = _a.userName;
                    // if data is not valid
                    if (!firstName || !lastName || !email || !password || !userName) {
                        return [2 /*return*/, res.status(406).json({ message: 'Please provide valid data', auth: false })];
                    }
                    newCreator = new index_model_1.default({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                        userName: userName
                    });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, newCreator.save()];
                case 2:
                    _b.sent();
                    return [2 /*return*/, res.status(200).json({ message: 'Registraion successfull', auth: true })];
                case 3:
                    error_1 = _b.sent();
                    // if email already present in database
                    if (error_1.code === 11000) {
                        return [2 /*return*/, res.status(406).json({ message: 'this username or email already exits', auth: false })];
                    }
                    return [2 /*return*/, res.status(406).json({ message: error_1.message, auth: false })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var logoutApi = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('before', req.session.user);
        delete req.session.user;
        console.log('after', req.session.user);
        return [2 /*return*/, res.status(200).json({ message: 'you are successfully logout', auth: false })];
    });
}); };
var changeUserName = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userName, changeTo;
    return __generator(this, function (_b) {
        _a = req.body, userName = _a.userName, changeTo = _a.changeTo;
        if (userName === changeTo) {
            return [2 /*return*/, res.status(401).json({ message: 'both username are same' })];
        }
        index_model_1.default.updateOne({ userName: userName }, {
            $set: {
                userName: changeTo
            }
        }).then(function () { return res.send('username changed'); })
            .catch(function (err) { return res.send(err); });
        return [2 /*return*/];
    });
}); };
var home = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res.status(200).json({ message: 'Active' })];
    });
}); };
exports.default = { loginApi: loginApi, registerApi: registerApi, changeUserName: changeUserName, logoutApi: logoutApi, home: home };
