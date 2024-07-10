const switchButton = document.getElementById('switch-user');
const adminSection = document.getElementById('admin');
const userSection = document.getElementById('user');

switchButton.addEventListener('click', function() {
  userSection.classList.toggle('active');
  adminSection.classList.toggle('active');
  adminSection.classList.toggle('hidden'); 
});


const numberPicker = document.querySelector('.number-picker');
const selectedNumbers = []; // Array to store selected numbers

const numBoardsInput = document.getElementById('num-boards');
const totalCostElement = document.getElementById('total-cost');
const purchaseButton = document.getElementById('purchase-ticket');
const lottoPlus1Checkbox = document.getElementById('lotto-plus-1');
const lottoPlus2Checkbox = document.getElementById('lotto-plus-2');

const ticketCost = 5;
const lottoPlus1Cost = 2.5;
const lottoPlus2Cost = 2.5;
const maxBoardsPerTicket = 10;

function generateNumberCircles() {
  for (let i = 1; i <= 52; i++) {
    const span = document.createElement('span');
    span.textContent = i;
    span.classList.add('number-circle');

    if (i <= 13) {
      span.classList.add('red');
    } else if (i <= 25) {
      span.classList.add('yellow');
    } else if (i <= 37) {
      span.classList.add('green');
    } else {
      span.classList.add('blue');
    }

    span.addEventListener('click', function() {
      const number = parseInt(this.textContent);
      if (selectedNumbers.includes(number)) {
        selectedNumbers.splice(selectedNumbers.indexOf(number), 1);
        this.classList.remove('selected');
      } else {
        if (selectedNumbers.length < 6) {
          selectedNumbers.push(number);
          this.classList.add('selected');
        } else {
          alert('You can only select up to 6 numbers!');
        }
      }
      updateBoard();
    });

    numberPicker.appendChild(span);
  }
}

function updateBoard() {
  const boardElement = document.getElementById('board');
  boardElement.textContent = `Selected Numbers: ${selectedNumbers.join(', ')}`;
}

function calculateTotalCost() {
  const numBoards = parseInt(numBoardsInput.value) || 1;
  let totalCost = numBoards * ticketCost;
  if (lottoPlus1Checkbox.checked) {
    totalCost += numBoards * lottoPlus1Cost;
  }
  if (lottoPlus2Checkbox.checked) {
    totalCost += numBoards * lottoPlus2Cost;
  }
  totalCostElement.textContent = `Total Cost: R${totalCost.toFixed(2)}`;
}

purchaseButton.addEventListener('click', function() {
  if (selectedNumbers.length < 6) {
    alert('Please select 6 numbers to purchase a ticket!');
    return;
  }

  const numBoards = parseInt(numBoardsInput.value) || 1;
  let totalPrice = numBoards * ticketCost;

 
  if (lottoPlus1Checkbox.checked) {
    totalPrice += numBoards * lottoPlus1Cost;
  }
  if (lottoPlus2Checkbox.checked) {
    totalPrice += numBoards * lottoPlus2Cost;
  }

  totalCostElement.textContent = `Total Cost: R${totalPrice.toFixed(2)}`;

  alert(`You have purchased ${numBoards} ticket(s) with numbers: ${selectedNumbers.join(', ')}`);



  selectedNumbers.length = 0;
  updateBoard();
  totalCostElement.textContent = `Total Cost: R0`;
  const circles = document.querySelectorAll('.number-circle');
  circles.forEach(circle => circle.classList.remove('selected'));
});

generateNumberCircles();

lottoPlus1Checkbox.addEventListener('change', calculateTotalCost);
lottoPlus2Checkbox.addEventListener('change', calculateTotalCost);

//admin


