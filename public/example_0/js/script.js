//ONLOAD
window.onload = function() {
	//initiate navigation
	nav.addListener();
	//draw canvas icons
	icons.draw();
	//initiate work events
	works.addListener();
	//initiate talents events
	talents.addListener();
	//handle button clicks
	popup.addListener();
};

//NAVIGATION
var nav = {
	//hook
	navigation: document.getElementsByTagName("header")[0].getElementsByTagName("ul")[0],
	hamburger_icon: document.getElementById("hamburger-icon"),
	sections: document.getElementsByTagName("section"),
	//toggle
	toggle: false,

	//add event listener
	addListener: function() {
		//hook
		const nav_icon = nav.hamburger_icon;
		//add listener
		nav_icon.addEventListener("click", nav.action, false);
		//initiate icon
		nav.hamburger();
		//add listeners to li(s)
		const x = nav.navigation.childNodes;
		for(let i=1;i<x.length;i+=2) {
			x[i].addEventListener("click", nav.li, false);
		}
	},

	//draw hamburger icon
	hamburger: function() {
		//hook
		const canvas = nav.hamburger_icon.getElementsByTagName("canvas");
		//draw
		for(let i=0;i<canvas.length;i++) {
			const ctx = canvas[i].getContext("2d");
			ctx.beginPath();
			ctx.moveTo(8,0);
			ctx.lineTo(32,0);
			ctx.lineWidth = 4;
			ctx.strokeStyle = "rgba(255,255,255,1)";
			ctx.stroke();
		}
	},

	//click actions
	action: function() {
		//shorthand
		const navigation = nav.navigation;
		const canvas = nav.hamburger_icon.getElementsByTagName("canvas");
		const toggle = nav.toggle;
		const section = nav.sections;
		//adjustment value
		let n = 0;

		//open nav
		if(!toggle) {
			//toggle
			nav.toggle = true;
			//expand navigation
			navigation.style.opacity = 1;
			navigation.style.visibility = "visible";
			//adjust hamburger
			if(screen.width < 1024) {
				n = 5;
			}
			if(screen.width >= 1024) {
				n = 10;
			}
			canvas[0].style.transform = "rotate(225deg)";
			canvas[0].style.marginTop = n + "px";
			canvas[1].style.opacity = 0;
			canvas[2].style.transform = "rotate(-225deg)";
			canvas[2].style.marginTop = -n + "px";
			//sections off
			setTimeout(function() { 
				for(let i=0;i<section.length;i++) {
					section[i].style.display = "none";
				}
			}, 250/*transition-duration*/);
		}
		//close nav
		else if(toggle) {
			//toggle
			nav.toggle = false;
			//collaspe navigation
			navigation.style.opacity = 0;
			navigation.style.visibility = "hidden";
			//adjust hamburger
			canvas[0].style.transform = "rotate(0deg)";
			canvas[0].style.marginTop = 0 + "px";
			canvas[1].style.opacity = 1;
			canvas[2].style.transform = "rotate(0deg)";
			canvas[2].style.marginTop = 0 + "px";
			//sections on
			for(let i=0;i<section.length;i++) {
				section[i].style.display = "flex";
			}
		}
	},

	//list items handler
	li: function(value) {
		//close nav when li is clicked
		nav.toggle = true;
		nav.action();
	}
};


