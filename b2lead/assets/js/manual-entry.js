// manual-entry.js

document.getElementById('manual-entry-form').addEventListener('submit', handleManualEntry);

function handleManualEntry(event) {
  event.preventDefault();

  // Get form values
  const fullName = document.getElementById('full-name').value;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phone-number').value;
  const company = document.getElementById('company').value;
  const department = document.getElementById('department').value;
  const position = document.getElementById('position').value;

  // Validate input
  if (!isRequiredFieldFilled(fullName) ||
      !isRequiredFieldFilled(email) ||
      !isRequiredFieldFilled(phoneNumber)) {
    alert('Please fill in all required fields.');
    return;
  }

  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!isValidPhoneNumber(phoneNumber)) {
    alert('Please enter a valid phone number.');
    return;
  }

  // Create customer object
  const customer = {
    id: generateUniqueId(),
    fullName,
    email,
    phoneNumber,
    company,
    department,
    position,
    createdAt: new Date()
  };

  // Save customer data (for now, we'll use localStorage)
  saveCustomerData(customer);

  alert('Customer data saved successfully.');

  // Reset the form
  document.getElementById('manual-entry-form').reset();
}

function saveCustomerData(customer) {
  let customers = JSON.parse(localStorage.getItem('customers')) || [];
  customers.push(customer);
  localStorage.setItem('customers', JSON.stringify(customers));
}

function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}