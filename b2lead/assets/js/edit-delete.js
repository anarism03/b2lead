// edit-delete.js

document.addEventListener('DOMContentLoaded', loadCustomerDetails);

function getCustomerIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Load customer data
function loadCustomerDetails() {
  const customerId = getCustomerIdFromURL();
  const customer = getCustomerById(customerId);

  if (customer) {
    // Display customer info
    displayCustomerInfo(customer);
  } else {
    alert('Customer not found.');
    window.location.href = 'list-customers.html';
  }
}

function getCustomerById(id) {
  const customers = JSON.parse(localStorage.getItem('customers')) || [];
  return customers.find(customer => customer.id === id);
}

function displayCustomerInfo(customer) {
  const customerInfoSection = document.getElementById('customer-info');
  customerInfoSection.innerHTML = `
    <p><strong>Full Name:</strong> ${customer.fullName}</p>
    <p><strong>Email:</strong> ${customer.email}</p>
    <p><strong>Phone Number:</strong> ${customer.phoneNumber}</p>
    <p><strong>Company:</strong> ${customer.company}</p>
    <p><strong>Department:</strong> ${customer.department}</p>
    <p><strong>Position:</strong> ${customer.position}</p>
  `;

  // Pre-fill edit form fields
  document.getElementById('edit-full-name').value = customer.fullName;
  document.getElementById('edit-email').value = customer.email;
  document.getElementById('edit-phone-number').value = customer.phoneNumber;
  document.getElementById('edit-company').value = customer.company;
  document.getElementById('edit-department').value = customer.department;
  document.getElementById('edit-position').value = customer.position;

  // Add event listener for edit form submission
  document.getElementById('edit-customer-form').addEventListener('submit', function(event) {
    event.preventDefault();
    updateCustomerData(customer.id);
  });
}

// Edit button handler
document.getElementById('edit-button').addEventListener('click', function() {
  document.getElementById('edit-customer-section').style.display = 'block';
});

// Delete button handler
document.getElementById('delete-button').addEventListener('click', function() {
  if (confirm('Are you sure you want to delete this customer?')) {
    deleteCustomer();
  }
});

function updateCustomerData(customerId) {
  // Get updated values from form
  const fullName = document.getElementById('edit-full-name').value;
  const email = document.getElementById('edit-email').value;
  const phoneNumber = document.getElementById('edit-phone-number').value;
  const company = document.getElementById('edit-company').value;
  const department = document.getElementById('edit-department').value;
  const position = document.getElementById('edit-position').value;

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

  // Update customer data in localStorage
  let customers = JSON.parse(localStorage.getItem('customers')) || [];
  const index = customers.findIndex(customer => customer.id === customerId);
  if (index !== -1) {
    customers[index] = {
      ...customers[index],
      fullName,
      email,
      phoneNumber,
      company,
      department,
      position
    };
    localStorage.setItem('customers', JSON.stringify(customers));

    alert('Customer data updated successfully.');
    window.location.reload();
  }
}

function deleteCustomer() {
  const customerId = getCustomerIdFromURL();
  let customers = JSON.parse(localStorage.getItem('customers')) || [];
  customers = customers.filter(customer => customer.id !== customerId);
  localStorage.setItem('customers', JSON.stringify(customers));

  alert('Customer deleted successfully.');
  window.location.href = 'list-customers.html';
}