const ttext = (obj) => {
	return JSON.stringify(obj,null,4)
}
const charge = (t) => {
    return JSON.parse(t)
}
const beuty = (t) => {
    return ttext(charge(t))
}
const allposs = (t,data) => {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (t === element) {
            return true
        }
    }
    return false
}
const clg = (e) => console.log(e)
module.exports = {ttext,charge,beuty,allposs,clg}