//ICONS
var icons = {
	//global settings
	line_width: 2,
	stroke_style: "rgba(34, 34, 34, 1)",
	stroke_style_1: "rgba(255,255,255,1)",

	//draw icons
	draw: function() {
		icons.mouse();
		icons.gear();
		icons.plane();
		icons.computer();
		icons.printer();
		icons.paint_brush();
		icons.camera();
		icons.paper();
	},

	//home mouse icon
	mouse: function() {
		//hook
		const canvas = document.getElementById("mouse-icon").getElementsByTagName("canvas");
		//draw
		const ctx_0 = canvas[0].getContext("2d");
		ctx_0.beginPath();
		ctx_0.moveTo(20,2);
		ctx_0.quadraticCurveTo(5,5,5,15);
		ctx_0.lineTo(5,25);
		ctx_0.quadraticCurveTo(5,35,20,38);
		ctx_0.quadraticCurveTo(35,35,35,25);
		ctx_0.lineTo(35,15);
		ctx_0.quadraticCurveTo(35,5,20,2);
		ctx_0.lineWidth = 3;
		ctx_0.strokeStyle = "rgba(255, 255, 255, 1)";
		ctx_0.stroke();
		//draw
		const ctx_1 = canvas[1].getContext("2d");
		ctx_1.beginPath();
		ctx_1.moveTo(20,2);
		ctx_1.quadraticCurveTo(5,5,5,15);
		ctx_1.lineTo(5,25);
		ctx_1.quadraticCurveTo(5,35,20,38);
		ctx_1.quadraticCurveTo(35,35,35,25);
		ctx_1.lineTo(35,15);
		ctx_1.quadraticCurveTo(35,5,20,2);
		ctx_1.lineWidth = 10;
		ctx_1.strokeStyle = "rgba(255, 255, 255, 1)";
		ctx_1.stroke();
	},

	//about gear icon
	gear: function() {
		//hook
		const canvas = document.getElementById("gear-icon").getElementsByTagName("canvas");
		//draw
		const ctx_0 = canvas[0].getContext("2d");
		ctx_0.beginPath();
		ctx_0.arc(20,20,5,0,2*Math.PI);
		ctx_0.lineWidth = icons.line_width;
		ctx_0.strokeStyle = icons.stroke_style;
		ctx_0.stroke();
		//draw
		for(let i=1;i<canvas.length;i++) {
			const ctx = canvas[i].getContext("2d");
			ctx.beginPath();
			ctx.moveTo(15,10);
			ctx.bezierCurveTo(20,10,14,2,20,2);
			ctx.bezierCurveTo(26,2,20,10,25,10);
			ctx.lineWidth = icons.line_width;
			ctx.strokeStyle = icons.stroke_style;
			ctx.stroke();
		}
	},

	//about plane icon
	plane: function() {
		//hook
		const canvas = document.getElementById("plane-icon").getElementsByTagName("canvas");
		//draw
		const ctx = canvas[0].getContext("2d");
		ctx.beginPath();
		ctx.moveTo(17,6);
		ctx.bezierCurveTo(17,0,23,0,23,6);
		ctx.lineTo(23,12);
		ctx.lineTo(38,20);
		ctx.lineTo(38,25);
		ctx.lineTo(23,23);
		ctx.lineTo(23,30);
		ctx.lineTo(32,34);
		ctx.lineTo(32,38);
		ctx.lineTo(20,35);
		ctx.lineTo(8,38);
		ctx.lineTo(8,34);
		ctx.lineTo(17,30);
		ctx.lineTo(17,23);
		ctx.lineTo(2,25);
		ctx.lineTo(2,20);
		ctx.lineTo(17,12);
		ctx.lineTo(17,6);
		ctx.lineWidth = icons.line_width;
		ctx.strokeStyle = icons.stroke_style;
		ctx.stroke();
	},

	//about computer icon
	computer: function() {
		//hook
		const canvas = document.getElementById("computer-icon").getElementsByTagName("canvas");
		//draw
		for(let i=0;i<2;i++) {
			const ctx = canvas[i].getContext("2d");
			ctx.beginPath();
			ctx.moveTo(2,7);
			ctx.quadraticCurveTo(2,2,7,2);
			ctx.lineTo(33,2);
			ctx.quadraticCurveTo(38,2,38,7);
			ctx.lineTo(38,23);
			ctx.quadraticCurveTo(38,28,33,28);
			ctx.lineTo(7,28);
			ctx.quadraticCurveTo(2,28,2,23);
			ctx.lineTo(2,7);
			ctx.lineWidth = icons.line_width;
			ctx.strokeStyle = icons.stroke_style;
			ctx.stroke();
		}
		//draw
		const ctx_2 = canvas[2].getContext("2d");
		ctx_2.beginPath();
		ctx_2.moveTo(14,28);
		ctx_2.quadraticCurveTo(14,32,8,32);
		ctx_2.quadraticCurveTo(4,35,8,38);
		ctx_2.lineTo(32,38);
		ctx_2.quadraticCurveTo(36,35,32,32);
		ctx_2.quadraticCurveTo(26,32,26,28);
		ctx_2.lineWidth = icons.line_width;
		ctx_2.strokeStyle = icons.stroke_style;
		ctx_2.stroke();
	},

	//offers printer icon
	printer: function() {
		//hook
		const canvas = document.getElementById("printer-icon").getElementsByTagName("canvas");
		//draw
		for(let i=0;i<3;i++) {
			const ctx = canvas[i].getContext("2d");
			ctx.beginPath();
			ctx.moveTo(2,7);
			ctx.quadraticCurveTo(2,2,7,2);
			ctx.lineTo(33,2);
			ctx.quadraticCurveTo(38,2,38,7);
			ctx.lineTo(38,23);
			ctx.quadraticCurveTo(38,28,33,28);
			ctx.lineTo(7,28);
			ctx.quadraticCurveTo(2,28,2,23);
			ctx.lineTo(2,7);
			ctx.lineWidth = icons.line_width;
			ctx.strokeStyle = icons.stroke_style_1;
			ctx.stroke();
		}
		//draw
		for(let i=3;i<6;i++) {
			const ctx_lines = canvas[i].getContext("2d");
			ctx_lines.beginPath();
			ctx_lines.moveTo(0,0);
			ctx_lines.lineTo(5,0);
			ctx_lines.lineWidth = icons.line_width;
			ctx_lines.strokeStyle = icons.stroke_style_1;
			ctx_lines.stroke();
		}
	},

	//offers paint brush icon
	paint_brush: function() {
		//hook
		const canvas = document.getElementById("paint-brush-icon").getElementsByTagName("canvas");
		//draw
		const ctx_0 = canvas[0].getContext("2d");
		ctx_0.beginPath();
		ctx_0.moveTo(20,0);
		ctx_0.bezierCurveTo(10,30,30,30,20,0);
		ctx_0.lineWidth = icons.line_width;
		ctx_0.strokeStyle = icons.stroke_style_1;
		ctx_0.stroke();
		//draw
		const ctx_1 = canvas[1].getContext("2d");
		ctx_1.beginPath();
		ctx_1.moveTo(20,20);
		ctx_1.bezierCurveTo(30,35,5,35,10,20);
		ctx_1.quadraticCurveTo(13,11,23,10);
		ctx_1.quadraticCurveTo(17,16,20,20);
		ctx_1.lineWidth = icons.line_width;
		ctx_1.strokeStyle = icons.stroke_style_1;
		ctx_1.stroke();
	},

	//offers camera icon
	camera: function() {
		//hook
		const canvas = document.getElementById("camera-icon").getElementsByTagName("canvas");
		//draw
		const ctx_0 = canvas[0].getContext("2d");
		ctx_0.beginPath();
		ctx_0.moveTo(2,7);
		ctx_0.quadraticCurveTo(2,2,7,2);
		ctx_0.lineTo(33,2);
		ctx_0.quadraticCurveTo(38,2,38,7);
		ctx_0.lineTo(38,23);
		ctx_0.quadraticCurveTo(38,28,33,28);
		ctx_0.lineTo(7,28);
		ctx_0.quadraticCurveTo(2,28,2,23);
		ctx_0.lineTo(2,7);
		ctx_0.lineWidth = icons.line_width;
		ctx_0.strokeStyle = icons.stroke_style_1;
		ctx_0.stroke();
		//draw
		const ctx_1 = canvas[1].getContext("2d");
		ctx_1.beginPath();
		ctx_1.moveTo(0,0);
		ctx_1.lineTo(5,0);
		ctx_1.lineWidth = icons.line_width;
		ctx_1.strokeStyle = icons.stroke_style_1;
		ctx_1.stroke();
		//draw
		const ctx_2 = canvas[2].getContext("2d");
		ctx_2.beginPath();
		ctx_2.moveTo(0,0);
		ctx_2.lineTo(5,0);
		ctx_2.lineWidth = icons.line_width;
		ctx_2.strokeStyle = icons.stroke_style;
		ctx_2.stroke();
		//draw
		for(let i=3;i<6;i++) {
			const ctx_cir = canvas[i].getContext("2d");
			ctx_cir.beginPath();
			ctx_cir.arc(20,20,5,0,2*Math.PI);
			ctx_cir.lineWidth = icons.line_width;
			ctx_cir.strokeStyle = icons.stroke_style_1;
			ctx_cir.stroke();
		}
	},
	//talents paper icon
	paper: function() {
		//hook
		const canvas = document.getElementById("paper-icon").getElementsByTagName("canvas");
		//draw
		const ctx_0 = canvas[0].getContext("2d");
		ctx_0.beginPath();
		ctx_0.moveTo(20,40);
		ctx_0.lineTo(5,40);
		ctx_0.quadraticCurveTo(0,40,0,35);
		ctx_0.lineTo(0,5);
		ctx_0.quadraticCurveTo(0,0,5,0);
		ctx_0.lineTo(35,0);
		ctx_0.quadraticCurveTo(40,0,40,5);
		ctx_0.lineTo(40,20);
		ctx_0.lineWidth = icons.line_width;
		ctx_0.strokeStyle = icons.stroke_style;
		ctx_0.stroke();
		//draw
		const ctx_1 = canvas[1].getContext("2d");
		ctx_1.beginPath();
		ctx_1.moveTo(0,5);
		ctx_1.quadraticCurveTo(0,0,3,0);
		ctx_1.quadraticCurveTo(6,0,6,5);
		ctx_1.lineTo(0,5);
		ctx_1.fillStyle = icons.stroke_style;
		ctx_1.fill();
		//draw
		const ctx_2 = canvas[2].getContext("2d");
		ctx_2.beginPath();
		ctx_2.moveTo(0,5);
		ctx_2.lineTo(5,5);
		ctx_2.lineTo(5,20);
		ctx_2.lineTo(0,20);
		ctx_2.lineTo(0,5);
		ctx_2.lineWidth = icons.line_width;
		ctx_2.strokeStyle = icons.stroke_style;
		ctx_2.stroke();
		//draw
		const ctx_3 = canvas[3].getContext("2d");
		ctx_3.beginPath();
		ctx_3.moveTo(0,20);
		ctx_3.lineTo(6,20);
		ctx_3.lineTo(2,28);
		ctx_3.lineTo(0,20);
		ctx_3.fillStyle = icons.stroke_style;
		ctx_3.fill();
		//draw
		for(let i=4;i<canvas.length;i++) {
			const ctx = canvas[i].getContext("2d");
			ctx.beginPath();
			ctx.moveTo(0,0);
			ctx.lineTo(30,0);
			ctx.lineWidth = icons.line_width;
			ctx.strokeStyle = icons.stroke_style;
			ctx.stroke();
		}
	}
};




