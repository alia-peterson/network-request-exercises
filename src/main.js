// query selectors

const inputName = document.getElementById('input--name')
const inputDiet = document.getElementById('input--diet')
const inputFact = document.getElementById('input--fact')
const inputButton = document.getElementById('input--button')
const cardTemplate = document.getElementById('template--card')
const cardDisplay = document.querySelector('.main--cards')

// event handlers

window.addEventListener('load', displayStoredCards)
inputButton.addEventListener('click', createNewCard)

const savedCards = {
  method: 'GET'
}

const newCard = {
  method: 'POST',
  body: JSON.stringify({
    id: 5,
    name: 'cats',
    diet: 'meat, meat, and more meat',
    fun_fact: 'housecats aren\'t 100% domesticated'
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
    animals.forEach(animal => {
      const card = cardTemplate.content.cloneNode(true)
      card.querySelector('h3.card--name').innerText = animal.name
      card.querySelector('p.card--diet').innerText = animal.diet
      card.querySelector('p.card--fact').innerText = animal.fun_fact

      cardDisplay.appendChild(card)
    })
  })
}

function createNewCard() {
  fetch('http://localhost:3001/api/v1/animals', newCard)
  .then(response => response.json())
  .then(animal => console.log(animal))
  .catch(error => console.log(error))
}
