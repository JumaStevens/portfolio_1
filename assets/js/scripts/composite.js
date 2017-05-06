var composite = {
	total: false,
	download: false,

	// initialize
	init: function() {
		if(onload.load) {
			composite.image();
		}
		else if(!onload.load) {
			let screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			if(screen_width < 767) {
				onload.load = true;
			}
			else if(screen_width >= 767) {
				composite.image();
			}
		}
	},

	// create img
	image: function() {
		// vessel images
		const vessel_composite = document.getElementsByClassName('vessel-composite')[0];
		const vessel = ['vessel_about_min.jpg', 'vessel_highlights_min.jpg', 'vessel_menu_min.jpg', 'vessel_location_min.jpg', 'vessel_contact_min.jpg', 'vessel_footer_min.jpg',
			'vessel_image_0_min.jpg', 'vessel_image_1_min.jpg', 'vessel_image_2_min.jpg', 'vessel_menu_bar_min.jpg', 'vessel_button_min.png', 'vessel_button_min.png', 'vessel_indicator_min.png'];
		const vessel_width = ['574', '574', '574', '574', '574', '574', '576', '576', '576', '49', '35', '35', '20'];
		const vessel_height = ['900', '900', '900', '900', '900', '200', '900', '900', '900', '900', '35', '35', '99'];
		// advent images
		const advent_composite = document.getElementsByClassName('advent-composite')[0];
		const advent = ['advent_stitched_min.jpg'];
		const advent_width = ['1200'];
		const advent_height = ['6135'];
		// gallery images
		const gallery_composite = document.getElementsByClassName('gallery-composite')[0];
		const gallery = ['gallery_background_min.png', 'gallery_portfolio_min.jpg', 'gallery_animals_min.jpg', 'gallery_fitness_min.jpg'];
		const gallery_width = ['1200', '634', '634', '634'];
		const gallery_height = ['900', '424', '424', '424'];
		// tally images
		composite.total = vessel.length + advent.length + gallery.length;

		// create vessel img(s)
		for(let a=0;a<vessel.length;a++) {
			const vessel_path = '../images/vessel_composite/';
			let vessel_img = document.createElement('img');
			vessel_img.setAttribute('class', 'vessel-composite__image');
			vessel_img.setAttribute('width', vessel_width[a]);
			vessel_img.setAttribute('height', vessel_height[a]);
			vessel_img.setAttribute('src', vessel_path+vessel[a]);
			vessel_composite.appendChild(vessel_img);
			composite.event_listener(vessel_img);
		}

		// create advent img(s)
		for(let b=0;b<advent.length;b++) {
			const advent_path = '../images/advent_composite/';
			let advent_img = document.createElement('img');
			advent_img.setAttribute('class', 'advent-composite__image');
			advent_img.setAttribute('width', advent_width[b]);
			advent_img.setAttribute('height', advent_height[b]);
			advent_img.setAttribute('src', advent_path+advent[b]);
			advent_composite.appendChild(advent_img);
			composite.event_listener(advent_img);
		}

		// create gallery img(s)
		for(let i=0;i<gallery.length;i++) {	
			const gallery_path = '../images/gallery_composite/';
			let gallery_img = document.createElement('img');
			gallery_img.setAttribute('class', 'gallery-composite__image');
			gallery_img.setAttribute('width', gallery_width[i]);
			gallery_img.setAttribute('height', gallery_height[i]);
			gallery_img.setAttribute('src', gallery_path+gallery[i]);
			gallery_composite.appendChild(gallery_img);
			composite.event_listener(gallery_img);
		}

	},

	// handle load events
	handler: function() {
		if(composite.download === composite.total) {
			if(onload.load) {
				loader.handler(true);
			}
			else if(!onload.load) {
				onload.load = true;
			}
		}
	},


	// image load listener
	event_listener: function(img) {
		img.addEventListener('load', function load() {
			composite.download += 1;
			composite.handler();
			img.removeEventListener('load', load, false);
		}, false);
	}
};

// call
composite.init();