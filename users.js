const fetch = require("node-fetch")
const {ttext,charge,beuty,allposs,clg} = require("./common")
const fs = require("fs")
const cheerio = require('cheerio');

const SelectTheUser = (users,usrname) => {
	for (let i = 0; i < users.length; i++) {
		const element = users[i];
		if(element["username"] == usrname) return element
	}
}

const getjsonfrompage = (page) => {
	const $ = cheerio.load(page)
	return $("script#json-user").html()
}

const goodDisplay = (json) => {
	let res = `[https://osu.ppy.sh/users/${json["id"]} ${json["username"]}]`
	if (json["statistics"]["global_rank"] != null) {
		res+= `, #${json["statistics"]["global_rank"]}`
	}
	if (json["country"]["name"] != false) {
		res+=`, ${json["country"]["name"]}`
		if (json["location"] != null) {
			res+=` (${json["location"]})`
		}
	}
	if (json["is_restricted"] != false){
		res+=", is restricted"
	}if (json["is_silenced"] != false){
		res+=", is silenced"
	}if (json["is_moderator"] != false){
		res+=", is moderator"
	}if (json["is_admin"] != false){
		res+=", is admin"
	}if (json["is_supporter"] != false){
		res+=", is suporter"
	}if (json["is_online"] != false){
		res+=", is online"
	}if (json["is_deleted"] != false){
		res+=", is deleted"
	}if (json["is_bot"] != false){
		res+=", is a bot"
	}if (json["support_level"] != null && json["support_level"] != 0){
		res+=", "
		for (let i = 0; i < json["support_level"]; i++) {
			res+="❤"
		}
	}if (json["statistics"]["play_time"] != null && json["statistics"]["play_time"] != 0) {
		d = Math.floor(json["statistics"]["play_time"]/60/1440); // 60*24
		h = Math.floor((json["statistics"]["play_time"]/60-(d*1440))/60);
		m = Math.round(json["statistics"]["play_time"]/60%60);
		if(d>0){
			res += ", played for : " +d + " days, " + h + " hours, "+m+" minutes";
		}else{
			res += ", played for : " +h + " hours, "+m+" minutes";
		}
	}if (json["join_date"] != null) {
		res+= ", join the "+new Date(json["join_date"]).toDateString()
	}
	return res
}

const getAll = async (name) => {
	return new Promise(function(myResolve, myReject) {
        const cookie = fs.readFileSync("cookie.txt")
		const test = fetch("https://osu.ppy.sh/home/quick-search?query="+encodeURIComponent(name), {
		"headers": {
			"accept": "*/*",
			"accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			"x-csrf-token": "rdLno826hIiDa2V8SbCSzR51YPO62mPLwfgFH4kv",
			"x-requested-with": "XMLHttpRequest",
			"cookie": cookie
		},
		"referrer": "https://osu.ppy.sh/home",
		"referrerPolicy": "strict-origin-when-cross-origin",
		"body": null,
		"method": "GET",
		"mode": "cors"
		})
		// test.then(res => console.log(res.text()))
			.then(res => res.text())
			.then(body => {
                if (!body || body.status == 401) {myResolve("error");return}
				const tmp = SelectTheUser(charge(body)["user"]["users"],name)
				if (!tmp) {myResolve("no users found");return}
				const userPage = fetch("https://osu.ppy.sh/users/"+tmp["id"], {
				"headers": {
					"accept": "*/*",
					"accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
					"sec-fetch-dest": "empty",
					"sec-fetch-mode": "cors",
					"sec-fetch-site": "same-origin",
					"x-csrf-token": "rdLno826hIiDa2V8SbCSzR51YPO62mPLwfgFH4kv",
					"x-requested-with": "XMLHttpRequest",
					"cookie": cookie
				},
				"referrer": "https://osu.ppy.sh/home",
				"referrerPolicy": "strict-origin-when-cross-origin",
				"body": null,
				"method": "GET",
				"mode": "cors"
				})
					.then(res => res.text())
					.then(body => {
						myResolve(goodDisplay(charge(getjsonfrompage(body))))
					})

			});
		
	})
}

module.exports = {getAll}