AOS.init({
	once: true,
});

searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
	searchForm.classList.toggle('active');
}

let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () => {
	loginForm.classList.toggle('active');
}

document.querySelector('#close-login-btn').onclick = () => {
	loginForm.classList.remove('active');
}

window.onscroll = () => {

	searchForm.classList.remove('active');

	if (window.scrollY > 100) {
		document.querySelector('.header .header-1').classList.add('active');
	} else {
		document.querySelector('.header .header-1').classList.remove('active');
	}

}

window.onload = () => {

	if (window.scrollY > 100) {
		document.querySelector('.header .header-1').classList.add('active');
	} else {
		document.querySelector('.header .header-1').classList.remove('active');
	}

	fadeOut();

}

function loader() {
	document.querySelector('.loader-container').classList.add('active');
}

function fadeOut() {
	setTimeout(loader, 1000);
}

$('.banner-slider').slick({
	autoplay: false,
	autoplaySpeed: 4000,
	fade: true,
	dots: true,
	prevArrow: $('.prev'),
	nextArrow: $('.next'),
});

$('.product-grid').slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 2000,
	dots: true,
	arrows: false,
	responsive: [{
			breakpoint: 1400,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});

const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
	tab.addEventListener('click', () => {
		const target = document.querySelector(tab.dataset.tabTarget)
		tabContents.forEach(tabContent => {
			tabContent.classList.remove('active')
		})
		tabs.forEach(tab => {
			tab.classList.remove('active')
		})
		tab.classList.add('active')
		target.classList.add('active')
	})
});

// code to mark anchor active for header menu
$(document).ready(function() {
	const currentPage = window.location.href;
	$(".nav-links li").each(function() {
		const link = $(this).find("a").attr("href");
		if (currentPage.includes(link)) {
			$(".nav-links li").removeClass("active");
			$(this).addClass("active");
		}
	});

	$(".nav-links li").on("click", function() {
		$(".nav-links li").removeClass("active");
		$(this).addClass("active");
	});
});

