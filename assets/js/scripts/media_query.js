var media_query = {
	tablet: 767,

	// initialize
	init: function() {
		media_query.logo();
		media_query.contact();
		media_query.composite();		
	},

	// logo
	logo: function() {
		const logo = document.getElementsByClassName('header-logo')[0];
		
		if(screen.width >= media_query.tablet) {
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
	},

	// contact
	contact: function() {
		if(contact_form.open) {
			if(screen.width < media_query.tablet) {
				contact_form.close();
			}
		}
	},

	// composite
	composite: function() {
		const composites = document.getElementsByClassName('portfolio-composite');

		if(screen.width >= media_query.tablet) {
			for(let i=0;i<composites.length;i++) {
				if(composites[i].children.length < 2) {
					composite.init();
					loader.handler();
					break;
				}
			}
		}
	}
};