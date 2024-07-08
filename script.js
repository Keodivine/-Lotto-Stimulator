const adminMode = document.getElementById('admin-mode');
const userMode = document.getElementById('user-mode');
const userSection = document.getElementById('user-section');
const adminSection = document.getElementById('admin-section');
const numberGrid = document.getElementById('number-grid');
const generateBoardsButton = document.getElementById('generate-boards');
const boardSection = document.getElementById('board-section');
const enterLottoButton = document.getElementById('enter-lotto');
const simulateDrawButton = document.getElementById('simulate-draw');
const drawResults = document.getElementById('draw-results');

let selectedNumbers = [];
let boards = [];
let tickets = [];

adminMode.addEventListener('click', () => {
    userSection.style.display = 'none';
    adminSection.style.display = 'block';
});

userMode.addEventListener('click', () => {
    userSection.style.display = 'block';
    adminSection.style.display = 'none';
});

generateBoardsButton.addEventListener('click', () => {
    // Generate boards based on selected numbers
    boards = [];
    for (let i = 0; i < 10; i++) {
        const board = {
            numbers: [...selectedNumbers],
            price: 5.00
        };
        boards.push(board);
    }
    displayBoards();
});

enterLottoButton.addEventListener('click', () => {
    // Enter lotto with selected boards
    const ticket = {
        boards: [...boards],
        price: calculateTicketPrice(boards),
        date: new Date()
    };
    tickets.push(ticket);
    localStorage.setItem('tickets', JSON.stringify(tickets));
    alert(`Ticket purchased successfully!`);
});

simulateDrawButton.addEventListener('click', () => {
    // Simulate lotto draw
    const drawnNumbers = generateDrawnNumbers();
    const winningTickets = checkForWinners(tickets, drawnNumbers);
    displayDrawResults(winningTickets, drawnNumbers);
});

// Generate 52 number buttons
for (let i = 1; i <= 52; i++) {
    const numberButton = document.createElement('button');
    numberButton.textContent = i;
    numberButton.className = 'number-button';
    numberButton.addEventListener('click', () => {
        // Toggle number selection
        if (selectedNumbers.includes(i)) {
            selectedNumbers = selectedNumbers.filter(num => num!== i);
        } else {
            selectedNumbers.push(i);
        }
        numberButton.classList.toggle('selected');
    });
    numberGrid.appendChild(numberButton);
}

function displayBoards() {
    boardSection.innerHTML = '';
    boards.forEach((board, index) => {
        const boardElement = document.createElement('div');
        boardElement.className = 'board';
        boardElement.innerHTML = `
            <h2>Board ${index + 1}</h2>
            <p>Numbers: ${board.numbers.join(', ')}</p>
            <p>Price: R${board.price.toFixed(2)}</p>
        `;
        boardSection.appendChild(boardElement);
    });
}

function calculateTicketPrice(boards) {
    let price = 0;
    boards.forEach(board => {
        price += board.price;
    });
    return price;
}

function generateDrawnNumbers() {
    const drawnNumbers = [];
    for (let i = 0; i < 6; i++) {
        drawnNumbers.push(Math.floor(Math.random() * 52) + 1);
    }
    return drawnNumbers;
}

function checkForWinners(tickets, drawnNumbers) {
    const winningTickets = [];
    tickets.forEach(ticket => {
        const winningBoards = [];
        ticket.boards.forEach(board => {
            const matchingNumbers = board.numbers.filter(number => drawnNumbers.includes(number));
            if (matchingNumbers.length >= 3) {
                winningBoards.push(board);
            }
        });
        if (winningBoards.length > 0) {
            winningTickets.push({
                ticket: ticket,
                winningBoards: winningBoards
            });
        }
    });
    return winningTickets;
}

function displayDrawResults(winningTickets, drawnNumbers) {
    drawResults.innerHTML = '';
    const resultsElement = document.createElement('div');
    resultsElement.innerHTML = `
        <h2>Draw Results</h2>
        <p>Drawn Numbers: ${drawnNumbers.join(', ')}</p>
        <h3>Winning Tickets</h3>
        <ul>
            ${winningTickets.map(winningTicket => `
                <li>
                    Ticket ${winningTicket.ticket.date.toLocaleDateString()}:
                    ${winningTicket.winningBoards.length} winning boards
                </li>
            `).join('')}
        </ul>
    `;
    drawResults.appendChild(resultsElement);
}