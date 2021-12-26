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
var mongoose_1 = require("mongoose");
var bcrypt_1 = __importDefault(require("bcrypt"));
var creatorSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: true,
        max: 40,
        min: 8
    },
    otp: {
        type: Number,
    },
    firstName: {
        type: String,
        required: true,
        max: 20
    },
    lastName: {
        type: String,
        require: true,
        max: 20
    },
    userName: {
        type: String,
        max: 20,
        require: true,
        unique: true,
        match: [
            /^[a-z-0-9_]*$/, "Only accept underscore "
        ]
    },
    // after registration
    // add socail account like facebook , youtube etc
    creatorPlatform: [
        {
            media: String,
        }
    ],
});
creatorSchema.statics.findUser = function (userName, password) {
    return __awaiter(this, void 0, void 0, function () {
        var creator, isMatch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(userName, password);
                    return [4 /*yield*/, this.findOne({ userName: userName })];
                case 1:
                    creator = _a.sent();
                    if (!creator)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, bcrypt_1.default.compare(password, creator.password)];
                case 2:
                    isMatch = _a.sent();
                    if (!isMatch)
                        return [2 /*return*/, null];
                    return [2 /*return*/, creator
                        // login with email algo
                        // const creatorEmailMatch = await this.findOne({email:userName})
                        // if(!creatorEmailMatch) return null
                        // const isEmailMatch = await bcrypt.compare(password,creatorEmailMatch.password)
                        // if(!isEmailMatch) return null
                        // return creatorEmailMatch
                    ];
            }
        });
    });
};
// if any update to creator schema then its otp will change 
creatorSchema.pre("updateOne", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var creator, newOtp;
        return __generator(this, function (_a) {
            creator = this;
            newOtp = Math.floor(100000 + Math.random() * 1000000);
            creator.otp = newOtp;
            return [2 /*return*/, next()];
        });
    });
});
// function run before save any creator data into DB
creatorSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var creator, salt, hash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    creator = this;
                    if (!creator.isModified("password"))
                        return [2 /*return*/, next()];
                    return [4 /*yield*/, bcrypt_1.default.genSalt(8)];
                case 1:
                    salt = _a.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(creator.password, salt)];
                case 2:
                    hash = _a.sent();
                    // save hash password to DB     
                    creator.password = hash;
                    // create otp
                    creator.otp = Math.floor(100000 + Math.random() * 1000000);
                    // pass to next function to furture logic
                    return [2 /*return*/, next()];
            }
        });
    });
});
// creating shema name
var creator = (0, mongoose_1.model)('creator', creatorSchema);
exports.default = creator;
