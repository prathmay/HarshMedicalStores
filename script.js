document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel-track");
    let slides = document.querySelectorAll(".slide");

    let index = 1;
    const gap = 20;

    // Clone first & last
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    slides = document.querySelectorAll(".slide");

    function updateCarousel(animate = true) {
        const slideWidth = slides[0].offsetWidth + gap;
        const containerWidth = document.querySelector(".carousel").offsetWidth;

        // center the active slide
        const offset = (slideWidth * index) - (containerWidth / 2) + (slideWidth / 2) - 10;

        track.style.transition = animate ? "transform 0.5s ease" : "none";
        track.style.transform = `translateX(-${offset}px)`;

        // update active class
        slides.forEach(s => s.classList.remove("active"));
        slides[index].classList.add("active");
    }

    function moveSlide() {
        index++;
        updateCarousel(true);
    }

    let interval;

	function startAutoSlide() {
		interval = setInterval(moveSlide, 3000);
	}

	function stopAutoSlide() {
		clearInterval(interval);
	}

	// Pause when tab inactive, resume when back
	document.addEventListener("visibilitychange", () => {
		if (document.hidden) {
			stopAutoSlide();
		} else {
			startAutoSlide();
		}
	});




	// start initially
	startAutoSlide();
	
		track.addEventListener("transitionend", () => {
			if (slides[index].isSameNode(firstClone)) {
				index = 1;
				updateCarousel(false);
			}
	
			if (slides[index].isSameNode(lastClone)) {
				index = slides.length - 2;
				updateCarousel(false);
			}
		});



    updateCarousel(false);
	
	
	const toggle = document.getElementById("menuToggle");
	const nav = document.querySelector(".nav");
	const icon = toggle.querySelector("i");

	toggle.addEventListener("click", () => {
		nav.classList.toggle("active");
		toggle.classList.toggle("active");
		
		if (nav.classList.contains("active")) {
			icon.classList.remove("fa-bars");
			icon.classList.add("fa-xmark");
		} else {
			icon.classList.remove("fa-xmark");
			icon.classList.add("fa-bars");
		}
	});
	
	
	
	
	const dropdowns = document.querySelectorAll(".dropdown > a");

	dropdowns.forEach(link => {
		link.addEventListener("click", function (e) {
			if (window.innerWidth <= 768) {
				e.stopPropagation();

				const href = this.getAttribute("href");

				// 👇 If it's a REAL link (like #footer, #about)
				if (href && href.startsWith("#") && href !== "#") {
                
					// close all dropdowns
					document.querySelectorAll(".dropdown").forEach(d => {
						d.classList.remove("active");
					});

					// close menu
					document.querySelector(".nav").classList.remove("active");

					return; // allow normal scroll
				}

				// 👇 If it's just a dropdown toggle (#)
				if (!href || href === "#") {
					e.preventDefault();

					const parent = this.parentElement;
					const isOpen = parent.classList.contains("active");

					document.querySelectorAll(".dropdown").forEach(d => {
						d.classList.remove("active");
					});

					if (!isOpen) {
						parent.classList.add("active");
					}
				}
			}
		});
	});






	// 👇 NEW: click outside = close everything
	document.addEventListener("click", function (e) {
		if (window.innerWidth <= 768) {
			const isDropdown = e.target.closest(".dropdown");
	
			if (!isDropdown) {
				document.querySelectorAll(".dropdown").forEach(d => {
					d.classList.remove("active");
				});
			}
		}
	});


});