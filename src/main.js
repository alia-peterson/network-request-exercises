// query selectors

const inputName = document.getElementById('input--name')
const inputDiet = document.getElementById('input--diet')
const inputFact = document.getElementById('input--fact')
const inputButton = document.getElementById('input--button')
const cardTemplate = document.getElementById('template--card')
const cardDisplay = document.querySelector('.main')
let currentID

// event handlers

window.addEventListener('load', displayStoredCards)
inputButton.addEventListener('click', createNewCard)

const savedCards = {
  method: 'GET'
}

const newCard = {
  method: 'POST',
  body: JSON.stringify({
    id: currentID,
    name: inputName.value,
    diet: inputDiet.value,
    fun_fact: inputFact.value
  }),
  headers: {
    'Content-Type': 'application/json'
  }
}

// functions

function displayStoredCards() {
  fetch('http://localhost:3001/api/v1/animals')
    .then(response => response.json())
    .then(animals => {
      currentID = animals.length

      animals.forEach(animal => createCardElement(animal))
    })
}

function createNewCard() {
  fetch('http://localhost:3001/api/v1/animals', newCard)
    .then(response => response.json())
    .then(animal => console.log(animal))
    .catch(error => console.log(error))
}

function createCardElement(input) {
  const card = cardTemplate.content.cloneNode(true)
  card.querySelector('p.card--id').innerText = input.id
  card.querySelector('h2.card--name').innerText = input.name
  card.querySelector('p.card--diet').innerText = input.diet
  card.querySelector('p.card--fact').innerText = input.fun_fact

  cardDisplay.appendChild(card)
}