// cart functionality for cart drawer and cart page
$(document).ready(function() {
	let cart = [];

	// === Load cart from localStorage on page load ===
	if (localStorage.getItem("cart")) {
		cart = JSON.parse(localStorage.getItem("cart"));
	}

	function saveCart() {
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	// function updateCartCount() {
	//   $(".cart-count").text(cart.length);
	// }
	function updateCartCount() {
		const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
		$(".cart-count").text(totalQuantity);
	}

	function updateCartUI() {
		const $cartItemsDrawer = $(".cart-items");
		$cartItemsDrawer.empty();
		const $cartItems = $("#cart-items");
		$cartItems.empty();
		let total = 0;

		if (cart.length === 0) {
			$cartItems.html("<p>Your cart is empty.</p>");
			$cartItemsDrawer.html("<p>Your cart is empty.</p>");
			$(".total-price").text("0.00");
			$("#total-price").text("0.00");
			updateCartCount();
			return;
		}

		cart.forEach((item, index) => {
			const itemTotal = item.price * item.quantity;
			total += itemTotal;

			// append product rows in cart drawer 
			$cartItemsDrawer.append(`
        <div class="cart-item">
          <img src="${item.img}" alt="${item.title}">
          <div class="details">
            <strong>${item.title}</strong><br>
            <small>$${item.price.toFixed(2)}</small><br>
            Qty: <input type="number" class="quantity" min="1" value="${item.quantity}">
            <span class="remove-item">✖</span>
          </div>
        </div>
      `);

			// append product rows in cart page
			$cartItems.append(`
        <tr class="cart-item">
          <td class="product__cart__item">
              <div class="product__cart__item__pic">
                <img src="${item.img}" alt="${item.title}" width="60" />
              </div>
              <div class="product__cart__item__text">
                <h6>${item.title}</h6>
                <h5>$${item.price.toFixed(2)}</h5>
              </div>
           </td>
           <td class="quantity__item">
    		<div class="quantity_div">
      			<button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
      			<input type="number" value="${item.quantity}" min="1" class="form-control product-qty" id="product-qty"/>
      			<button class="qty-count qty-count--add" data-action="add" type="button">+</button>
    		</div>
  		  </td>
			
            <td class="cart__close remove-item"><i class="fa fa-close"></i></td>
        </tr>
      `);
		});

		$(".total-price").text(total.toFixed(2));
		$("#total-price").text(total.toFixed(2));
		updateCartCount();
		saveCart();
	}

	$(".add-to-cart").on("click", function(e) {
		e.preventDefault();
		const $product = $(this).closest(".product-item");
		const title = $product.find("h3").text().trim();
		const priceText = $product.find(".item-price").text().replace("$", "").trim();
		const price = parseFloat(priceText);
		const img = $product.find("img").attr("src");

		const existingItem = cart.find((item) => item.title === title);
		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			cart.push({
				title,
				price,
				img,
				quantity: 1
			});
		}

		updateCartUI();
	});

	$(".single-add-to-cart").on("click", function(e) {
		e.preventDefault();

		const title = $('#product-name').text().trim();
		const priceText = $('#product-price').text().replace("$", "").trim();
		const price = parseFloat(priceText);
		const img = $('#firstImage').val();
		const quantity = parseInt($('#product_quantity').val(), 10); // 🔧 Convert to number

		if (isNaN(quantity) || quantity <= 0) {
			alert("Please enter a valid quantity.");
			return;
		}

		const existingItem = cart.find((item) => item.title === title);

		if (existingItem) {
			existingItem.quantity += quantity; // ✅ Now both are numbers
		} else {
			cart.push({
				title,
				price,
				img,
				quantity
			}); // ✅ Already a number
		}

		updateCartUI(); // Assuming this function refreshes your cart display
	});

	$(".cart-icon").on("click", function() {
		$(".cart-panel").addClass("open");
	});

	$(".close-cart").on("click", function() {
		$(".cart-panel").removeClass("open");
	});

	// === Quantity update in cart drawer ===
	$(".cart-items").on("change", ".quantity", function() {
		const title = $(this).closest(".cart-item").find("strong").text().trim().toLowerCase();
		let qty = parseInt($(this).val());
		if (qty < 1 || isNaN(qty)) qty = 1;

		const item = cart.find(item => item.title.trim().toLowerCase() === title);
		if (item) {
			item.quantity = qty;
			saveCart();
			updateCartUI();
		}
	});

	// === Remove item from cart drawer ===
	$(".cart-items").on("click", ".remove-item", function() {
		const title = $(this).closest(".cart-item").find("strong").text().trim().toLowerCase();
		cart = cart.filter(item => item.title.trim().toLowerCase() !== title);
		saveCart();
		updateCartUI();
	});

	// === Quantity update on cart page ===
	$("#cart-items").off("click", ".qty-count").on("click", ".qty-count", function () {
    const $button = $(this);
    const $input = $button.siblings(".product-qty");
    const $cartItem = $button.closest(".cart-item");

    let qty = parseInt($input.val(), 10);
    const min = parseInt($input.attr("min")) || 1;
    if (isNaN(qty)) qty = min;

    if ($button.data("action") === "add") {
      qty++;
    } else if ($button.data("action") === "minus" && qty > min) {
      qty--;
    }

    $input.val(qty);

    const title = $cartItem.find("h6").text().trim().toLowerCase();
    const item = cart.find(i => i.title.trim().toLowerCase() === title);

    if (item) {
      item.quantity = qty;
      saveCart();
      updateCartUI();
    }
  });

  $("#cart-items").off("change", ".product-qty").on("change", ".product-qty", function () {
    const $input = $(this);
    const $cartItem = $input.closest(".cart-item");
    let qty = parseInt($input.val(), 10);
    const min = parseInt($input.attr("min")) || 1;
    if (isNaN(qty) || qty < min) qty = min;

    $input.val(qty);

    const title = $cartItem.find("h6").text().trim().toLowerCase();
    const item = cart.find(i => i.title.trim().toLowerCase() === title);

    if (item) {
      item.quantity = qty;
      saveCart();
      updateCartUI();
    }
  });
	// === Remove item on cart page ===
	$("#cart-items").on("click", ".remove-item", function() {
		const title = $(this).closest(".cart-item").find("h6").text().trim().toLowerCase();
		cart = cart.filter(item => item.title.trim().toLowerCase() !== title);
		saveCart();
		updateCartUI();
	});

	// === Checkout button ===
	$("#checkout-btn").on("click", function() {
		if (cart.length === 0) {
			alert("Your cart is empty.");
			return;
		}

		window.location.href = "checkout.html";
	});

	// === Initial render ===
	updateCartUI();
});

