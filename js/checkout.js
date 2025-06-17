$(document).ready(function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const $itemsContainer = $("#checkout-cart-items");
    let total = 0;

    if (cart.length === 0) {
        $itemsContainer.html("<p>Your cart is empty.</p>");
        $("#checkout-total").text("0.00");
        return;
    }

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        $itemsContainer.append(`
            <li>${index + 1}. ${item.title} <span>$${item.price.toFixed(2)} × ${
                item.quantity
            } = <strong>$${itemTotal.toFixed(2)}</strong></span></li>
      
        `);
    });

    $("#checkout-total").text(total.toFixed(2));

    // Optional: Handle order submission
    $("#user-details-form").on("submit", function (e) {
        e.preventDefault();

        alert("Order placed successfully!");
        localStorage.removeItem("cart"); // clear cart
        window.location.href = "thank-you.html"; // or redirect elsewhere
    });
});

$("#place-order").on("click", function (e) {
  e.preventDefault();

  // Grab form fields
  const first_name = $('input[name="first_name"]').val().trim();
  const last_name = $('input[name="last_name"]').val().trim();
  const country = $('input[name="country"]').val().trim();
  const address = $('input[name="address"]').val().trim();
  const city = $('input[name="city"]').val().trim();
  const state = $('input[name="state"]').val().trim();
  const zip = $('input[name="zip"]').val().trim();
  const phone = $('input[name="phone"]').val().trim();
  const email = $('input[name="email"]').val().trim();

  let isValid = true;

  // Clear previous error messages
  $(".error-msg").text("");

  // Validate each field
  if (first_name === "") {
    isValid = false;
    $("#first-errorMsg").text("First Name is required.");
  }

  if (last_name === "") {
    isValid = false;
    $("#last-errorMsg").text("Last Name is required.");
  }

  if (country === "") {
    isValid = false;
    $("#country-errorMsg").text("Country is required.");
  }

  if (address === "") {
    isValid = false;
    $("#address-errorMsg").text("Address is required.");
  }

  if (state === "") {
    isValid = false;
    $("#state-errorMsg").text("State is required.");
  }

  if (city === "") {
    isValid = false;
    $("#city-errorMsg").text("City is required.");
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    isValid = false;
    $("#email-errorMsg").text("Email is required.");
  } else if (!emailRegex.test(email)) {
    isValid = false;
    $("#email-errorMsg").text("Please enter a valid email.");
  }

  // Zip validation (5 digits)
  const zipRegex = /^\d{5}$/;
  if (zip === "") {
    isValid = false;
    $("#zip-errorMsg").text("Zip code is required.");
  } else if (!zipRegex.test(zip)) {
    isValid = false;
    $("#zip-errorMsg").text("Zip code must be 5 digits.");
  }

  // Phone validation
  const phoneRegex = /^[+]?[0-9\s\-]{10,15}$/;
  if (phone === "") {
    isValid = false;
    $("#phone-errorMsg").text("Phone number is required.");
  } else if (!phoneRegex.test(phone)) {
    isValid = false;
    $("#phone-errorMsg").text("Invalid phone number format.");
  }

  // Final check
  if (!isValid) {
    return;
  }

  // ✅ If all is valid
  alert("Order placed successfully!");
  localStorage.removeItem("cart");
  window.location.href = "thank-you.html";
});