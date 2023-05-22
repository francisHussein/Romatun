// Get the form and form inputs
const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const messageInput = document.querySelector("#message");

// Add an event listener to the form
form.addEventListener("submit", (event) => {
  // Prevent the form from submitting
  event.preventDefault();

  // Validate the form inputs
  let isValid = true;

  if (nameInput.value.trim() === "") {
    isValid = false;
    nameInput.classList.add("is-invalid");
  } else {
    nameInput.classList.remove("is-invalid");
  }

  if (emailInput.value.trim() === "" || !isValidEmail(emailInput.value)) {
    isValid = false;
    emailInput.classList.add("is-invalid");
  } else {
    emailInput.classList.remove("is-invalid");
  }

  if (phoneInput.value.trim() === "" || !isValidPhone(phoneInput.value)) {
    isValid = false;
    phoneInput.classList.add("is-invalid");
  } else {
    phoneInput.classList.remove("is-invalid");
  }

  if (messageInput.value.trim() === "") {
    isValid = false;
    messageInput.classList.add("is-invalid");
  } else {
    messageInput.classList.remove("is-invalid");
  }

  // Submit the form if it's valid
  if (isValid) {
    form.submit();
  }
});

// Helper functions
function isValidEmail(email) {
  // This regular expression checks for a valid email format
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  // This regular expression checks for a valid phone format
  const phoneRegex = /^\+\d{3}\d{9}$/;
  return phoneRegex.test(phone);
}


