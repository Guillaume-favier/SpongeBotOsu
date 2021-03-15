const bancho = require('bancho.js')
const fs = require('fs')
var dateFormat = require('dateformat');

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
    let up = true
    for (let i = 0; i < s.length; i++) {
        const element = s[i];
        if (up) {
            newS += element.toUpperCase()
            up=false
        }else {
            up = true
            newS += element
        }
        // if (Math.floor((Math.random() * 2) + 1) === 1){
        //     newS += element.toUpperCase()
        // }else{
        //     newS += element
        // }
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
            if (usrname === Username) return
            if (mess[0] === '') {
                console.log('nooooooo')
                return await user.sendMessage('don\'t work with /np')
            }
            console.log(`[${usrname}]: ${mess} <${getDate()}>`)
            const res = sponged(mess) 
            console.log('↳ '+res)
            return await user.sendMessage(res)
        })
    } catch (error) {
        console.error(error)
    }
}
startOsuBot(clientf);