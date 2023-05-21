// Get HTML elements
const balanceElement = document.getElementById('balance');
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');

// Initial balance
let balance = 0;

// Function to display balance
function displayBalance() {
  balanceElement.textContent = `$${balance.toFixed(2)}`;
}

// Function to add a transaction
function addTransaction(type, amount) {
  // Create transaction item
  const transactionItem = document.createElement('li');
  transactionItem.classList.add('transaction-item');
  transactionItem.innerHTML = `
    <span>${type.toUpperCase()}</span>
    <span class="amount">$${amount.toFixed(2)}</span>
    <button class="delete-button">Delete</button>
  `;

  // Update balance based on transaction type
  if (type === 'income') {
    balance += amount;
    transactionItem.classList.add('income');
  } else if (type === 'expense') {
    balance -= amount;
    transactionItem.classList.add('expense');
  }

  // Add transaction item to the list
  transactionList.appendChild(transactionItem);

  // Update balance display
  displayBalance();
}

// Function to delete a transaction
function deleteTransaction(transactionItem) {
  const amountElement = transactionItem.querySelector('.amount');
  const amount = parseFloat(amountElement.textContent.replace('$', ''));
  const type = transactionItem.classList.contains('income') ? 'income' : 'expense';

  // Update balance based on transaction type
  if (type === 'income') {
    balance -= amount;
  } else if (type === 'expense') {
    balance += amount;
  }

  // Remove transaction item
  transactionItem.remove();

  // Update balance display
  displayBalance();
}

// Handle form submission
transactionForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const type = document.getElementById('transaction-type').value;
  const amount = parseFloat(document.getElementById('transaction-amount').value);

  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }

  addTransaction(type, amount);

  // Reset form inputs
  transactionForm.reset();
});

// Handle delete button click
transactionList.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-button')) {
    const transactionItem = event.target.closest('.transaction-item');
    deleteTransaction(transactionItem);
  }
});

// Initialize balance display
displayBalance();
