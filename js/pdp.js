// dynamic product content fetching

$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const products = JSON.parse(localStorage.getItem("products")) || [];
//   console.log(products);
  const product = products.find(p => p.id === productId);
//   console.log(product);
  var firstImage = product.images[0];

  // Set it as the value of the hidden input
  $('#firstImage').val(firstImage);

  if (!product) {
    $(".pdp-container").html("<p>Product not found.</p>");
    return;
  }

  // Update images
  let sliderFor = '', sliderNav = '';
  product.images.forEach(img => {
    sliderFor += `<div><img src="${img}" class="img-fluid" /></div>`;
    sliderNav += `<div class="zoom-hover"><img src="${img}" class="img-thumbnail" /></div>`;
  });
  $(".slider-for").html(sliderFor);
  $(".slider-nav").html(sliderNav);

  // Update product info
  $(".col-md-6 #product-name").text(product.name);
  $(".col-md-6 #product-description").text(product.description);
  $(".col-md-6 #product-price").text(`$${product.price}`);

  // Update tabs
  $("#description").html(`<p>${product.longDescription}</p>`);

  // Reviews
  let reviewsHtml = "";
  product.reviews.forEach(r => {
    const stars = "⭐".repeat(r.rating) + "☆".repeat(5 - r.rating);
    reviewsHtml += `
      <div class="review">
        <strong>${r.name}</strong>
        <p>${stars}</p>
        <p>${r.text}</p>
      </div><hr />
    `;
  });
  $("#reviews").html(reviewsHtml);

  $('.qty-count').on('click', function() {
		const $button = $(this);
		const $input = $button.siblings('.product-qty');
		const currentVal = parseInt($input.val(), 10);
		const min = parseInt($input.attr('min'), 10) || 1;

		if ($button.data('action') === 'add') {
			$input.val(currentVal + 1);
		} else if ($button.data('action') === 'minus') {
			if (currentVal > min) {
				$input.val(currentVal - 1);
			}
		}
	});
});

