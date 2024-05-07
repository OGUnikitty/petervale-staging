// ... (existing event listeners)

const addFileBtn = document.getElementById('add-file');
const uploadContainer = document.getElementById('upload-container');

//BUtton functions 

addFileBtn.addEventListener('click', addFileGroup)

// Imagine you forgot
const copiesInputs = document.querySelectorAll('#copies');
copiesInputs.forEach(input => {
  input.addEventListener('change', () => {
    const fileGroup = input.closest('.file-group');
    updatePrice(fileGroup);
  });
});

const colorModeSelects = document.querySelectorAll('#color-mode');
colorModeSelects.forEach(select => {
  select.addEventListener('change', () => {
    const fileGroup = select.closest('.file-group');
    updatePrice(fileGroup);
  });
});

const doubleSidedCheckboxes = document.querySelectorAll('#double-sided');
doubleSidedCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const fileGroup = checkbox.closest('.file-group');
    updatePrice(fileGroup);
  });
});


// Global variables for paper prices
const paperPrices = {
  A4: 0.10,
  Letter: 0.15,
  // Add more paper prices as needed
};

// Function to add a new file group
function addFileGroup() {
  // Create a new file group element and append it to the container
  const newFileGroup = document.createElement('div');
  newFileGroup.classList.add('file-group');
  // ... (add input fields, dropdown, textarea, etc. to the new group)
  newFileGroup.innerHTML = `
  <div class="file-group">
      <div id="file-group-header">
        <h1>Upload More Files and Get a Price Quotation</h1>
      </div>
      <div id="options">
        <input type="file" id="file-input">
        <select id="paper-size">
          <option value="A4">A4</option>
          <option value="Letter">Letter</option>
          </select>
              <input type="number" id="copies" min="1" value="1" placeholder="Number of Copies">
              <select id="color-mode">
                <option value="black">Black & White</option>
                <option value="color">Color</option>
              </select>
              <select id="layout">
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
              <label for="double-sided">Double-Sided:</label>
              <input type="checkbox" id="double-sided">
              <textarea id="instructions" placeholder="Additional Instructions"></textarea>
              
          

      </div>

      <div id="unit-price-container">
        <p >Unit Price:R<span id="unit-price">0</span></p>
      </div>
      
    </div>
  `
  uploadContainer.appendChild(newFileGroup);
}



function updatePrice(fileGroup) {
    const paperSize = fileGroup.querySelector('#paper-size').value;
    const unitPrice = paperPrices[paperSize];
    fileGroup.querySelector('#unit-price').textContent = unitPrice.toFixed(2);
    const colorMode = fileGroup.querySelector('#color-mode').value;
    const colorModePrice = colorModePrices[colorMode];
    const copies = parseInt(fileGroup.querySelector('#copies').value);
    const doubleSided = fileGroup.querySelector('#double-sided').checked;
  
    const totalPrice = unitPrice * copies * (1 + colorModePrice) + (doubleSided ? doubleSidedPrice * copies : 0);
    // ... (update total price and grand total)
  }
  

  // Event listeners for file input changes, paper size selection, add file button, and confirm order button
// ... (implement event listeners to handle user interactions and price calculation)

console.log("alive")




const confirmOrderBtn = document.getElementById('confirm-order');

confirmOrderBtn.addEventListener('click', () => {
  const fileGroups = document.querySelectorAll('.file-group');
  const allData = [];

  fileGroups.forEach(fileGroup => {
    const data = fetchAndPrepareData(fileGroup);
    allData.push(data);
  });

  // Send the bundled data to the server
  fetch('/your-server-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(allData)
  })
  .then(response => {
    // Handle server response
  })
  .catch(error => {
    // Handle errors
  });
});

// Helper function to fetch and prepare data from a single file group
function fetchAndPrepareData(fileGroup) {
  const fileInput = fileGroup.querySelector('#file-input');
  const paperSize = fileGroup.querySelector('#paper-size').value;
  const copies = fileGroup.querySelector('#copies').value;
  const colorMode = fileGroup.querySelector('#color-mode').value;
  const layout = fileGroup.querySelector('#layout').value;
  const doubleSided = fileGroup.querySelector('#double-sided').checked;
  const instructions = fileGroup.querySelector('#instructions').value;

  const file = fileInput.files ? fileInput.files[0] : null;

  return {
    file: file,
    paperSize: paperSize,
    copies: copies,
    colorMode: colorMode,
    layout: layout,
    doubleSided: doubleSided,
    instructions: instructions
  };
}
