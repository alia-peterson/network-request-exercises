const inputName = document.getElementById('input--name')
const inputDiet = document.getElementById('input--diet')
const inputFact = document.getElementById('input--fact')

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

fetch('http://localhost:3001/api/v1/animals')
  .then(response => response.json())
  .then(animal => console.log(animal))

fetch('http://localhost:3001/api/v1/animals', newCard)
  .then(response => response.json())
  .then(animal => console.log(animal))
  .catch(error => console.log(error));