//WORKS
var works = {
	//hooks
	img_div: document.getElementsByClassName("works-img-slide")[0].getElementsByTagName("div"),
	sub_img: document.getElementsByClassName("works-img-slide")[0].getElementsByTagName("img"),
	copy: document.getElementById("works").getElementsByTagName("article")[0].getElementsByTagName("div"),
	main_img: document.getElementById("works").getElementsByClassName("img-container")[0].getElementsByTagName("img")[0],
	index_0: document.getElementById("works").getElementsByTagName("figcaption")[0].getElementsByTagName("p")[0],
	index_1: document.getElementById("works").getElementsByTagName("figcaption")[0].getElementsByTagName("p")[1],

	//add event listener 
	addListener: function() {
		//shorthand
		const div = works.img_div;
		//add listener to each img
		for(let i=0;i<div.length;i++) {
			//add listener
			div[i].addEventListener("click", works.adjust, false);
			//add class name
			div[i].className = "js-works__div-hook-" + i;
		}
		//initialize content
		works.adjust("init");
	},

	//adjust selection
	adjust: function(value) {
		//shorthands
		const div = works.img_div;
		const copy = works.copy;
		const img = works.main_img;
		const sub_img = works.sub_img;
		const index = [works.index_0, works.index_1];


		//initialize content
		if(value === "init") {
			//set main img src
			img.src = sub_img[0].src;
			//set display
			copy[1].style.display = "initial";
			//set opacity
			div[0].style.opacity = 1;
			//set index
			index[0].innerHTML = 1;
			index[1].innerHTML = "/ " + div.length;
		}
		//check for user input
		else if(value.type === "click") {
			//target identifier
			const target = Number(value.target.className[19]);
			//reset
			for(let i=0;i<div.length;i++) {
				//set display
				copy[i+1].style.display = "none";
				//set opacity
				div[i].style.opacity = 0;
			}
			//set main img src
			img.src = sub_img[target].src;
			//set display
			copy[target+1].style.display = "initial";
			//set opacity
			div[target].style.opacity = 1;
			//set index
			index[0].innerHTML = target + 1;
		}
	}
};


