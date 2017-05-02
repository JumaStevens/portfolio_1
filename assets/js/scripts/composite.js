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
		const vessel = ['vessel_stitched_min.jpg', 'vessel_menu_toggle_min.png'];
		const vessel_width = ['1000', '40'];
		const vessel_height = ['5315', '40'];
		// advent images
		// gallery images
		const gallery_composite = document.getElementsByClassName('gallery-composite')[0];
		const gallery = ['gallery_background_min.png', 'gallery_portfolio_min.jpg', 'gallery_animals_min.jpg', 'gallery_fitness_min.jpg'];
		const gallery_width = ['1200', '634', '634', '634'];
		const gallery_height = ['900', '424', '424', '424'];
		// tally images
		composite.total = vessel.length + gallery.length;

		// create vessel img(s)
		for(let a=0;a<vessel.length;a++) {
			const vessel_path = '../../assets/images/vessel_composite/';
			let vessel_img = document.createElement('img');
			vessel_img.setAttribute('class', 'vessel-composite__image');
			vessel_img.setAttribute('width', vessel_width[a]);
			vessel_img.setAttribute('height', vessel_height[a]);
			vessel_img.setAttribute('src', vessel_path+vessel[a]);
			vessel_composite.appendChild(vessel_img);
			composite.event_listener(vessel_img);
		}

		// create gallery img(s)
		for(let i=0;i<gallery.length;i++) {	
			const gallery_path = '../../assets/images/gallery_composite/';
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
		console.log('total' +composite.total);
		console.log(composite.download);
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