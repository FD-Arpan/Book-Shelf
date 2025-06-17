$("#contact-form-submit").on("click", function (e) {
  e.preventDefault();

  // Grab form fields
  const name = $('input[name="contact_name"]').val().trim();
  const email = $('input[name="contact_email"]').val().trim();

  let isValid = true;
  // Clear previous error messages
  $(".error-msg").text("");
  // Validate each field
  if (name === "") {
    isValid = false;
    $("#contact_name-errorMsg").text("Name is required.");
  }
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    isValid = false;
    $("#contact_email-errorMsg").text("Email is required.");
  } else if (!emailRegex.test(email)) {
    isValid = false;
    $("#contact_email-errorMsg").text("Please enter a valid email.");
  }

  // Final check
  if (!isValid) {
    return;
  }

  // ✅ If all is valid
  $("#contact")[0].reset(); // or .trigger("reset")
  $(".error-msg").text("");
  $("#thankyou_message").text("Thanks for your response! We will contact you soon.");
});