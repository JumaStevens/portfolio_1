// api key: trnsl.1.1.20170502T212734Z.f3beefb94ac7fdba.6233890982444fd545d3265f061dad7431274b70

var translate = {
	// active language
	active: 'en',
	total: false,
	// 
	req_json: [],
	res_json: [],
	

	// initialize
	init: function() {
		translate.event_listener();
	},

	//
	decompile: function(json) {
		let res = json.text + '';
		let text = res.split('////');

		for(let i=0;i<translate.req_json.length;i++) {
			let json_obj = {
				'node': translate.req_json[i].node,
				'text': text[i],
			};
			translate.res_json.push(json_obj);
		}
		translate.handler();
	},

	//
	ajax: function(text) {
		const api_key = 'trnsl.1.1.20170502T212734Z.f3beefb94ac7fdba.6233890982444fd545d3265f061dad7431274b70';
		const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
		const lang = 'en-fr';
		let data = 'key='+ api_key +'&text='+ text +'&lang='+lang;

		let xhr = new XMLHttpRequest();
		xhr.open('post', url, true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send(data);
		xhr.onload = function() {
			translate.decompile(JSON.parse(xhr.responseText));
		};
	},

	//
	compile: function() {
		let req = translate.req_json;
		let text = '';

		for(let i=0;i<req.length;i++) {
			text += req[i].text;
			text += '////';
		}
		translate.ajax(text);
	},

	// 
	push: function(target, text) {
		let json_obj = {
						'node': target,
						'text': text
						};
		translate.req_json.push(json_obj);
		if(translate.req_json.length === translate.total) {
			translate.compile();
		}
	},

	// prepare
	prepare: function() {
		const node = [
			document.getElementsByClassName('article__copy')];

		for(let i=0;i<node.length;i++) {
			for(let j=0;j<node[i].length;j++) {
				translate.total += 1;
			}
		}
		
		for(let i=0;i<node.length;i++) {
			for(let j=0;j<node[i].length;j++) {
				let target = node[i][j];
				let text = target.innerText;
				translate.push(target, text);
			}
		}
	},

	//
	handler: function() {
		let req = translate.req_json;
		let res = translate.res_json;

		if(res.length) {
			if(translate.active === 'en') {
				translate.active = 'fr';
				translate.event_listener();
				for(let i=0;i<res.length;i++) {
					res[i].node.innerHTML = res[i].text;
				}
			}
			else if(translate.active === 'fr') {
				translate.active = 'en';
				translate.event_listener();
				for(let i=0;i<req.length;i++) {
					res[i].node.innerHTML = req[i].text;
				}
			}
		}
		else if(!res.length) {
			translate.prepare();
		}

		//  
		const lang = document.getElementsByClassName('lang-list__link');
		for(let j=0;j<lang.length;j++) {
			lang[j].classList.remove('active');
			if(lang[j].innerHTML === translate.active +'.') {
				lang[j].classList.add('active');
			}
		}
	},

	// language listeners
	event_listener: function() {
		const lang = document.getElementsByClassName('lang-list__link');
		// add listeners to fr, remove en
		if(translate.active === 'en') {
			for(let i=0;i<lang.length;i++) {
				if(lang[i].innerHTML === 'fr.') {
					lang[i].addEventListener('click', function lang_switch() {
						// call
						translate.handler();
						// remove
						for(let j=0;j<lang.length;j++) {
							if(lang[j].innerHTML === 'fr.') {
								lang[j].removeEventListener('click', lang_switch, false);
							}
						}
					}, false);
				}
			}
		}
		// add listeners to en, remove fr
		else if(translate.active === 'fr') {
			for(let i=0;i<lang.length;i++) {
				if(lang[i].innerHTML === 'en.') {
					lang[i].addEventListener('click', function lang_switch() {
						// call
						translate.handler();
						// remove
						for(let j=0;j<lang.length;j++) {
							if(lang[j].innerHTML === 'en.') {
								lang[j].removeEventListener('click', lang_switch, false);
							}
						}
					}, false);
				}
			}
		}
	}
};

translate.init();