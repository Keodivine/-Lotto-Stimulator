function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateWinningNumbers() {
  const winningNumbers = new Set();
  while (winningNumbers.size < 6) {
    winningNumbers.add(getRandomNumber(1, 52));
  }
  return Array.from(winningNumbers);
}

function simulateDraw() {
  const winningNumbers = generateWinningNumbers();
  document.getElementById('winning-numbers-display').innerText = `Winning Numbers: ${winningNumbers.join(', ')}`;


  const tickets = [
    [1, 2, 3, 4, 5, 6],
    [10, 12, 23, 34, 45, 46],
    [11, 22, 33, 44, 48, 49],
    [50,51,52,53,54,55,59]
  ];
  
  const winningTickets = tickets.filter(ticket => 
    ticket.every(num => winningNumbers.includes(num))
  );

  document.getElementById('winning-tickets-count').innerText = `Winning Tickets Count: ${winningTickets.length}`;
  
  const winningTicketsList = document.getElementById('winning-tickets-list');
  winningTicketsList.innerHTML = '';
  winningTickets.forEach(ticket => {
    const li = document.createElement('li');
    li.innerText = ticket.join(', ');
    winningTicketsList.appendChild(li);
  });
}

document.getElementById('simulate-draw').addEventListener('click', simulateDraw);