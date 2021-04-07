const bancho = require('bancho.js')
const fs = require('fs')
var dateFormat = require('dateformat');
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
var db = new JsonDB(new Config("command.json", true, false, '/'));
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// const sel = "body > div.osu-layout__section.osu-layout__section--full.js-content.user_show > div > div > div > div.js-switchable-mode-page--scrollspy.js-switchable-mode-page--page > div.osu-page.osu-page--users > div > div.profile-header__top > div.profile-stats > dl:nth-child(3) > dd"
const clg = (m) => console.log(m)
try {
    var data = db.getData("/cmd");
} catch(error) {
    // The error will tell you where the DataPath stopped. In this case test1
    // Since /test1/test does't exist.
    db.push("/cmd",[]);
    console.error(error);
};

const allCases = (entry:string,possiblities:Array<string>) => {
    for (let i = 0; i < possiblities.length; i++) {
        if (entry.startsWith(possiblities[i])) return true
        return false
    }
}

const getDate = () => {
    let dateDisplay = dateFormat(new Date(), "yyyy-mm-dd H:MM:ss");
    return dateDisplay
}

// connection to bancho 
let Username = ""
let Password = ""
const getCred = () => {
    const json = fs.readFileSync('cred.json', {encoding:'utf8', flag:'r'}).toString()
    const obj = JSON.parse(json);
    Username = obj['Username']
    Password = obj['ServerPassword']
}
getCred()

//sponged func

const sponged = (s:string):string => {
    s = s.toLowerCase()
    let newS = ""
    // let up = true
    for (let i = 0; i < s.length; i++) {
        const element = s[i];
        // if (up) {
        //     newS += element.toUpperCase()
        //     up=false
        // }else {
        //     up = true
        //     newS += element
        // }
        if (Math.floor((Math.random() * 2) + 1) === 1){
            newS += element.toUpperCase()
        }else{
            newS += element
        }
    }
    return newS
}

const clientf = new bancho.BanchoClient({
    username: Username,
    password: Password
})


const startOsuBot = async (clientb) => {
    try {
        await clientb.connect();
        console.log('Osu!bot connected ...')
        clientb.on("PM", async({message, user}) => {
            const mess = message.toString()
            const usrname = user.ircUsername
            let res:string
            if (usrname === Username) return
            if (mess[0] === '') {
                res = 'don\'t work with /np'
            }else if(mess.startsWith('!help')){
                res = "お可愛いこと (おかわいいかと (o kawaii koto))"
            }else if(allCases(mess.toLowerCase(),['salut','bonjour','wesh'])){
                res = "Enchanté."
            }else if(allCases(mess.toLowerCase(),['lel','lul','lol'])){
                res = "Ah ça te fait rire."
            }else if(allCases(mess.toLowerCase(),['t\'es qui','t ki','t\'es','qui es-tu'])){
                res = "Le mec qui va te foutre au chaumage."
            }else if(allCases(mess.toLowerCase(),['!stop','stop','top','rnd'])){
                clg("Stop requested !")
                await sleep((Math.random() * 10000) + 1)
                res = "Now!"
            }else if(allCases(mess.toLowerCase(),['!playtime'])){
                clg(bancho)
                // res = usrdontknow.playcount.toString()
            }else{
                res = sponged(mess)
            }
            console.log(`[${usrname}]: ${mess} <${getDate()}>`)
            console.log('↳ '+res)
            db.push("/cmd[]",{usrname,mess,res,'time':getDate()});
            return await user.sendMessage(res)
        })
    } catch (error) {
        console.error(error)
    }
}
startOsuBot(clientf);