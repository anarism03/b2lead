// search-sort.js

let customers = [];

document.addEventListener('DOMContentLoaded', function() {
  loadCustomers();

  document.getElementById('search-input').addEventListener('input', handleSearch);
  document.getElementById('sort-select').addEventListener('change', handleSort);
});

function loadCustomers() {
  customers = JSON.parse(localStorage.getItem('customers')) || [];
  displayCustomers(customers);
}

function displayCustomers(customersToDisplay) {
  const tbody = document.querySelector('#customer-table tbody');
  tbody.innerHTML = '';

  customersToDisplay.forEach(customer => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${customer.fullName}</td>
      <td>${customer.email}</td>
      <td>${customer.phoneNumber}</td>
      <td>${customer.company}</td>
      <td>
        <a href="customer-details.html?id=${customer.id}">View</a>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function handleSearch() {
  const query = this.value.toLowerCase();
  const filteredCustomers = customers.filter(customer => {
    return (
      customer.fullName.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.phoneNumber.includes(query) ||
      (customer.company && customer.company.toLowerCase().includes(query))
    );
  });
  displayCustomers(filteredCustomers);
}

function handleSort() {
  const sortBy = this.value;
  customers.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) { return -1; }
    if (a[sortBy] > b[sortBy]) { return 1; }
    return 0;
  });
  displayCustomers(customers);
}