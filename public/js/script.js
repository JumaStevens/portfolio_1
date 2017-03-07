//WINDOW.ONLOAD
window.onload = function() {
	//screen init
	screen.resize();
	//scroll init
	scroll.event_listener();
};






//SCROLLING
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
		const article_body = document.getElementsByClassName("intro-article__body")[0];
		const article_blocker = document.getElementsByClassName("intro-article__body-blocker")[0];
		const article_line = document.getElementsByClassName("intro-article__heading-line")[0];
		const article_heading = document.getElementsByClassName("intro-article__heading-text")[0];
		const scrolldown = document.getElementsByClassName("intro-scrolldown")[0];
		
		//scroll position trigger point
		if(scroll.position < 50) {
			//set styles (with vendor prefixes)
			for(let i=0;i<scroll.vendor.length;i++) {
				//transform
				heading.style[scroll.vendor[i] + "transform"] = "translate(0, 0) scale(1)";
				home_color.style[scroll.vendor[i] + "transform"] = "translate(0, 0) scale(1)";
				article_body.style[scroll.vendor[i] + "transform"] = "translate(0, 50%) scale(1)";
				article_blocker.style[scroll.vendor[i] + "transform"] = "translate(0, 0) scale(1)";
				scrolldown.style[scroll.vendor[i] + "transform"] = "translate(-50%, 0) scale(1) rotate(-90deg)"; 
			}
			//padding
			article_line.style.padding = 0;
			//opacity
			article_heading.style.opacity = 0;
			scrolldown.style.opacity = 1;
		}
		//scroll position trigger point
		else if((scroll.position >= 50) && (scroll.position <= screen.height)) {
			//set styles (with vendor prefixes)
			for(let i=0;i<scroll.vendor.length;i++) {
				//transform
				heading.style[scroll.vendor[i] + "transform"] = "translate(100%, 0) scale(1)";
				home_color.style[scroll.vendor[i] + "transform"] = "translate(100%, 0) scale(1)";
				article_body.style[scroll.vendor[i] + "transform"] = "translate(0, 0) scale(1)";
				article_blocker.style[scroll.vendor[i] + "transform"] = "translate(0, 100%) scale(1)";
				scrolldown.style[scroll.vendor[i] + "transform"] = "translate(-50%, 100%) scale(1) rotate(-90deg)";
			}
			//padding
			article_line.style.padding = "0.05em 0.5em";
			//opacity
			article_heading.style.opacity = 1;
			scrolldown.style.opacity = 0;
		}
	},




	//parallax effect
	parallax: function() {
		//hooks
		const home = document.getElementsByClassName("page__home")[0];
		const transition = document.getElementsByClassName("page__transition")[0];
		//top positions
		const transition_top = screen.height * 1.5;
		const works_top = screen.height * 2.5;
		//scroll speed
		const speed = [0.5, 1];
		//offset formulas
		let offset_0 = (transition_top - screen.height - scroll.position);
		let offset_1 = (works_top - screen.height - scroll.position);
		

		//scroll position trigger point
		if(scroll.position < transition_top - screen.height) {
			//display
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
				home.style[scroll.vendor[i] + "transform"] = "translate3d(0,"+ offset_0 * speed[0] + "px" +",0) scale(1)";
				transition.style[scroll.vendor[i] + "transform"] = "translate3d(0,"+ ((screen.height + offset_0) * speed[1]) + "px" +",0) scale(1)";
			}
			//turn off particles
			if(particle.loop_on === true) {
				particle.loop_on = false;
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
				"translate3d(0,"+ offset_1 * speed[0] + "px" +",0) scale(1)";
			}
			//turn on particles
			if(particle.loop_on === false) {
				particle.init();
			}
		}
		//scroll position trigger point
		if(scroll.position >= works_top) {
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




//SCREEN DEMINSIONS
var screen = {
	//screen inner height
	height: 0,

	//find screen height
	getHeight: function () {
		//set height
		screen.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
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




//PARTICLES
var particle = {
	//placeholders
	container: document.getElementsByClassName("works-title-container")[0],
	canvas: false,
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
		particle.canvas = document.getElementsByClassName("works-title-container__canvas")[0];
		particle.ctx = particle.canvas.getContext("2d");
	},
	//canvas width & height
	canvas_dimensions: function() {
		//set values
		particle.canvas.width = window.innerWidth;
		particle.canvas.height = particle.container.clientHeight;
	},
	//random colors - not too dark
	get_random_color: function() {
	    var r = 0, g = 0, b = 0;

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




/*



var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = document.getElementsByClassName("works-title-container")[0].clientHeight;
var particles = [];
var num_particles = 25;//Change that to your liking

//Helper function to get a random color - but not too dark
function GetRandomColor() {
    var r = 0, g = 0, b = 0;
    while (r < 100 && g < 100 && b < 100)
    {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    }

    return "rgb(" + r + "," + g + ","  + b + ")";
}
//Particle object with random starting position, velocity and color
var Particle = function () {
    this.x = canvas.width * Math.random();
    this.y = canvas.height * Math.random();
    this.vx = 1 * Math.random() - .5;
    this.vy = 1 * Math.random() - .5;
    this.Color = GetRandomColor();
}
//Ading two methods
Particle.prototype.Draw = function (ctx) {
	ctx.beginPath();
    ctx.fillStyle = this.Color;
   	ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
   	ctx.fill();
   // ctx.fillRect(this.x, this.y, 20, 20);
}
Particle.prototype.Update = function () {
    this.x += this.vx;
    this.y += this.vy;
 
    if (this.x<0 || this.x > canvas.width)
        this.vx = -this.vx;
 
    if (this.y < 0 || this.y > canvas.height)
        this.vy = -this.vy;
}

//main loop
setInterval(function() {
//
requestAnimationFrame(loop);

}, 1000/16);
//
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(particles.length);

    for (var i = 0; i < num_particles; i++) {
        particles[i].Update();
        particles[i].Draw(ctx);
    }
    
}


//Create particles
for (var i = 0; i < num_particles; i++) {
    particles.push(new Particle());
}
loop();




*/