// Newsletter form validation

$("#newsletter-form-submit").on("click", function(e) {
	e.preventDefault();

	// Grab form fields
	const email = $('input[name="email_newsletter"]').val().trim();

	let isValid = true;
	// Clear previous error messages
	$(".error-msg").text("");
	// Email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (email === "") {
		isValid = false;
		$("#email_newsletter-errorMsg").text("Email is required.");
	} else if (!emailRegex.test(email)) {
		isValid = false;
		$("#email_newsletter-errorMsg").text("Please enter a valid email.");
	}

	// Final check
	if (!isValid) {
		return;
	}

	// ✅ If all is valid
	$("#newsletter-form")[0].reset(); // or .trigger("reset")
	$(".error-msg").text("");
	$("#newsletter_message").text("Thanks for your response! We will contact you soon.");
});


// close cart panel on click outside

$(document).mouseup(function(e) {
	const $cartPanel = $(".cart-panel");

	// Check if cart is open
	if ($cartPanel.hasClass("open")) {
		// If the target of the click isn't the cart panel or a descendant of the cart panel
		if (!$cartPanel.is(e.target) && $cartPanel.has(e.target).length === 0) {
			$cartPanel.removeClass("open");
		}
	}
});

$(document).mouseup(function(e) {
	const $searchPanel = $(".search-form");

	// Check if cart is open
	if ($searchPanel.hasClass("active")) {
		// If the target of the click isn't the cart panel or a descendant of the cart panel
		if (!$searchPanel.is(e.target) && $searchPanel.has(e.target).length === 0) {
			$searchPanel.removeClass("active");
		}
	}
});


