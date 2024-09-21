// upload.js

document.getElementById('upload-form').addEventListener('submit', handleFileUpload);

function handleFileUpload(event) {
  event.preventDefault();

  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      const firstSheet = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheet];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Display data preview
      displayDataPreview(jsonData);
    };

    reader.onerror = function(ex) {
      console.error(ex);
    };

    reader.readAsBinaryString(file);
  } else {
    alert('Please select a file.');
  }
}

function displayDataPreview(data) {
  const dataPreviewSection = document.getElementById('data-preview-section');
  const dataPreviewTable = document.getElementById('data-preview');
  dataPreviewTable.innerHTML = ''; // Clear previous data

  // Build table header
  const headerRow = document.createElement('tr');
  const headers = Object.keys(data[0]);
  headers.forEach(headerText => {
    const headerCell = document.createElement('th');
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });
  dataPreviewTable.appendChild(headerRow);

  // Build table rows
  data.forEach((rowData, index) => {
    const row = document.createElement('tr');
    headers.forEach(headerText => {
      const cell = document.createElement('td');
      const cellValue = rowData[headerText] || '';
      cell.textContent = cellValue;

      // Validate required fields
      if ((headerText.toLowerCase() === 'email' && !isValidEmail(cellValue)) ||
          (headerText.toLowerCase() === 'phone number' && !isValidPhoneNumber(cellValue))) {
        cell.classList.add('error');
      }

      row.appendChild(cell);
    });
    dataPreviewTable.appendChild(row);
  });

  dataPreviewSection.style.display = 'block';

  // Enable save button
  document.getElementById('save-data').disabled = false;

  // Add event listener for save data button
  document.getElementById('save-data').addEventListener('click', function() {
    saveUploadedData(data);
  });
}

function saveUploadedData(data) {
  // Here you would send the data to the backend API
  // For now, we'll save it to localStorage
  let customers = JSON.parse(localStorage.getItem('customers')) || [];
  customers = customers.concat(data);
  localStorage.setItem('customers', JSON.stringify(customers));

  alert('Data saved successfully.');
  window.location.href = 'list-customers.html';
}