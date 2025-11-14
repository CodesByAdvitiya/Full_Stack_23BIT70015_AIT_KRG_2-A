let balance = 1000;

function updateUI() {
  document.getElementById('balance').textContent = `$${balance}`;
  document.getElementById('amount').value = '';
  document.getElementById('message').textContent = '';
}

function deposit() {
  const amount = Number(document.getElementById('amount').value);
  if (amount > 0) {
    balance += amount;
    updateUI();
  }else {
    document.getElementById('message').textContent="Please enter a valid deposit amount!"
  }
}

function withdraw() {
  const amount = Number(document.getElementById('amount').value);
  if (amount > 0 && amount <= balance) {
    balance -= amount;
    updateUI();
  } else {
    document.getElementById('message').textContent = 'Invalid withdrawal amount!';
  }
}