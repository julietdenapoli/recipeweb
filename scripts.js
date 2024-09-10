
const addIngredientsBtn = document.getElementById('add-ingredients-btn');
const rotdBtn = document.getElementById('rotd-btn');

const ingredientsSection = document.getElementById('add-ingredients-section');
const ingredientInput = document.getElementById('ingredient-text-box');
const submitIngredientsBtn = document.getElementById('submit-ingredients-btn');
const ingredientDisplay = document.getElementById('ingredient-display');

const recipeDisplay = document.getElementById('recipe-display');

let ingredientsList = [];

//RECIPE API!
const APIKey = '23e8c2d18ee31e8f26ba24ef963d1ec1';
const myID = 'b12e85f1';
const APIurl = 'https://api.edamam.com/search';

async function getRecipes(ingredients) {
  const query = ingredients.join(',');
  const url = `${APIurl}?q=${encodeURIComponent(query)}&app_id=${myID}&app_key=${APIKey}&from=0&to=5`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Response not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      displayRecipes(data.hits)
    })
    .catch(error => {
      console.error('Error');
    });


}

function displayRecipes(recipes) {

  recipes.forEach(recipe => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe-bubble');
    recipeDiv.textContent = recipe.recipe.label;

    const recipeImage = document.createElement('img');
    recipeImage.src = recipe.recipe.image;
    recipeImage.alt = recipe.recipe.label;
    recipeDiv.appendChild(recipeImage);

    recipeDisplay.appendChild(recipeDiv);
  });
}

// Scroll to add ingredients section
addIngredientsBtn.addEventListener('click', () => {
  ingredientsSection.scrollIntoView({ behavior: 'smooth' });
});

rotdBtn.addEventListener('click', () => {
  window.location.href = "https://addapinch.com/the-best-chocolate-cake-recipe-ever/";
});

// When submit ingredients button pressed, display updated recipes
submitIngredientsBtn.addEventListener('click', () => {
  getRecipes(ingredientsList);
})

ingredientInput.addEventListener('keyup', function (event) {
  if (event.key === "Enter") {
    const ingredient = ingredientInput.value;

    if (ingredient) {
      if (!ingredientsList.includes(ingredient)) {
        ingredientsList.push(ingredient);

        const newEntry = document.createElement('div');
        newEntry.classList.add('ingredient-bubble');
        newEntry.textContent = ingredient;


        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-ingredient-btn');
        removeBtn.textContent = "X";
        newEntry.appendChild(removeBtn);

        removeBtn.addEventListener('click', () => {
          newEntry.remove();
          ingredientsList.pop(ingredient);
        })


        ingredientDisplay.appendChild(newEntry);
        ingredientInput.value = '';



      }

    }
  }
})