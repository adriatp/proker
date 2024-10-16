loadCards = () => {
  const modal_cards = document.querySelector('#modal_cards');
  modal_cards.textContent = '';
  let positionX = 0, positionY = 0;
  for (let i=0; i<4; i++) {
    positionX = 0;
    const row = document.createElement('div');
    row.classList.add('row');
    const col = document.createElement('div');
    col.classList.add('col-12');
    for (let j=0; j<13; j++) {
      const card = document.createElement('div');
      card.classList.add('card');
      const url = `url('./assets/images/cards/${(j+1)+(i*13)}.png')`;
      card.style.backgroundImage= `url('${url}')`;
      col.appendChild(card);
      positionX += -50;
    }
    positionY += -50;
    row.appendChild(col);
    modal_cards.appendChild(row);
  }
}

document.addEventListener('DOMContentLoaded', loadCards);