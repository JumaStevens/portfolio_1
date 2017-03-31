/*======================================
WINDOW ONLOAD
======================================*/
function window_onload() {
	//screen init
	screen.resize();
	//scroll init
	scroll.event_listener();
	//menu init
	menu.event_listener();
	//add listener navbar-brand (dest: home page)
	home.navbar_brand();
	//add language listener
	lang.event_listener();
	//contact form init
	contact.event_listener("add");
	//contact info button init
	contact_info.event_listener();
	//zenscroll setup
	zenscroll_settings.offset();
	//assign img to background-image
	const nodes = [document.getElementsByClassName("page__transition-image")[0],
		document.getElementsByClassName("page__transition-image-dummy")[0]];
	nodes[0].style.backgroundImage = "url('"+nodes[1].src+"')";
	//loader
	loader.status("complete");
	//remove event listener
	window.removeEventListener("load", window_onload, false);
};
//add event listener
window.addEventListener("load", window_onload, false);
/*======================================
END OF WINDOW ONLOAD
======================================*/






/*======================================
LOADER
======================================*/
var loader = {
	//intro circle drop animation
	balldrop: false,
	//different loading phases
	status: function(stage) {
		//hook
		const body = document.getElementsByTagName("body")[0];

		//initial loading phrase
		if(stage === "initial") {
			//add class name
			body.classList.add("load-init");
			//remove class name
			body.classList.remove("load-complete");
		}
		//AJAX loading
		if(stage === "loading") {
			//remove class name
			body.classList.remove("load-complete");
			//add class name
			body.classList.add("load-loading");
		}
		//loading complete
		if(stage === "complete") {
			//remove class name
			body.classList.remove("load-init");
			body.classList.remove("load-loading");
			//add class name
			body.classList.add("load-complete");
			//limit intro ball drop to once
			if(!loader.balldrop) {
				loader.balldrop = true;
				//triggers animation
				body.classList.add("balldrop");
			}
		}
	}
};
//initiate loader
loader.status("initial");
/*======================================
END OF LOADER
======================================*/






/*======================================
MENU
======================================*/
var menu = {
	//hook
	icon: document.getElementsByClassName("navbar-toggle")[0],
	lines: document.getElementsByClassName("navbar-toggle__line-container")[0],
	text: document.getElementsByClassName("navbar-toggle__text-container")[0],
	//vendor prefixes
	vendor: ["-webkit-", "-moz-", "-ms-", "-o-", ""],
	//menu toggle
	active: false,

	//menu toggle
	toggle: function(e) {
		//hook
		const body = document.getElementsByTagName("body")[0];
		const line = menu.lines.childNodes;
		const links = document.getElementsByClassName("menu-nav__item-child");
		//open menu
		if(!menu.active) {
			//toggle
			menu.active = true;
			//add class name
			body.classList.add("menu-open");
			//add event listeners to links
			for(let i=0;i<links.length;i++) {
				links[i].addEventListener("click", menu.toggle, false);
			}
		}
		//close menu
		else if(menu.active) {
			//toggle
			menu.active = false;
			//remove class name
			body.classList.remove("menu-open");
			body.classList.remove("menu--hover");
			//remove event listeners to links
			for(let i=0;i<links.length;i++) {
				links[i].removeEventListener("click", menu.toggle, false);
			}
		}
		if( !(e == undefined) ) {
			//handle home page request
			if(e.target.innerHTML === "Home") {
				home.handler("Home");
			}
			//request about page (AJAX)
			else if(e.target.innerHTML === "About") {
				const about_page = document.getElementsByClassName("page-about")[0] || false;
				//enable scrolling when on About page
				e.target.offsetParent.setAttribute("href", "#");

				if(about_page) {
					if( !(about_page.style.display == "block") ) {
						about.ajax();
						//disable scrolling when on Home page
						e.target.offsetParent.removeAttribute("href");
					}
				}
				else {
					about.ajax();
					e.target.offsetParent.removeAttribute("href");
				}
			}
			//
			else if( (e.target.innerHTML === "Works") || (e.target.innerHTML === "Contact") ) {
				home.handler(e.target.innerHTML);
			}
		}
	},
	//menu hover
	hover: function(mouse) {
		//hook
		const body = document.getElementsByTagName("body")[0];
		//check which mouse event triggered
		if(mouse.type === "mouseenter") {
			//add class name
			body.classList.add("menu--hover");
		}
		else if(mouse.type === "mouseleave") {
			//remove class name
			body.classList.remove("menu--hover");
		}
	},
	//add event listener
	event_listener: function() {
			menu.icon.addEventListener("click", menu.toggle, false);
			menu.icon.addEventListener("mouseenter", menu.hover, false);
			menu.icon.addEventListener("mouseleave", menu.hover, false);
	}
};
/*======================================
END OF MENU
======================================*/







