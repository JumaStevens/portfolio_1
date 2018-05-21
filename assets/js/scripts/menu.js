var menu = {
	open: false,

	// initialize
	init: function() {
		menu.toggle_listener();
		menu.toggle_hover_listener();
	},

	// handle click events
	handler: function() {
		const menu_elem = document.getElementsByClassName('menu')[0];
		const menu_color = document.getElementsByClassName('menu-color')[0];
		const menu_toggle = document.getElementsByClassName('menu-toggle');
		const nav_link = document.getElementsByClassName('nav__link');
		const lang_list = document.getElementsByClassName('menu-lang-list')[0];
		const menu_button = document.getElementsByClassName('menu-button')[0];
		const border = document.getElementsByClassName('border')[0];
		const header = [
			document.getElementsByClassName('header-logo')[0],
			document.getElementsByClassName('header-lang-list')[0],
			document.getElementsByClassName('header-social-list')[0]];
		
		// toggle open/close
		menu.open = !menu.open;
		// toggle on/off nav link listeners
		menu.nav_listener();
		
		// menu is opening
		if(menu.open) {
			menu_elem.classList.add('open');
			menu_color.classList.add('open');
			menu_button.classList.remove('hide')
			for(let a=0;a<menu_toggle.length;a++) {
				menu_toggle[a].classList.add('open');
			}
			for(let b=0;b<nav_link.length;b++) {
				nav_link[b].classList.remove('hide');
			}
			for(let c=0;c<lang_list.children.length;c++) {
				lang_list.children[c].children[0].classList.remove('hide');
			}
			for(let d=0;d<border.children.length;d++) {
				border.children[d].classList.add('open');
			}
			for(let e=0;e<header.length;e++) {
				header[e].classList.add('open');
			}
			// toggle off menu-toggle hover
			menu.toggle_hover();
		}
		// menu is closing
		else if(!menu.open) {
			menu_elem.classList.remove('open');
			menu_color.classList.remove('open');
			menu_button.classList.add('hide')
			for(let a=0;a<menu_toggle.length;a++) {
				menu_toggle[a].classList.remove('open');
			}
			for(let b=0;b<nav_link.length;b++) {
				nav_link[b].classList.add('hide');
			}
			for(let c=0;c<lang_list.children.length;c++) {
				lang_list.children[c].children[0].classList.add('hide');
			}
			for(let d=0;d<border.children.length;d++) {
				border.children[d].classList.remove('open');
			}
			for(let e=0;e<header.length;e++) {
				header[e].classList.remove('open');
			}
			// toggle on menu-toggle hover
			menu.toggle_hover_listener();
		}
	},

	// handle menu-toggle hover
	toggle_hover: function(e) {
		const border_left = document.getElementsByClassName('border__left')[0];

		if(menu.open) {
			border_left.classList.remove('hover');
			menu.toggle_hover_listener();
		} 
		else if(!menu.open) {
			if(e.type === 'mouseenter') {
				border_left.classList.add('hover');
			}
			else if(e.type === 'mouseleave') {
				border_left.classList.remove('hover');
			}
		}
	},

	// nav link listener
	nav_listener: function() {
		const nav_link = document.getElementsByClassName('nav__link');
		if(menu.open) {
			for(let i=0;i<nav_link.length;i++) {
				nav_link[i].addEventListener('click', menu.handler, false);
			}
		}
		else if(!menu.open) {
			for(let i=0;i<nav_link.length;i++) {
				nav_link[i].removeEventListener('click', menu.handler, false);
			}
		}
	},

	// menu-toggle listener
	toggle_listener: function() {
		const menu_toggle = document.getElementsByClassName('menu-toggle');
		for(let i=0;i<menu_toggle.length;i++) {
			menu_toggle[i].addEventListener('click', menu.handler, false);
		}
	},

	// menu-toggle hover listener
	toggle_hover_listener: function() {
		const menu_toggle = document.getElementsByClassName('header-menu-toggle--left')[0];
		if(menu.open) {
			menu_toggle.removeEventListener('mouseenter', menu.toggle_hover, false);
			menu_toggle.removeEventListener('mouseleave', menu.toggle_hover, false);
		}
		else if(!menu.open) {
			menu_toggle.addEventListener('mouseenter', menu.toggle_hover, false);
			menu_toggle.addEventListener('mouseleave', menu.toggle_hover, false);
		}
	}
};