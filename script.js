document.getElementById('odin_form').addEventListener('submit', function (e) {
  e.preventDefault();

  const firstName = document.getElementById('fName');
  const lastName = document.getElementById('lName');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('cpassword');
  const phoneNumber = document.getElementById('phoneNumber');

  // Error messages
  const fName_error_message = document.getElementById('fName_error_message');
  const lName_error_message = document.getElementById('lName_error_message');
  const email_error_message = document.getElementById('email_error_message');
  const phone_error_message = document.getElementById('phone_error_message');
  const password_error_message = document.getElementById('password_error_message');
  const confirm_password_error_message = document.getElementById('confirm_password_error_message');
  const general_error_message = document.getElementById('general_error_message');

  // Form data
  const formData = {
    fName: firstName.value.trim(),
    lName: lastName.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
    cPassword: confirmPassword.value.trim(),
    phone: phoneNumber.value.trim()
  };

  // Clear previous error states
  function clearErrors() {
    const errorElements = [
      fName_error_message, lName_error_message, email_error_message,
      phone_error_message, password_error_message, confirm_password_error_message,
      general_error_message
    ];
    const fields = [firstName, lastName, email, phoneNumber, password, confirmPassword];
    
    // Reset all error messages and error class
    errorElements.forEach(element => element.textContent = "");
    fields.forEach(field => field.classList.remove("error"));
    general_error_message.style.display = "none";
  }

  clearErrors();  // Reset errors before running validation

  function formValidation(formData) {
    const errors = [];

    const emailValidationRegex = /^\S+@\S+\.\S+$/;
    const phoneValidationRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    const maxLength = 50;
    const passMaxLength = 12;
    const passMinLength = 6;

    // Validation logic
    if (!formData.fName || formData.fName.length > maxLength) {
      fName_error_message.textContent = "First Name must be between 2 and 50 characters and non-empty.";
      firstName.classList.add('error');
      errors.push("Invalid First Name");
    }

    if (!formData.lName || formData.lName.length > maxLength) {
      lName_error_message.textContent = "Last Name must be between 2 and 50 characters and non-empty.";
      lastName.classList.add('error');
      errors.push("Invalid Last Name");
    }

    if (!formData.email || !emailValidationRegex.test(formData.email)) {
      email_error_message.textContent = "Please enter a valid email.";
      email.classList.add('error');
      errors.push("Invalid Email");
    }

    if (!formData.phone || !phoneValidationRegex.test(formData.phone)) {
      phone_error_message.textContent = "Please enter a valid phone number.";
      phoneNumber.classList.add('error');
      errors.push("Invalid Phone Number");
    }

    if (!formData.password || formData.password.length < passMinLength || formData.password.length > passMaxLength) {
      password_error_message.textContent = "Password must be between 6 and 12 characters.";
      password.classList.add('error');
      errors.push("Invalid Password");
    }

    if (formData.password !== formData.cPassword) {
      confirm_password_error_message.textContent = "Passwords do not match.";
      confirmPassword.classList.add('error');
      errors.push("Passwords do not match");
    }

    return errors.length > 0
      ? { success: false, errors: errors }
      : { success: true };
  }

  // Run validation
  const validationResult = formValidation(formData);

  if (!validationResult.success) {
    general_error_message.textContent = "Validation failed: " + validationResult.errors.join(", ");
    general_error_message.style.display = "block";
    general_error_message.style.color = "red";
    console.log("Validation failed:", validationResult.errors);
  } else {
    general_error_message.textContent = "Form submitted successfully";
    general_error_message.style.display = "block";
    general_error_message.style.color = "green";
    console.log("Form submitted successfully");
    // Proceed with form submission or other actions
  }
});