/*======================================
LANGUAGE
======================================*/
var lang = {

	//assign language
	handler: function(e) {
		const body = document.getElementsByTagName("body")[0];
		let target = e.target.innerHTML;
		
		if(target === "en." && body.classList.contains("french")) {
			loader.status("loading");
			setTimeout(function() {
				body.classList.remove("french");
				body.classList.add("english");
				loader.status("complete");
			}, 1000);
		}
		else if(target === "fr." && body.classList.contains("english")) {
			loader.status("loading");
			setTimeout(function() {
				body.classList.remove("english");
				body.classList.add("french");
				loader.status("complete");
			}, 1000);
		}
	},

	//add event listeners to lang anchors
	event_listener: function() {
		const button = [document.getElementsByClassName("navbar-land__english-link")[0],
						document.getElementsByClassName("navbar-lang__french-link")[0],
						document.getElementsByClassName("menu-lang__english-link")[0],
						document.getElementsByClassName("menu-lang__french-link")[0]];

		for(let i=0;i<button.length;i++) {
			button[i].addEventListener('click', lang.handler, false);
		}
	}
};
/*======================================
END OF LANGUAGE
======================================*/









/*======================================
HOME
======================================*/
var home = {
	//handle navigation requests
	handler: function(target) {
		const home = document.getElementsByClassName("page")[0];
		const about = document.getElementsByClassName("page-about")[0] || false;
		const error = document.getElementsByClassName("error")[0];
		const works = document.getElementsByClassName("page__works")[0];
		const contact = document.getElementsByClassName("page__contact")[0];

		//is home page active?
		if(home.style.display == "none") {
			loader.status("loading");
			//loader.status("loading");
			setTimeout(function() {
				home.style.display = "block";
				about.style.display = "none";
				error.style.display = "none";
				scroll_arrows.handler("show");
				zenscroll.to(home);
				loader.status("complete");
				//scroll to sections
				if(target === "Works") {
					zenscroll.to(works);
				}
				else if (target === "Contact") {
					zenscroll.to(contact);
				}
			}, 1000);
		}
		else {
			//handle scroll when on Home page
			if(target === "Home") {
				zenscroll.to(home);
			} else if(target === "Works") {
				zenscroll.to(works);
			} else if(target === "Contact") {
				zenscroll.to(contact);
			}
		}
	},
	//add listener to navbar-brand name (destination: home page)
	navbar_brand: function() {
		const navbar = document.getElementsByClassName("navbar-brand")[0];
		//add listener
		navbar.addEventListener("click", function() {
			home.handler("Home");
			if(menu.active) {
				menu.toggle();
			}
		}, false);
	}
};
/*======================================
END OF HOME
======================================*/








