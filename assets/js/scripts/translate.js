var translate = {
	// elapse time since onclick event
	time: false,
	// active language
	active: 'en',
	total: false,
	// request & respond object
	req_json: [],
	res_json: [],
	

	// initialize
	init: function() {
		translate.event_listener();
	},

	// apportion string to appropriate node element
	decompile: function(json) {
		let res = json.text + '';
		let text = res.split('====');

		for(let i=0;i<translate.req_json.length;i++) {
			let json_obj = {
				'node': translate.req_json[i].node,
				'text': text[i],
			};
			translate.res_json.push(json_obj);
		}
		translate.handler();
	},

	// handle ajax error
	error: function() {
		const copy = document.getElementsByClassName('loader-copy')[0];

		for(let i=0;i<copy.children.length;i++) {
			copy.children[i].style.display = 'none';
		}
		copy.innerText = 'error';

		setTimeout(function() {
			loader.handler(true);
			translate.event_listener();
			setTimeout(function() {
				copy.innerText = '';
				for(let i=0;i<copy.children.length;i++) {
					copy.children[i].style.display = 'initial';
				}
			}, 500); // time for loader to hide
		}, 2000);	
	},

	// ajax to server which in turn calls Yandex server
	ajax: function(text) {
		let data = {'text': text};
		let res;

		let xhr = new XMLHttpRequest();
		xhr.open('POST', 'translate');
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.timeout = 15000;
		xhr.send(JSON.stringify(data));

		xhr.onload = function() {
			res = JSON.parse(xhr.responseText);
			translate.decompile(res);
			console.log(xhr.status);
			console.log(res.text);
			console.log(res.text.length);
		};

		xhr.onerror = function() {
			translate.error();
		};

		xhr.ontimeout = function() {
			xhr.abort();
			translate.error();
		};
	},

	// compile all the text into single string
	compile: function() {
		let req = translate.req_json;
		let text = '';

		for(let i=0;i<req.length;i++) {
			text += req[i].text;
			text += '====';
		}
		translate.ajax(text);
	},

	// push objs to req_json
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
			document.getElementsByClassName('home-article__header-copy'),
			document.getElementsByClassName('home-article__content-copy'),
			document.getElementsByClassName('home-article__content-copy--color'),
			document.getElementsByClassName('title--sm'),
			document.getElementsByClassName('article__copy'),
			document.getElementsByClassName('article__link')];

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

	// handle event clicks & decompile completion
	handler: function() {
		let req = translate.req_json;
		let res = translate.res_json;
		let time = translate.time; // time that has passed since onclick

		if(res.length) {
			if(translate.active === 'en') {
				translate.active = 'fr';
				setTimeout(function() {
					loader.handler(true);
					translate.event_listener();
					active();
					for(let i=0;i<res.length;i++) {
						res[i].node.innerHTML = res[i].text;
					}
				}, 1000 - time);
			}
			else if(translate.active === 'fr') {
				translate.active = 'en';
				setTimeout(function() {
					loader.handler(true);
					translate.event_listener();
					active();
					for(let i=0;i<req.length;i++) {
						res[i].node.innerHTML = req[i].text;
					}
				}, 1000 - time);
			}
		}
		else if(!res.length) {
			translate.prepare();
		}

		// visually shows the switch between languages
		function active() {
			const lang = document.getElementsByClassName('lang-list__link');
			setTimeout(function() {
				for(let j=0;j<lang.length;j++) {
					lang[j].classList.remove('active');
					if(lang[j].innerHTML === translate.active +'.') {
						lang[j].classList.add('active');
					}
				}
			}, 500); // time for loader to hide
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
						// set start time
						translate.time = performance.now();
						// call
						translate.handler();
						loader.handler();
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
						// set start time
						translate.time = performance.now();
						// call
						translate.handler();
						loader.handler();
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

// call
translate.init();