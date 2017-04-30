var contact_form = {
	open: false,

	// initialize
	init: function() {
		const contact = document.getElementsByClassName('contact')[0];
		const form = document.getElementsByClassName('contact-form')[0];
		const side = document.getElementsByClassName('contact-side')[0];
		contact_form.open = true;
		contact_form.submit_listener();
		contact_form.cancel_listener();
		contact_form.blur_listener();
		contact.classList.add('open');
		form.classList.remove('hide');
		side.classList.remove('hide');
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
		status.innerHTML = 'Sending...'

		console.log('SUBMIT CLICKED');

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
		const button = document.getElementsByClassName('contact-form__submit')[0];
		if(contact_form.open) {
			button.addEventListener('click', contact_form.submit, false);
		}
		else if(!contact_form.open) {
			button.removeEventListener('click', contact_form.submit, false);
		}
	},

	// cancel listener
	cancel_listener: function() {
		const cancel = document.getElementsByClassName('contact-form__cancel')[0];
		if(contact_form.open) {
			cancel.addEventListener('click', contact_form.close, false);
		}
		else if(!contact_form.open) {
			cancel.removeEventListener('click', contact_form.close, false);
		}
	},

	// input blur listener
	blur_listener: function() {
		const input = document.getElementsByClassName('contact-form__input');
		if(contact_form.open) {
			input[1].addEventListener('blur', function blur() {
				if(input[1].value) {
					input[1].classList.add('value');
				}
				else if(!input[1].value) {
					input[1].classList.remove('value');
				}
			}, false);
		}
		else if(!contact_form.open) {
			input[1].removeEventListener('blue', blur, false);
		}
	}
};