/*======================================
ABOUT
======================================*/
var about = {
	//about page content
	content: false,

	//retrieve about page
	ajax: function(e) {
		//reveal loader
		loader.status("loading");

		//has content already been loaded?
		if(about.content == "") {
			var xhr = new XMLHttpRequest();
	    	xhr.open("GET", "http://localhost:8080/about" /*"http://juma-stevens-portfolio.herokuapp.com/about"*/, true);
	    	xhr.setRequestHeader('Content-Type', 'text/HTML');
	    	xhr.timeout = 15000;
	    	xhr.send();
	    	let start_time = new Date().getTime();
	    	//AJAX status
	    	xhr.onload = function() {
	    		//success
				if(xhr.readyState === 4 && xhr.status === 200) {
					let response = xhr.responseText;
					let parser = new DOMParser();
					let html = parser.parseFromString(response, "text/html");
					about.content = html.getElementsByClassName("page-about")[0];
					const page_container = document.getElementsByClassName("page-container")[0];
					page_container.appendChild(about.content);
					about.handler("loading", false, start_time);
				} 
			    //error
			    else {
				    about.handler("error", xhr.status, start_time);
			    }
			};
	    	//handle timeout
			xhr.ontimeout = function() {
	       		xhr.abort();
	       		about.handler("error", "Connection Timeout", start_time);
	    	};
	    }
	    //content already loaded
	    else {
	    	about.handler("loaded");
	    }
	},



	//append response
	handler: function(status, msg, start_time) {
		const home = document.getElementsByClassName("page")[0];
		const about = document.getElementsByClassName("page-about")[0] || false;
		const img = document.getElementsByClassName("about__image")[0] || false;
		const error = document.getElementsByClassName("error")[0];
		const error_msg = document.getElementsByClassName("error__message")[0];

		if(status === "loading") {
			img.onload = function() {
				//minimum of nth time to elapse
				let time_elapse = new Date().getTime() - start_time;
				setTimeout(function() {
					home.style.display = "none";
					about.style.display = "block";
					scroll_arrows.handler("hide");
					zenscroll.to(about);
					loader.status("complete");
				}, 1000-time_elapse);
			}
		}
		else if(status === "loaded") {
			setTimeout(function() {
				home.style.display = "none";
				about.style.display = "block";
				scroll_arrows.handler("hide");
				zenscroll.to(about);
				loader.status("complete");
			}, 1000);
		}
		else if(status === "error") {
			//minimum of nth time to elapse
			let time_elapse = new Date().getTime() - start_time;
			setTimeout(function() {
				home.style.display = "none";
				error.style.display = "flex";
				error_msg.innerHTML = "ERROR: "+msg+".";
				loader.status("complete");
				//delays
				setTimeout(function() {
					loader.status("loading");
				}, 3000);
				setTimeout(function() {
					home.style.display = "block";
					error.style.display = "none";
					loader.status("complete");
				}, 4000);
			}, 1000-time_elapse);
		}
	}
};
/*======================================
END OF ABOUT
======================================*/













/*======================================
SCREEN DEMINSIONS
======================================*/
var screen = {
	//screen inner height & width
	height: 0,
	width: 0,
	//total height of body
	total_height: 0,
	//find screen height
	getHeight: function () {
		//set height
		screen.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		//set width
		screen.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		//set total height
		screen.total_height = document.getElementsByTagName("body")[0].clientHeight;
	},

	//screen resize handler (debounced)
	resize: function () {
		let timeout = false; // holder for timeout id
	    const delay = 250; // delay after event is "complete" to call function

		// window.resize event listener
		window.addEventListener('resize', function() {
			// clear the timeout
			clearTimeout(timeout);
			//turn off particles
			particle.loop_on = false;
			// start timing for event "completion"
			timeout = setTimeout(function() {
				//calls
				screen.getHeight();
				scroll.parallax();
				particle.init();
				zenscroll_settings.offset();
			}, delay);
		});
		//call function
		screen.getHeight();
	}




/*	throttle
	//screen resize handler
	resize: function () {
		const delay = 250; //delay between calls
	    let throttled = false; //are we currently throttled?

		//window.resize event listener
		window.addEventListener('resize', function() {
		    //only run if we're not throttled
			if (!throttled) {
		    	//actual callback action
		    	screen.getHeight();
		    	//we're throttled!
		    	throttled = true;
		    	//set a timeout to un-throttle
		    	console.log(screen.height);
		    	setTimeout(function() {
		    		throttled = false;
		    	}, delay);
			}	  
		}, false);
		//call function
		screen.getHeight();
		console.log(screen.height);
	}
*/

};
/*======================================
END OF SCREEN DEMINSIONS
======================================*/





