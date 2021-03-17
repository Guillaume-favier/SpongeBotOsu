const bancho = require('bancho.js')
const fs = require('fs')
var dateFormat = require('dateformat');
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
var db = new JsonDB(new Config("command.json", true, false, '/'));
try {
    var data = db.getData("/cmd");
} catch(error) {
    // The error will tell you where the DataPath stopped. In this case test1
    // Since /test1/test does't exist.
    db.push("/cmd",[]);
    console.error(error);
};

const getDate = () => {
    let dateDisplay = dateFormat(new Date(), "yyyy-mm-dd H:MM:ss");
    return dateDisplay
}

let Username = ""
let Password = ""
const getCred = () => {
    const json = fs.readFileSync('cred.json', {encoding:'utf8', flag:'r'}).toString()
    const obj = JSON.parse(json);
    Username = obj['Username']
    Password = obj['ServerPassword']
}
getCred()

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

const realShit = async (message:any, usr:any, client:any) => {
    
    
}

const startOsuBot = async (clientb) => {
    try {
        await clientb.connect();
        console.log('Osu!bot connected ...')
        clientb.on("PM", async({message, user}) =>  {
            const mess = message.toString()
            const usrname = user.ircUsername
            let res:string
            if (usrname === Username) return
            if (mess[0] === '') {
              res = 'don\'t work with /np'
            }else{
              res = sponged(mess)
            }
            console.log(`[${usrname}]: ${mess} <${getDate()}>`)
            res = sponged(mess) 
            console.log('↳ '+res)
            db.push("/cmd[]",{usrname,mess,res,'time':getDate()});
            return await user.sendMessage(res)
        })
    } catch (error) {
        console.error(error)
    }
}
startOsuBot(clientf);