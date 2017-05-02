var media_query = {
	tablet: 767,

	handler: function() {
		const logo = document.getElementsByClassName('header-logo')[0];
		const button = document.getElementsByClassName('contact-button');
		const contact = document.getElementsByClassName('contact')[0];
		const form = document.getElementsByClassName('contact_form')[0];
		
		// logo
		if(screen.width >= media_query.tablet) { // 767 == +mq-tablet
			logo.classList.remove('hide');
		}
		else if(screen.width < media_query.tablet && scroll.position > screen.height*.2) { // screen.height*.2 == scroll.home's trigger
			logo.classList.add('hide');
		}
		else if(screen.width < media_query.tablet && !scroll.position) {
			let timer = setInterval(function() {
				if(screen.width < media_query.tablet && scroll.position > screen.height*.2) {
					logo.classList.add('hide');
					clearInterval(timer);
				} 
				else if((screen.width < media_query.tablet && scroll.position > 0) || (screen.width > media_query.tablet)) {
					clearInterval(timer);
				}
			}, 250);
		}

		// contact
		if(contact_form.open) {
			if(screen.width < media_query.tablet) {
				contact_form.close();
			}
		}
	}

};