/*======================================
SCROLLING BEHAVIOR
======================================*/
var scroll = {
	//scroller position (Top)
	position: 0,
	//vendor prefixes
	vendor: ["-webkit-", "-moz-", "-ms-", "-o-", ""],
	//intro throttle
	ticking: false,


	//intro action
	intro: function() {
		//hooks
		const heading = document.getElementsByClassName("intro-heading")[0];
		const home_color = document.getElementsByClassName("page__home-color")[0];
		const article_body = document.getElementsByClassName("intro-article__body-text");
		const article_line = document.getElementsByClassName("intro-article__heading-line")[0];
		const article_heading = document.getElementsByClassName("intro-article__heading-text")[0];
		const scrolldown = document.getElementsByClassName("intro-scrolldown")[0];
		const nav_scrolldown = document.getElementsByClassName("navbar-scrolldown")[0];
		const nav_scrolltop = document.getElementsByClassName("navbar-scrolltop")[0];

		//scroll position trigger point
		if(scroll.position < 50) {
			//set styles (with vendor prefixes)
			for(let i=0;i<scroll.vendor.length;i++) {
				//transform
				heading.style[scroll.vendor[i] + "transform"] = "translate(0, 0) scale(1)";
				home_color.style[scroll.vendor[i] + "transform"] = "translate(0, 0) scale(1)";
				article_body[0].style[scroll.vendor[i] + "transform"] = "translateY(200px)";
				article_body[1].style[scroll.vendor[i] + "transform"] = "translateY(200px)";
				scrolldown.style[scroll.vendor[i] + "transform"] = "translate(-50%, 0) scale(1) rotate(-90deg)"; 
			}
			//padding
			article_line.style.padding = 0;
			//opacity
			article_heading.style.opacity = 0;
			article_body[0].style.opacity = 0;
			article_body[1].style.opacity = 0;
			scrolldown.style.opacity = 1;
			//bottom
			nav_scrolldown.style.bottom = -100 + "px";
		}
		//scroll position trigger point
		else if((scroll.position >= 50) && (scroll.position <= screen.height)) {
			//set styles (with vendor prefixes)
			for(let i=0;i<scroll.vendor.length;i++) {
				//transform
				heading.style[scroll.vendor[i] + "transform"] = "translate(100%, 0) scale(1)";
				home_color.style[scroll.vendor[i] + "transform"] = "translate(100%, 0) scale(1)";
				article_body[0].style[scroll.vendor[i] + "transform"] = "translateY(0)";
				article_body[1].style[scroll.vendor[i] + "transform"] = "translateY(0)";
				scrolldown.style[scroll.vendor[i] + "transform"] = "translate(-50%, 100%) scale(1) rotate(-90deg)";
			}
			//padding
			article_line.style.padding = "1px 10px";
			//opacity
			article_heading.style.opacity = 1;
			article_body[0].style.opacity = 1;
			article_body[1].style.opacity = 1;
			scrolldown.style.opacity = 0;
			//bottom
			nav_scrolldown.style.bottom = 0 + "px";
			nav_scrolltop.style.bottom = -100 + "px";
		}
		//scroll position trigger point
		if(scroll.position > (screen.height*1.5 - screen.height)) {
			//bottom
			nav_scrolldown.style.bottom = 0 + "px";
			nav_scrolltop.style.bottom = 40 + "px";
		}
	},


	//trigger contact title (..typing) animation
	contact: function() {
		//hook
		const contact = document.getElementsByClassName("contact__title-container")[0];
		//is class name active?
		if(!contact.classList.contains("contact__title-trigger")) {
			//contact title container bottom position
			let contact_bottom = contact.getBoundingClientRect().bottom;
			//trigger when contact bottom is in view
			if(contact_bottom < screen.height) {
				//add class name
				contact.classList.add("contact__title-trigger");
			}
		}
	},


	//handler scrolldown fade away
	scrolldown_fade: function() {
		const scrolldown = document.getElementsByClassName("navbar-scrolldown")[0];
		if(scroll.position + screen.height < screen.total_height-40) {
			scrolldown.style.opacity = 1;
		}
		else {
			scrolldown.style.opacity = 0;
		}
	},


	//parallax effect
	parallax: function() {
		//hooks
		const body = document.getElementsByTagName("body")[0];
		const home = document.getElementsByClassName("page__home")[0];
		const transition = document.getElementsByClassName("page__transition")[0];
		const works_img_container = document.getElementsByClassName("works-example__image-container");
		const works_img = document.getElementsByClassName("works-example__image");
		//positions
		const transition_top = screen.height * 1.5;
		const works_top = screen.height * 2.5;
		let works_img_container_middle = [(works_img_container[0].getBoundingClientRect().top + works_img_container[0].clientHeight/2),
			(works_img_container[2].getBoundingClientRect().top + works_img_container[2].clientHeight/2)];
		//scroll speed
		const speed = [0.5, 1];
		//offset formulas
		let offset_0 = (transition_top - screen.height - scroll.position);
		let offset_1 = (works_top - screen.height - scroll.position);
		let works_img_offset_0 = ((works_img_container_middle[0] * 100 / screen.height) -100) *
			((works_img[0].clientHeight - works_img_container[0].clientHeight) /100);
		let works_img_offset_1 = ((works_img_container_middle[1] * 100 / screen.height) -100) *
			((works_img[2].clientHeight - works_img_container[2].clientHeight) /100);
		

		//scroll position trigger point
		if(scroll.position < transition_top - screen.height) {
			//display
			home.style.display = "flex";
			transition.style.display = "none";	
			//set styles (with vendor prefixes)
			for(let i=0;i<scroll.vendor.length;i++) {
				//transform
				home.style[scroll.vendor[i] + "transform"] = "translate3d(0,"+ 0 + "px" +",0) scale(1)";
				transition.style[scroll.vendor[i] + "transform"] = "translate3d(0,"+ screen.height + "px" +",0) scale(1)";	
			}
		}
		//scroll position trigger point
		else if((scroll.position >= transition_top - screen.height) && (scroll.position < transition_top)) {
			//display
			home.style.display = "flex";
			transition.style.display = "initial";
			//set styles (with vendor prefixes)
			for(let i=0;i<scroll.vendor.length;i++) {
				//transform
				home.style[scroll.vendor[i] + "transform"] = "translate3d(0,"+ Math.round(offset_0 * speed[0]) + "px" +",0) scale(1)";
				transition.style[scroll.vendor[i] + "transform"] = "translate3d(0,"+ Math.round(((screen.height + offset_0) * speed[1])) + "px" +",0) scale(1)";
			}
			//turn off particles
			if(particle.loop_on === true) {
				particle.loop_on = false;
			}
			//limits intro ball drop to once
			if(loader.balldrop) {
				body.classList.remove("balldrop");
				body.classList.add("balldropped");
			}
		}
		//scroll position trigger point
		else if((scroll.position >= transition_top) && (scroll.position < works_top)) {
			//display
			home.style.display = "none";
			transition.style.display = "initial";
			//set styles (with vendor prefixes)
			for(let i=0;i<scroll.vendor.length;i++) {
				//transform
				transition.style[scroll.vendor[i] + "transform"] = 
				"translate3d(0,"+ Math.round(offset_1 * speed[0]) + "px" +",0) scale(1)";
			}
			//turn on particles
			if(particle.loop_on === false) {
				particle.init();
			}
		}
		//scroll position trigger point
		if( (scroll.position >= works_top) && (scroll.position < (works_top + particle.canvas.height)) ) {
			//display
			transition.style.display = "none";
			//turn on particles
			if(particle.loop_on === false) {
				particle.init();
			}
		}
		//scroll position trigger point
		if(scroll.position > (works_top + particle.canvas.height)) {
			//turn off particles
			if(particle.loop_on === true) {
				particle.loop_on = false;
			}
		}
		//trigger point (turn work example 0)
		if((works_img_container_middle[0] > 0)
		&& (works_img_container_middle[0] < screen.height)) {
			//set styles (with vendor prefixes)
			for(let i=0;i<scroll.vendor.length;i++) {
				//transform
				works_img[0].style[scroll.vendor[i] + "transform"] = "translate3d(0, "+ Math.round(works_img_offset_0) + "px, 0)";
			}
		}
		//trigger point (turn work example 1)
		if((works_img_container_middle[1] > 0)
		&& (works_img_container_middle[1] < screen.height)) {
			//set styles (with vendor prefixes)
			for(let i=0;i<scroll.vendor.length;i++) {
				//transform
				works_img[2].style[scroll.vendor[i] + "transform"] = "translate3d(0, "+ Math.round(works_img_offset_1) + "px, 0)";
			}
		}
		//call contact when last image is in view
		if(works_img_container_middle[1] < screen.height) {
			scroll.contact();
			scroll.scrolldown_fade();
		}

	},


	//event listener
	event_listener: function() {
		//window.scroll event listener
		window.addEventListener("scroll", function(e) {
			
			//throttle
			if (!scroll.ticking) {
			    window.requestAnimationFrame(function() {
			    	//set scroll position
					scroll.position = window.pageYOffset || document.documentElement.scrollTop;
			    	//calls
			   		scroll.intro();
			   		scroll.parallax();
			    	//throttle ticker
			    	scroll.ticking = false;
				});
			}
				//throttle ticker
				scroll.ticking = true;
		}, false);
	}
};
/*======================================
END OF SCROLLING BEHAVIOR
======================================*/










