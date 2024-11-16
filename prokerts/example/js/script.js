const proker = new Proker(2);

loadCards = () => {
  // Initialize game
  loadTableCards();
  loadModalCards();
};

loadTableCards = () => {
  const table_cards = document.querySelector('#table_cards');
  
};

loadModalCards = () => {
  const modal_cards = document.querySelector('#modal_cards');
  modal_cards.textContent = '';
  for (let i=0; i<4; i++) {
    const row = document.createElement('div');
    row.classList.add('row', 'justify-content-center');
    for (let j=0; j<13; j++) {
      const card_div = document.createElement('div');
      const card_img = document.createElement('img');
      card_div.classList.add('col-auto', 'p-1');
      card_div.addEventListener('click', function() {
        card_div.classList.toggle('selected');
      });
      card_img.classList.add('img-fluid', 'card', 'selectable-card');
      card_img.src = `./assets/images/cards/${(j+1)+(i*13)}.png`;
      card_div.appendChild(card_img);
      row.appendChild(card_div);
    }
    modal_cards.appendChild(row);
  }
};

generateGrid = () => {
  const gridContainer = document.getElementById('gridContainer');
  const totalItems = 9 * 5;
  for (let i = 1; i <= totalItems; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.textContent = i;
    gridContainer.appendChild(gridItem);
  }
};

document.addEventListener('DOMContentLoaded', loadCards);
// document.addEventListener('DOMContentLoaded', generateGrid);