const switchButton = document.getElementById('switch-user');
const adminSection = document.getElementById('admin');
const userSection = document.getElementById('user');
const simulateDrawBtn = document.getElementById('simulate-draw'); 
const winningNumbersDisplay = document.getElementById('winning-numbers-display'); 
const winningTicketsDisplay = document.getElementById('winning-tickets-display'); 
const userWinningTicketsDisplay = document.getElementById('user-winning-tickets'); 
const winningTicketsCount = document.getElementById('winning-tickets-count'); 
const winningTicketsList = document.getElementById('winning-tickets-list'); 

const numWinningNumbers = 6; 
const minMatchesForWin = 3; 

let allTickets = []; 
let winningTickets = [];

function simulateDraw() {
  winningNumbers = [];
  for (let i = 0; i < numWinningNumbers; i++) {
    winningNumbers.push(Math.floor(Math.random() * 52) + 1);
  }
  winningNumbers.sort((a, b) => a - b);
  winningNumbersDisplay.textContent = 'Winning Numbers: ' + winningNumbers.join(', ');

  winningTickets = []; 
  checkWinningTickets();
  updateWinningTicketDisplays();
  saveDrawData();
  alertUsersAboutWinners();
}

function checkWinningTickets() {
  allTickets.forEach(ticket => {
    const matchingNumbers = ticket.numbers.filter(number => winningNumbers.includes(number));
    if (matchingNumbers.length >= minMatchesForWin) {
      winningTickets.push(ticket);
    }
  });
}

function updateWinningTicketDisplays() {
  updateAdminWinningTicketDisplay();
  updateUserWinningTicketDisplay();
}

function updateAdminWinningTicketDisplay() {
  winningTicketsCount.textContent = `There are ${winningTickets.length} winning tickets!`;
  winningTicketsList.innerHTML = ''; 

  winningTickets.forEach(ticket => {
    const listItem = document.createElement('li');
    listItem.textContent = `Ticket ID: ${ticket.id} - Matched Numbers: ${ticket.numbers.join(', ')}`;
    winningTicketsList.appendChild(listItem);
  });
}

function updateUserWinningTicketDisplay() {
  let userWinningTicketText = '';
  const userWinningTickets = winningTickets.filter(ticket => ticket.userId === getUserID()); // Filter by user ID

  if (userWinningTickets.length > 0) {
    userWinningTicketText = 'Congratulations! You have winning tickets:';
    userWinningTickets.forEach(ticket => {
      userWinningTicketText += `\n- Ticket ID: ${ticket.id} - Matched Numbers: ${ticket.numbers.join(', ')}`;
    });
  } else {
    userWinningTicketText = 'No winning tickets for this draw.';
  }
  userWinningTicketsDisplay.textContent = userWinningTicketText;
}

function saveDrawData() {
  const drawData = {
    date: new Date().toLocaleDateString(),
    winningNumbers,
    winningTickets,
  };


  localStorage.setItem('drawHistory', JSON.stringify([drawData])); 
}

function alertUsersAboutWinners() {
  if (winningTickets.length > 0) {
    
    alert('Congratulations! You might have a winning ticket. Check the "Your Winning Tickets" section for details.');
  }
}

function saveTicket(ticketData) {
  ticketData.id = generateTicketID(); 
  ticketData.userId = getUserID(); 
  allTickets.push(ticketData);


}