const numberPicker = document.querySelector('.number-picker');
const selectedNumbers = []; // Array to store selected numbers

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

    // Add click event listener for selection
    span.addEventListener('click', function() {
      const number = parseInt(this.textContent); // Get clicked number
      if (selectedNumbers.includes(number)) {
        // Remove from selection if already selected
        selectedNumbers.splice(selectedNumbers.indexOf(number), 1);
        this.classList.remove('selected'); // Update class for styling
      } else {
        // Add to selection if not already selected (limit of 6)
        if (selectedNumbers.length < 6) {
          selectedNumbers.push(number);
          this.classList.add('selected'); // Update class for styling
        } else {
          alert('You can only select up to 6 numbers!');
        }
      }
      updateBoard(); // Update board display after selection changes
    });

    numberPicker.appendChild(span);
  }
}

// Function to update board display (replace with your board implementation)
function updateBoard() {
 
 
  const boardElement = document.getElementById('board');
  boardElement.textContent = `Selected Numbers: ${selectedNumbers.join(', ')}`; /
}

// Purchase btns
const purchaseButton = document.getElementById('purchase-ticket');


purchaseButton.addEventListener('click', function() {

  if (selectedNumbers.length < 6) {
    alert('Please select 6 numbers to purchase a ticket!');
    return;
  }
  if (numberOfBoards.input )


  // Replace with your actual purchase logic (e.g., send data to server)
  alert(`You have purchased a ticket with numbers: ${selectedNumbers.join(', ')}`);
});

//total cost

generateNumberCircles();