/*======================================
SCROLL ARROWS
======================================*/
//hide arrows when on about page 
var scroll_arrows = {
	handler: function(show_hide) {
		const arrow =
			[document.getElementsByClassName("intro-scrolldown")[0],
			document.getElementsByClassName("navbar-scrolldown")[0],
			document.getElementsByClassName("navbar-scrolltop")[0]];

		if(screen.width > 767) {
			if(show_hide === "show") {
				for(let i=0;i<arrow.length;i++) {
					arrow[i].style.display = "flex";
				}
			}
			else if(show_hide === "hide") {
				for(let i=0;i<arrow.length;i++) {
					arrow[i].style.display = "none";
				}
			}
		}
	}
};
/*======================================
END OF SCROLL ARROWS
======================================*/













/*======================================
PARTICAL SIMULATOR
======================================*/
var particle = {
	//placeholders
	container: document.getElementsByClassName("works-title-container")[0],
	canvas: document.getElementsByClassName("works-title-container__canvas")[0],
	ctx: false,
	//particle values
	num_particles: 50, //number of particles
	particles: [],
	x: [],
	y: [],
	vx: [],
	vy: [],
	color: [],
	size: [],
	//loop on or off
	loop_on: false,


	//initialize (triggered by scroll events & screen resize)
	init: function() {
		//turn loop on
		particle.loop_on = true;
		particle.create_canvas();
		particle.canvas_dimensions();
		particle.emitter();
		particle.loop();
	},
	//create canvas
	create_canvas: function() {
		//
		particle.ctx = particle.canvas.getContext("2d");
	},
	//canvas width & height
	canvas_dimensions: function() {
		//set values
		particle.canvas.width = particle.container.clientWidth;
		particle.canvas.height = particle.container.clientHeight;
	},
	//random colors - not too dark
	get_random_color: function() {
	    let r = 0, g = 0, b = 0;

	    while (r < 100 && g < 100 && b < 100) {
	        r = Math.floor(Math.random() * 256);
	        g = Math.floor(Math.random() * 256);
	        b = Math.floor(Math.random() * 256);
	    }
	    return "rgb(" + r + "," + g + ","  + b + ")";
	},
	//random starting position, velocity, color and size
	emitter: function() {
		for(let i=0;i<particle.num_particles;i++) {
		    particle.x[i] = particle.canvas.width * Math.random();
		    particle.y[i] = particle.canvas.height * Math.random();
		    particle.vx[i] = 1 * Math.random() - .5;
		    particle.vy[i] = 1 * Math.random() - .5;
		    particle.color[i] = particle.get_random_color();
		    particle.size[i] = Math.floor(Math.random() * ((20-2)+1) + 2);
		}
	},
	//draw particle onto the canvas
	draw: function(ctx, i) {
		ctx.beginPath();
    	ctx.fillStyle = particle.color[i];
   		ctx.arc(particle.x[i], particle.y[i], particle.size[i], 0, 2 * Math.PI, false);
   		ctx.fill();
	},
	//update particle position
	update: function(i) {
    	particle.x[i] += particle.vx[i];
    	particle.y[i] += particle.vy[i];
 		//keep in bound
	    if (particle.x[i] <0 || particle.x[i] > particle.canvas.width) {
       		particle.vx[i] = -particle.vx[i];
	    }
   		if (particle.y[i] < 0 || particle.y[i] > particle.canvas.height) {
        	particle.vy[i] = -particle.vy[i];
   		}
	},
	//main loop
	loop: function(value) {
		//framerate
		const fps = 1000/16;
		//limiter
		setTimeout(function() {
			//loop
			requestAnimationFrame(function() {
				//clear canvas
				particle.ctx.clearRect(0, 0, particle.canvas.width, particle.canvas.height);
				//recall loop?
	  			if(particle.loop_on === true) {
					//update & draw particles
					for (let i=0;i<particle.num_particles;i++) {
	       				particle.update(i);
	        			particle.draw(particle.ctx, i);
	  				}
	  				//recall loop
	  				particle.loop();
	  			}
			});
		}, fps);
	}
};
/*======================================
END OF PARTICAL SIMULATOR
======================================*/










