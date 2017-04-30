// window onload
window.addEventListener('load', function load() {
	//screen init
	//screen.resize();
	//scroll init
	//scroll.event_listener();
	//menu init
	//menu.event_listener();
	//add listener navbar-brand (dest: home page)
	//home.navbar_brand();
	//add language listener
	//lang.event_listener();
	//contact form init
	//contact.event_listener("add");
	//contact info button init
	//contact_info.event_listener();
	//zenscroll setup
	//zenscroll_settings.offset();
	//assign img to background-image
	/*const nodes = [document.getElementsByClassName("page__transition-image")[0],
		document.getElementsByClassName("page__transition-image-dummy")[0]];
	nodes[0].style.backgroundImage = "url('"+nodes[1].src+"')"; */

	// screen
	screen.init();
	// scroll
	scroll.init();
	// loader
	loader.handler(true);
	// menu
	menu.init();
	// contact-form
	contact_form.button_listener();

	// remove listener
	window.removeEventListener('load', load, false);
}, false);