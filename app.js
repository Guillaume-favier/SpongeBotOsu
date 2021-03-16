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
exports.__esModule = true;
var bancho = require('bancho.js');
var fs = require('fs');
var dateFormat = require('dateformat');
var node_json_db_1 = require("node-json-db");
var JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
var db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("command.json", true, false, '/'));
try {
    var data = db.getData("/cmd");
}
catch (error) {
    // The error will tell you where the DataPath stopped. In this case test1
    // Since /test1/test does't exist.
    db.push("/cmd", []);
    console.error(error);
}
;
var getDate = function () {
    var dateDisplay = dateFormat(new Date(), "yyyy-mm-dd H:MM:ss");
    return dateDisplay;
};
var Username = "";
var Password = "";
var getCred = function () {
    var json = fs.readFileSync('cred.json', { encoding: 'utf8', flag: 'r' }).toString();
    var obj = JSON.parse(json);
    Username = obj['Username'];
    Password = obj['ServerPassword'];
};
getCred();
var sponged = function (s) {
    s = s.toLowerCase();
    var newS = "";
    var up = true;
    for (var i = 0; i < s.length; i++) {
        var element = s[i];
        if (up) {
            newS += element.toUpperCase();
            up = false;
        }
        else {
            up = true;
            newS += element;
        }
        // if (Math.floor((Math.random() * 2) + 1) === 1){
        //     newS += element.toUpperCase()
        // }else{
        //     newS += element
        // }
    }
    return newS;
};
var clientf = new bancho.BanchoClient({
    username: Username,
    password: Password
});
var realShit = function (message, usr, client) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
var startOsuBot = function (clientb) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, clientb.connect()];
            case 1:
                _a.sent();
                console.log('Osu!bot connected ...');
                clientb.on("PM", function (_a) {
                    var message = _a.message, user = _a.user;
                    return __awaiter(void 0, void 0, void 0, function () {
                        var mess, usrname, res;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    mess = message.toString();
                                    usrname = user.ircUsername;
                                    if (usrname === Username)
                                        return [2 /*return*/];
                                    if (mess[0] === '') {
                                        res = 'don\'t work with /np';
                                    }
                                    else {
                                        res = sponged(mess);
                                    }
                                    console.log("[" + usrname + "]: " + mess + " <" + getDate() + ">");
                                    res = sponged(mess);
                                    console.log('↳ ' + res);
                                    db.push("/cmd[]", { usrname: usrname, mess: mess, 'time': getDate() });
                                    return [4 /*yield*/, user.sendMessage(res)];
                                case 1: return [2 /*return*/, _b.sent()];
                            }
                        });
                    });
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
startOsuBot(clientf);