/*======================================
CONTACT FORM
======================================*/
var contact = {
	form: document.getElementsByClassName("contact__form")[0],

	//form submission
	submit: function(e) {
		//form
		let form = e.target;
    	//collect form data
    	let data = {
    		"name": form.name.value,
    		"email": form.email.value,
    		"message": form.message.value,
    		"company": form.company.value //spam field
    	};
    	//honeypot (spam bots)
    	if(data.company) {
    		//spam
    		contact.response("error", "spam detection");
    	} else {
    		//real person
    		ajax();
    		contact.response("sending");
    	}
    	//AJAX
    	function ajax() {
	    	var xhr = new XMLHttpRequest();
	    	xhr.open(form.method, form.action);
	    	xhr.setRequestHeader('Content-Type', 'application/json');
	    	xhr.timeout = 15000;
	    	xhr.send(JSON.stringify(data));
	    	//AJAX status
	    	xhr.onreadystatechange = function() {
				if(xhr.readyState === 4) {
					//success
				    if(xhr.status === 200) {
				    	if(JSON.parse(xhr.response).msg === "success") {
				    		contact.response("success");
				    	} else {
				    		contact.response("error", JSON.parse(xhr.response).msg);
				    	}
				    } 
				    //error
				    else {
				    	contact.response("error", xhr.status);
				    	console.log("xhr error: " + xhr.status)
				    }
				}
	       	};
	       	//handle timeout
	       	xhr.ontimeout = function() {
	       		xhr.abort();
	       		contact.response("error", "Network timeout");
	       	};
	    };
       	//stop url change
		e.preventDefault();
    	//remove listener
		contact.event_listener("remove");
		//prevent user from submitting form with 'enter' while already submitting
		const button = document.getElementsByClassName("contact__form-button")[0];
		button.type = "";
	},


	//submit response
	response: function(type, msg) {
		const res = document.getElementsByClassName("contact__form-container")[0];
		const form = contact.form;
		const text = document.getElementsByClassName("contact__response-text")[0];
		const button = document.getElementsByClassName("contact__form-button")[0];

		//handle response requests
		if(type === "sending") {
			//remove class
			res.classList.remove("success");
			res.classList.remove("contact-error");
			//add class
			res.classList.add("waiting");
			//hide form
			form.style.visibility = "hidden";
		}
		else if(type === "success") {
			//remove class
			res.classList.remove("waiting");
			res.classList.remove("contact-error");
			//add class
			res.classList.add("success");
			//response text
			text.innerHTML = "Message sent! Expect a response within 24hrs.";
			//clear input values
			contact.form.name.value = "";
			contact.form.email.value = "";
			contact.form.message.value = "";
 			//remove class after delay
			setTimeout(function(){ 
				res.classList.remove("success");
				//add listener
				contact.event_listener("add");
				//return type value
				button.type = "submit";
				//show form
				form.style.visibility = "initial";
			}, 6000);
		}
		else if(type === "error") {
			//remove class
			res.classList.remove("waiting");
			res.classList.remove("success");
			//add class
			res.classList.add("contact-error");
			//hide form
			form.style.visibility = "hidden";
			//output error message
			text.innerHTML = "Something went wrong! (ERR: "+msg+"). Message failure!";
			//remove class after delay
			setTimeout(function(){
				res.classList.remove("contact-error");
				//add listener
				contact.event_listener("add");
				//return type value
				button.type = "submit";
				//show form
				form.style.visibility = "initial";
			}, 6000);
		}
	},


	//add listener
	event_listener: function(add_remove) {
		if(add_remove === "add") {
			contact.form.addEventListener("submit", contact.submit, false);
		} else if(add_remove === "remove") {
			contact.form.removeEventListener("submit", contact.submit, false);
		}
	}
};
/*======================================
END OF CONTACT FORM
======================================*/  









/*======================================
CONTACT INFO
======================================*/ 
var contact_info = {

	//add listener to button (about ajax call)
	event_listener: function() {
		const button = document.getElementsByClassName("contact__about-button")[0];
		button.addEventListener("click", about.ajax, false);
	}
};
/*======================================
END OF CONTACT INFO
======================================*/ 




/*======================================
ZENSCROLL SETTINGS
======================================*/
var zenscroll_settings = {

	//change edgeOffset value
	offset: function() {
		if(screen.width <= 767) {
			zenscroll.setup(null, -1);
		}
		else if(screen.width > 767) {
			zenscroll.setup(null, 39);
		}
	}
};
/*======================================
END OF ZENSCROLL SETTINGS
======================================*/


