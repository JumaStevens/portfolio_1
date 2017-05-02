var loader = {
	
	// set elements in preload "ready position"
	init: function() {
		const elem = [
			// home elements
			document.getElementsByClassName('home-color')[0],
			document.getElementsByClassName('home-title')[0],
			document.getElementsByClassName('title__period--drop')[0],
			document.getElementsByClassName('home-scrolldown')[0],
			document.getElementsByClassName('home-article__header-line')[0],
			document.getElementsByClassName('home-article__header-copy')[0],
			document.getElementsByClassName('home-article__content-copy')[0],
			document.getElementsByClassName('home-article__content-copy')[1],
			// header elements 
			document.getElementsByClassName('header-logo')[0],
			document.getElementsByClassName('header-menu-toggle--top')[0],
			document.getElementsByClassName('header-menu-toggle--left')[0],
			document.getElementsByClassName('header-lang-list')[0],
			document.getElementsByClassName('header-social-list')[0],
			// border elements
			document.getElementsByClassName('border__top')[0],
			document.getElementsByClassName('border__bottom')[0],
			document.getElementsByClassName('border__left')[0],
			document.getElementsByClassName('border__right')[0]
		];
		// portfolio elements
		const port_article = document.getElementsByClassName('portfolio-article');
		// menu elements
		const nav_link = document.getElementsByClassName('nav__link');
		const lang_list = document.getElementsByClassName('menu-lang-list')[0];
		const menu_button = document.getElementsByClassName('menu-button')[0];
		// contact elements
		const form = document.getElementsByClassName('contact-form')[0];
		const side = document.getElementsByClassName('contact-side')[0];
		const status = document.getElementsByClassName('contact-side__status')[0];
		// hide elements
		for(let i=0;i<elem.length;i++) {
			elem[i].classList.add('hide');
		}
		// hide portfolio article children
		for(let i=0;i<port_article.length;i++) {
			for(let j=0;j<port_article[i].children.length;j++) {
				port_article[i].children[j].classList.add('hide');
			}
		}
		// hide menu elements
		menu_button.classList.add('hide')
		for(let b=0;b<nav_link.length;b++) {
			nav_link[b].classList.add('hide');
		}
		for(let c=0;c<lang_list.children.length;c++) {
			lang_list.children[c].children[0].classList.add('hide');
		}
		// hide contact elements
		form.classList.add('hide');
		side.classList.add('hide');
		status.classList.add('hide');
	},

	// load events
	handler: function(e) {
		console.log('LOADER CALLED');
		const loader_elem = document.getElementsByClassName('loader')[0];
		const elem = [
			// home elements
			document.getElementsByClassName('home-color')[0],
			document.getElementsByClassName('home-title')[0],
			document.getElementsByClassName('title__period--drop')[0],
			document.getElementsByClassName('home-scrolldown')[0],
			// header elements
			document.getElementsByClassName('header-logo')[0],
			document.getElementsByClassName('header-menu-toggle--top')[0],
			document.getElementsByClassName('header-menu-toggle--left')[0],
			document.getElementsByClassName('header-lang-list')[0],
			document.getElementsByClassName('header-social-list')[0],
			// border elements
			document.getElementsByClassName('border__top')[0],
			document.getElementsByClassName('border__bottom')[0],
			document.getElementsByClassName('border__left')[0],
			document.getElementsByClassName('border__right')[0]
		];
		// load complete
		if(e) {
			loader_elem.classList.add('hide');
			// reveal elements
			for(let i=0;i<elem.length;i++) {
				elem[i].classList.remove('hide');
			}
		}
		// load active
		else {
			loader_elem.classList.remove('hide');
		}
	}
};

// call
loader.init();