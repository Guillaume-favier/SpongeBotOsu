var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const bancho = require('bancho.js');
const fs = require('fs');
var dateFormat = require('dateformat');
const getDate = () => {
    let dateDisplay = dateFormat(new Date(), "yyyy-mm-dd H:MM:ss");
    return dateDisplay;
};
let Username = "";
let Password = "";
const getCred = () => {
    const json = fs.readFileSync('cred.json', { encoding: 'utf8', flag: 'r' }).toString();
    const obj = JSON.parse(json);
    Username = obj['Username'];
    Password = obj['ServerPassword'];
};
getCred();
const sponged = (s) => {
    s = s.toLowerCase();
    let newS = "";
    let up = true;
    for (let i = 0; i < s.length; i++) {
        const element = s[i];
        if (up) {
            newS += element.toUpperCase();
            up = false;
        }
        else {
            up = true;
            newS += element;
        }
    }
    return newS;
};
const clientf = new bancho.BanchoClient({
    username: Username,
    password: Password
});
const realShit = (message, usr, client) => __awaiter(this, void 0, void 0, function* () {
});
const startOsuBot = (clientb) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield clientb.connect();
        console.log('Osu!bot connected ...');
        clientb.on("PM", ({ message, user }) => __awaiter(this, void 0, void 0, function* () {
            const mess = message.toString();
            const usrname = user.ircUsername;
            if (usrname === Username)
                return;
            if (mess[0] === '') {
                console.log('nooooooo');
                return yield user.sendMessage('don\'t work with /np');
            }
            console.log(`[${usrname}]: ${mess} <${getDate()}>`);
            const res = sponged(mess);
            console.log('↳ ' + res);
            return yield user.sendMessage(res);
        }));
    }
    catch (error) {
        console.error(error);
    }
});
startOsuBot(clientf);
//# sourceMappingURL=app.js.map