// create products array and save it to localstorage
$(document).ready(function() {
	const products = [{
			id: "1",
			name: "Atomic Habits",
			price: 40.00,
			author: "James Clear",
			images: ["images/atomic-habits.jpg", "images/atomic-habits.jpg"],
			description: `Atomic Habits will reshape the way you think about progress and success, and give you the tools and strategies you need to transform your habits--whether you are a team looking to win a championship, an organization hoping to redefine an industry, or simply an individual who wishes to quit smoking, lose weight, reduce stress, or achieve any other goal.`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "2",
			name: "Do It Today",
			price: 35.00,
			author: "Darius Foroux",
			images: ["images/do-it-today.jpg", "images/do-it-today.jpg"],
			description: `Are you also tired of putting off your dreams until "tomorrow?" Guess what! Tomorrow never comes. Am I right?
I've procrastinated and put off my desire to write a book for a decade. I always came up with excuses like, "it's not the right time." Or, "I need to do more research."
But in 2015 I got tired of this endless procrastination, and finally took action. Six months later, my first book was published.
Look, we all have limited time on our hands. And we're getting closer to death every single minute. That shouldn't scare you. That should motivate you!
Time is limited, that's why we must do the things we want: Today.
In this "best of" collection, I've handpicked 30 of my best articles that help you to overcome procrastination, improve your productivity, and achieve all the things you always wanted.
Plus, I've written an extensive introduction about my life and work philosophy.
In Do It Today.`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "3",
			name: "The One Thing",
			price: 50.00,
			author: "Gary Keller",
			images: ["images/the-one-thing.jpg", "images/the-one-thing.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "4",
			name: "DEEP WORK",
			price: 20.00,
			author: "CAL NEWPORT",
			images: ["images/deep-wrok.jpg", "images/deep-wrok.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "5",
			name: "The Communication Book",
			price: 40.00,
			author: "Mikael Krogerus Roman Tschäppeler",
			images: ["images/The Communication Book.jpg", "images/The Communication Book.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "6",
			name: "How to Win Friends and Influence People",
			price: 40.00,
			author: "Dale Carnegie",
			images: ["images/How To Win Friends.jpg", "images/How To Win Friends.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "7",
			name: "How to Talk to Anyone",
			price: 40.00,
			author: "Leil Lowndes",
			images: ["images/How to Talk to Anyone.jpg", "images/How to Talk to Anyone.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "8",
			name: "Never Split the Difference",
			price: 40.00,
			author: "Voss ChrisRaz",
			images: ["images/Never Split the Difference.jpg", "images/Never Split the Difference.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "9",
			name: "The Psychology of Money",
			price: 40.00,
			author: "Morgan Housel",
			images: ["images/The Psychology of Money.jpg", "images/The Psychology of Money.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "10",
			name: "Broke Millennial",
			price: 40.00,
			author: "Erin Lowry",
			images: ["images/broke-millenials.jpg", "images/broke-millenials.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "11",
			name: "How to Get Rich",
			price: 40.00,
			author: "Felix Dennis",
			images: ["images/how-to-get-rich.jpg", "images/how-to-get-rich.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "12",
			name: "Rich Dad Poor Dad",
			price: 52.00,
			author: "Robert T. Kiyosaki",
			images: ["images/rich-dad-poor-dad.jpg", "images/rich-dad-poor-dad.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "13",
			name: "Your Next Five Moves",
			price: 40.00,
			author: "Patrick Bet-David",
			images: ["images/your-next-five-move.jpg", "images/your-next-five-move.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "14",
			name: "Zero to One",
			price: 45.00,
			author: "Blake Masters Peter Thiel",
			images: ["images/zero-to-one.jpg", "images/zero-to-one.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "15",
			name: "Blue Ocean Strategy",
			price: 27.00,
			author: "Renee A. Mauborgne and W. Chan Kim",
			images: ["images/blue-ocean.jpg", "images/blue-ocean.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "16",
			name: "THE PERSONAL MBA",
			price: 18.00,
			author: "JOSH KAUFMAN",
			images: ["images/personal-mba.jpg", "images/personal-mba.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "17",
			name: "Ikigai: Japanese secret to long and happy life",
			price: 45.00,
			author: "Francesc García, Héctor,Miralles",
			images: ["images/ikigai.jpg", "images/ikigai.jpg"],
			description: `It's the Japanese word for 'a reason to live' or 'a
                        reason to jump out of bed in the morning'. It's the
                        place where your needs, desires, ambitions, and
                        satisfaction meet. A place of balance. Small wonder that
                        finding your ikigai is closely linked to living longer.
                        Finding your ikigai is easier than you might think. This
                        book will help you work out what your own ikigai really
                        is, and equip you to change your life. You have a
                        purpose in this world: your skills, your interests, your
                        desires and your history have made you the perfect
                        candidate for something. All you have to do is find it.
                        Do that, and you can make every single day of your life
                        joyful and meaningful.`,
			longDescription: `It's the Japanese word for 'a reason to live' or 'a
                        reason to jump out of bed in the morning'. It's the
                        place where your needs, desires, ambitions, and
                        satisfaction meet. A place of balance. Small wonder that
                        finding your ikigai is closely linked to living longer.
                        Finding your ikigai is easier than you might think. This
                        book will help you work out what your own ikigai really
                        is, and equip you to change your life. You have a
                        purpose in this world: your skills, your interests, your
                        desires and your history have made you the perfect
                        candidate for something. All you have to do is find it.
                        Do that, and you can make every single day of your life
                        joyful and meaningful.`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "18",
			name: "Reflections: Swami Vivekananda",
			price: 18.00,
			author: "Swami Vivekananda",
			images: ["images/reflection-swami-vivekananda.jpg", "images/reflection-swami-vivekananda.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "19",
			name: "Karma: A Yogis Guide to Crafting Your Destiny",
			price: 81.00,
			author: "Sadhguru",
			images: ["images/karma.jpg", "images/karma.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "20",
			name: "Sapiens: A Brief History of Humankind",
			price: 36.00,
			author: "Yuval Noah Harari",
			images: ["images/sapiens.jpg", "images/sapiens.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "21",
			name: "Learning How to Fly",
			price: 27.00,
			author: "A.P.J. Abdul Kalam",
			images: ["images/how-to-fly.jpg", "images/how-to-fly.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		{
			id: "22",
			name: "You Can",
			price: 18.00,
			author: "George Matthew Adams",
			images: ["images/you-can.jpg", "images/you-can.jpg"],
			description: `It's the Japanese word for 'a reason to live'...`,
			longDescription: `This is a detailed description of the product...`,
			reviews: [{
					name: "John Doe",
					rating: 4,
					text: "Great product!..."
				},
				{
					name: "Jane Smith",
					rating: 5,
					text: "Loved it! Highly recommend..."
				}
			]
		},
		// Add more products here
	];

	// Save to localStorage only if not already saved
	if (!localStorage.getItem("products")) {
		localStorage.setItem("products", JSON.stringify(products));
	}
});