//TALENTS
var talents = {
	//hooks
	icon: document.getElementById("talents-icons").getElementsByTagName("li"),
	header: document.getElementById("talents-wrapper").getElementsByTagName("article")[0].getElementsByTagName("h3"),
	copy: document.getElementById("talents-wrapper").getElementsByTagName("article")[0].getElementsByTagName("p"),
	skills: document.getElementById("talents-skillset").getElementsByTagName("li"),
	testi: document.getElementById("talents-testimonials").getElementsByTagName("li"),
	testi_arrows: document.getElementById("up-down-arrows").getElementsByTagName("a"),
	//content
	name: ["Sam Billard", "Juma Stevens", "Sarah Kreger", "Brett Kymak"],
	skillset: 
	[["photoshop","illustrator","html/css"], ["html/css","javascript","node.js"],
	["website","email","catalog",], ["creative", "team player", "sales"]],
	skillset_score:
	[[30,40,35],[40,42,25],
	[42,25,25],[29,30,43]],

	//add event listener 
	addListener: function() {
		//shorthand
		const div = talents.icon;
		const arrow = talents.testi_arrows;

		//add listener to each img
		for(let i=0;i<div.length;i++) {
			//add listener
			div[i].getElementsByTagName("div")[0].addEventListener("click", talents.adjust, false);
			//add class name
			div[i].getElementsByTagName("div")[0].className = "js-talents__div-hook-" + i;
		}
		//add listener to each testimonials arrow
		for(let i=0;i<arrow.length;i++) {
			//add listener
			arrow[i].addEventListener("click", talents.testimonials, false);
			//add class name
			arrow[i].className = "js-testimonials__a-hook-" + i;
		}
		//initialize content
		talents.adjust("init");
	},

	//adjust selection
	adjust: function(value) {
		//shorthands
		const icon = talents.icon;
		const header = talents.header;
		const copy = talents.copy;
		const skills = talents.skills;
		const testi = talents.testi;
		const name = talents.name;
		const set = talents.skillset;
		const score = talents.skillset_score;

		//adjuster value
		let n = 0;

		//adjust score values
		if(screen.width < 1024) {
			//check if score has been altered
			if(score[0][0] != 30) {
				n = 20;
			}
		}
		if(screen.width >= 1024) {
			//check if score has been altered
			if(score[0][0] === 30) {
				n = -20;
			}
		}



		//initialize content
		if(value === "init") {
			//set icon opacity
			icon[0].getElementsByTagName("div")[0].style.opacity = 1;
			//set header value
			header[0].innerHTML = icon[0].getElementsByTagName("p")[0].innerHTML;
			header[1].innerHTML = name[0];
			//set copy display
			copy[0].style.display = "initial";
			//set skillset value
			for(let i=0;i<skills.length;i++) {
				skills[i].getElementsByTagName("p")[0].innerHTML = set[0][i];
				skills[i].getElementsByTagName("div")[0].style.width = score[0][i] + n + "%";
			}
			//set testimonials display
			testi[0].style.display = "flex";
		}

		//check for user input
		else if(value.type === "click") {
			//target identifier
			const target = Number(value.target.className[21]);
			//reset
			for(let i=0;i<icon.length;i++) {
				//set display
				copy[i].style.display = "none";
				//set opacity
				icon[i].getElementsByTagName("div")[0].style.opacity = 0;
			}
			//set icon opacity
			icon[target].getElementsByTagName("div")[0].style.opacity = 1;
			//set header value
			header[0].innerHTML = icon[target].getElementsByTagName("p")[0].innerHTML;
			header[1].innerHTML = name[target];
			//set copy display
			copy[target].style.display = "initial";
			//set skillset value
			for(let i=0;i<skills.length;i++) {
				skills[i].getElementsByTagName("p")[0].innerHTML = set[target][i];
				skills[i].getElementsByTagName("div")[0].style.width = score[target][i] + n + "%";
			}
		}
	},

	//testimonials selection
	testimonials: function(value) {
		//shorthand
		const arrow = talents.testi_arrows;
		const testi = talents.testi;
		//target identifier
		const target = Number(value.target.className[24]);
		//placeholder for active testimonial
		let current;

		//find which testimonial is currently active
		for(let i=0;i<testi.length;i++) {
			//style check
			let style_check = window.getComputedStyle(testi[i]).getPropertyValue("display");
			if(style_check != "none") {
				//assign current value
				current = i;
				//set current testimonial display
				testi[i].style.display = "none";
			}
		}
		//adjust testimonials
		if(target === 0) {
			//check for loop
			if(current - 1 < 0) {
				testi[testi.length - 1].style.display = "flex";
			} else {
				testi[current - 1].style.display = "flex";
			}
		}
		else if(target === 1) {
			//check for loop
			if(current + 1 === testi.length) {
				testi[0].style.display = "flex";
			} else {
				testi[current + 1].style.display = "flex";
			}
		}
	}
};


//POPUP
var popup = {
	//add event listeners
	addListener: function() {
		//hook
		const button = document.getElementsByClassName("pop");
		//add event listeners
		for(let i=0;i<button.length;i++) {
			button[i].addEventListener("click", popup.pop, false);
		}
	},

	//handle button clicks
	pop: function(value) {
		//shorthand
		const popup = document.getElementById("popup");
		const x = value.target.innerHTML;
		//popup on
		if(x != "close") {
			//display
			popup.style.display = "flex";
		}
		//popup off
		else if(x === "close") {
			//display
			popup.style.display = "none";
		}
	}
};







































