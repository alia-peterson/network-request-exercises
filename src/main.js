// query selectors

const inputName = document.getElementById('input--name')
const inputDiet = document.getElementById('input--diet')
const inputFact = document.getElementById('input--fact')
const cardTemplate = document.getElementById('template--card')
const cardDisplay = document.querySelector('.main')
let currentID

// event handlers

window.addEventListener('load', displayStoredCards)

// functions

function displayStoredCards() {
  fetch('http://localhost:3001/api/v1/animals')
    .then(response => response.json())
    .then(animals => {
      const lastAnimalIndex = animals.length - 1
      const lastAnimalID = animals[lastAnimalIndex].id
      currentID = lastAnimalID + 1

      animals.forEach(animal => createCardElement(animal))
    })
}

function createNewCard() {
  if (inputName.value && inputDiet.value && inputFact.value) {
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

    fetch('http://localhost:3001/api/v1/animals', newCard)
    .then(response => response.json())
    .then(animal => createCardElement(animal))
    .catch(error => console.log(error))

    currentID += 1

  } else {
    window.alert('Please fill out all fields before submitting your new card')
  }
}

function createCardElement(input) {
  const card = cardTemplate.content.cloneNode(true)
  card.querySelector('article.main--card').id = input.id
  card.querySelector('p.card--id').innerText = input.id
  card.querySelector('h2.card--name').innerText = input.name
  card.querySelector('p.card--diet').innerText = input.diet
  card.querySelector('p.card--fact').innerText = input.fun_fact

  cardDisplay.appendChild(card)
}

function deleteCard() {
  const thisCard = event.target.closest('.main--card')
  cardDisplay.removeChild(thisCard)

  fetch(`http://localhost:3001/api/v1/animals/${thisCard.id}`, {
    method: 'DELETE'
  })
}
