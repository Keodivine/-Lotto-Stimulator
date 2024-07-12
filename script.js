const switchButton = document.getElementById('switch-user');
const adminSection = document.getElementById('admin');
const userSection = document.getElementById('user');

switchButton.addEventListener('click', function() {
  userSection.classList.toggle('active');
  adminSection.classList.toggle('active');
  adminSection.classList.toggle('hidden'); 
});

const boardsContainer = document.getElementById('boards-container');
const numBoardsInput = document.getElementById('num-boards');
const totalCostElement = document.getElementById('total-cost');
const purchaseButton = document.getElementById('purchase-ticket');
const lottoPlus1Checkbox = document.getElementById('lotto-plus-1');
const lottoPlus2Checkbox = document.getElementById('lotto-plus-2');
const ticketDetails = document.getElementById('ticket-details');
const ticketCost = 5;
const lottoPlus1Cost = 2.5;
const lottoPlus2Cost = 2.5;

const allTickets = [];

function generateNumberPicker(boardIndex) {
  const pickerContainer = document.createElement('div');
  pickerContainer.classList.add('picker-container');

  const boardTitle = document.createElement('h4');
  boardTitle.textContent = `Board ${boardIndex + 1}`;
  pickerContainer.appendChild(boardTitle);

  const numberPicker = document.createElement('div');
  numberPicker.classList.add('number-picker');

  const selectedNumbers = [];

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
      updateBoard(boardIndex, selectedNumbers);
    });

    numberPicker.appendChild(span);
  }

  pickerContainer.appendChild(numberPicker);
  boardsContainer.appendChild(pickerContainer);
}

function generateNumberPickers() {
  boardsContainer.innerHTML = '';
  const numBoards = parseInt(numBoardsInput.value) || 1;
  for (let i = 0; i < numBoards; i++) {
    generateNumberPicker(i);
  }
}

function updateBoard(boardIndex, selectedNumbers) {
  const boardElement = document.querySelector(`#board-${boardIndex}`);
  if (boardElement) {
    boardElement.textContent = `Selected Numbers: ${selectedNumbers.join(', ')}`;
  }
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

function generateUniqueID() {
  return 'TID' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function displayTicketDetails(ticket) {
  const ticketDiv = document.createElement('div');
  ticketDiv.classList.add('ticket');
  ticketDiv.innerHTML = `
    <p><strong>Ticket ID:</strong> ${ticket.id}</p>
    <p><strong>Date:</strong> ${ticket.date}</p>
    <p><strong>Boards:</strong></p>
    <ul>
      ${ticket.boards.map(board => `<li>${board.join(', ')}</li>`).join('')}
    </ul>
    <p><strong>Total Price:</strong> R${ticket.totalPrice.toFixed(2)}</p>
  `;
  ticketDetails.appendChild(ticketDiv);
}

purchaseButton.addEventListener('click', function() {
  const numBoards = parseInt(numBoardsInput.value) || 1;
  let totalPrice = numBoards * ticketCost;

  if (lottoPlus1Checkbox.checked) {
    totalPrice += numBoards * lottoPlus1Cost;
  }
  if (lottoPlus2Checkbox.checked) {
    totalPrice += numBoards * lottoPlus2Cost;
  }

  const newTicket = {
    id: generateUniqueID(),
    date: new Date().toLocaleDateString(),
    boards: [],
    totalPrice
  };

  for (let i = 0; i < numBoards; i++) {
    const selectedNumbers = [];
    const numberCircles = document.querySelectorAll(`.picker-container:nth-child(${i + 1}) .number-circle.selected`);
    numberCircles.forEach(circle => {
      selectedNumbers.push(parseInt(circle.textContent));
    });

    if (selectedNumbers.length < 6) {
      alert(`Please select 6 numbers for board ${i + 1}!`);
      return;
    }

    newTicket.boards.push(selectedNumbers);
  }

  allTickets.push(newTicket);
  displayTicketDetails(newTicket);

  boardsContainer.innerHTML = '';
  generateNumberPickers();
  calculateTotalCost();
  alert(`You have purchased ${numBoards} ticket(s) with selected numbers.`);
});

numBoardsInput.addEventListener('change', generateNumberPickers);
lottoPlus1Checkbox.addEventListener('change', calculateTotalCost);
lottoPlus2Checkbox.addEventListener('change', calculateTotalCost);

generateNumberPickers();
calculateTotalCost();
