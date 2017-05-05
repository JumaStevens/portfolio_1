var contact_form = {
	open: false,

	// initialize
	init: function() {
		const contact = document.getElementsByClassName('contact')[0];
		const form = document.getElementsByClassName('contact-form')[0];
		const side = document.getElementsByClassName('contact-side')[0];
		const button = document.getElementsByClassName('contact-button');

		if(screen.width < media_query.tablet) {
			for(let i=0;i<button.length;i++) {
				button[i].href = 'mailto:jumastevens@gmail.com';
				button[i].rel = 'external';
			}
		}
		else if(screen.width >= media_query.tablet) {
			for(let i=0;i<button.length;i++) {
				button[i].removeAttribute('href');
				button[i].removeAttribute('rel');
			}
			contact_form.open = true;
			contact_form.button_listener();
			contact_form.submit_listener();
			contact_form.cancel_listener();
			contact_form.blur_listener();
			contact.classList.add('open');
			form.classList.remove('hide');
			side.classList.remove('hide');
		}
	},

	// ajax response handler
	response: function(res) {
		const contact = document.getElementsByClassName('contact')[0];
		const form = document.getElementsByClassName('contact-form')[0];
		const submit = document.getElementsByClassName('contact-form__submit')[0];
		const side_container = document.getElementsByClassName('contact-side-container')[0];
		const circle = document.getElementsByClassName('contact-side__circle')[0];
		const email_svg = document.getElementsByClassName('contact-side__email-svg')[0];
		const paperplane = document.getElementsByClassName('contact-side__paperplane-svg');
		const email = document.getElementsByClassName('contact-side__email')[0];
		const status = document.getElementsByClassName('contact-side__status')[0];

		if(res === 'success') {
			status.classList.add('hide');
			setTimeout(function(){
				status.innerHTML = 'Sent.';
				status.classList.remove('hide');
			}, 500);
			setTimeout(function(){
				contact_form.close();
			}, 4000);
		}
		else if(res === 'error') {
			status.innerHTML = 'Oops! Try again.';
			setTimeout(function(){
				form.classList.remove('sending');
				side_container.classList.remove('sending');
				circle.classList.remove('sending');
				email_svg.classList.remove('hide');
				paperplane[0].classList.remove('sending');
				paperplane[1].classList.remove('sending');
				email.classList.remove('hide');
				status.classList.add('hide');
			}, 4000);
		}
		setTimeout(function(){
			form.action = 'contact-form';
			form.method = 'post';
			submit.type = 'submit';
		}, 4000);
	},

	// ajax handler
	ajax: function() {
		const form = document.getElementsByClassName('contact-form')[0];
		// collect form data
		let data = {
			'name': form.name.value,
			'email': form.email.value,
			'message': form.message.value,
			'company': form.company.value
		};

		let xhr = new XMLHttpRequest();
		xhr.open('POST', 'contact_form');
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.timeout = 15000;
		xhr.send(JSON.stringify(data));
		
		xhr.onload = function() {
			// success
			if(JSON.parse(xhr.responseText).msg === 'success') {
				contact_form.response('success');
			}
			// error
			else {
				contact_form.response('error');
			}
		};

		xhr.onerror = function() {
			// error
			contact_form.response('error');
		};

		xhr.ontimeout = function() {
			// error
			xhr.abort();
			contact_form.response('error');
		};
	},


	// submit validation
	validation: function(e) {
		const form = document.getElementsByClassName('contact-form')[0];
		const input = document.getElementsByClassName('contact-form__input');
		const submit = document.getElementsByClassName('contact-form__submit')[0];
		const honeypot = document.getElementsByClassName('contact-form__honeypot')[0];

		// prevent submit
		e.preventDefault();
		form.action = '';
		form.method = '';
		submit.type = '';

		// check honeypot
		if(honeypot.value) {
			spam();
		}
		else if(!honeypot.value) {
			// check input values
			for(let i=0;i<input.length;i++) {
				if(input[i].value) {
					if(i+1 === input.length) {
						contact_form.submit();
					}
				}
				else if(!input[i].value) {
					invalid(i);
					break;
				}
			}
		}

		function invalid(i) {
			let text = '** Required field **';
			input[i].value = text;
			setTimeout(function(){
				if(input[i].value = text) {
					input[i].value = '';
				}
				form.action = 'contact-form';
				form.method = 'post';
				submit.type = 'submit';
			}, 2000);
		};

		function spam() {
			const email = document.getElementsByClassName('contact-side__email')[0];
			const status = document.getElementsByClassName('contact-side__status')[0];
			email.classList.add('hide');
			status.classList.remove('hide');
			status.innerHTML = 'Spam detected!';
			setTimeout(function(){
				email.classList.remove('hide');
				status.classList.add('hide');
				form.action = 'contact-form';
				form.method = 'post';
				submit.type = 'submit';
			}, 4000);
		};
	},

	// submit handler
	submit: function() {
		const contact = document.getElementsByClassName('contact')[0];
		const form = document.getElementsByClassName('contact-form')[0];
		const side_container = document.getElementsByClassName('contact-side-container')[0];
		const circle = document.getElementsByClassName('contact-side__circle')[0];
		const email_svg = document.getElementsByClassName('contact-side__email-svg')[0];
		const paperplane = document.getElementsByClassName('contact-side__paperplane-svg');
		const email = document.getElementsByClassName('contact-side__email')[0];
		const status = document.getElementsByClassName('contact-side__status')[0];

		form.classList.add('sending');
		side_container.classList.add('sending');
		circle.classList.add('sending');
		email_svg.classList.add('hide');
		paperplane[0].classList.add('sending');
		paperplane[1].classList.add('sending');
		email.classList.add('hide');
		status.classList.remove('hide');
		status.innerHTML = 'Sending';
		for(let p=0;p<3;p++) {
			status.innerHTML += '<span class="contact-side__status--period">.</span>';
		}
		// call ajax
		contact_form.ajax();
	},
	
	// close handler
	close: function() {
		const contact = document.getElementsByClassName('contact')[0];
		const form = document.getElementsByClassName('contact-form')[0];
		const side = document.getElementsByClassName('contact-side')[0];
		const circle = document.getElementsByClassName('contact-side__circle')[0];
		const email_svg = document.getElementsByClassName('contact-side__email-svg')[0];
		const email = document.getElementsByClassName('contact-side__email')[0];
		const status = document.getElementsByClassName('contact-side__status')[0];
		
		contact_form.open = false;
		contact_form.button_listener();
		contact_form.blur_listener();
		contact.classList.remove('open');
		form.classList.add('hide');
		side.classList.add('hide');
		circle.classList.remove('sending');
		email_svg.classList.remove('hide');
		email.classList.remove('hide');
		status.classList.add('hide');
	},

	// contact-button listener
	button_listener: function() {
		const button = document.getElementsByClassName('contact-button');
		if(contact_form.open) {
			button[0].removeEventListener('click', contact_form.init, false);
			button[1].removeEventListener('click', contact_form.init, false);
		}
		else if(!contact_form.open) {
			button[0].addEventListener('click', contact_form.init, false);
			button[1].addEventListener('click', contact_form.init, false);
		}
	},

	// sumbit listener
	submit_listener: function() {
		const form = document.getElementsByClassName('contact-form')[0];
		if(contact_form.open) {
			form.addEventListener('submit', contact_form.validation, false);
		}
		else if(!contact_form.open) {
			form.removeEventListener('submit', contact_form.validation, false);
		}
	},

	// cancel listener
	cancel_listener: function() {
		const cancel = document.getElementsByClassName('contact-form__cancel')[0];
		if(contact_form.open) {
			cancel.addEventListener('click', function close() {
				const input = document.getElementsByClassName('contact-form__input');
				for(let i=0;i<input.length;i++) {
					input[i].value = '';
				}
				contact_form.close();
			}, false);
		}
		else if(!contact_form.open) {
			cancel.removeEventListener('click', close, false);
		}
	},

	// input blur listener
	blur_listener: function() {
		const input = document.getElementsByClassName('contact-form__input');
		if(contact_form.open) {
			for(let i=0;i<input.length;i++) {
				input[i].addEventListener('blur', function blur() {
					if(input[i].value) {
						input[i].classList.add('value');
					}
					else if(!input[i].value) {
						input[i].classList.remove('value');
					}
				}, false);
			}
		}
		else if(!contact_form.open) {
			for(let i=0;i<input.length;i++) {
				input[i].removeEventListener('blue', blur, false);
			}
		}
	}
};