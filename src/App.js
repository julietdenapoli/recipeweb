import React, { useState } from 'react';
import './App.css';

function App() {

  //Finding recipe button that scrolls to add ingredient section
  const findRecipes = document.getElementById("find-recipes-section");
  const addIngredientsClick = () => {
    findRecipes.scrollIntoView({ behavior: 'smooth' });
  }

  //Recipe of the Day Button
  const ROTDClicked = () => {
    window.location.href = "https://addapinch.com/the-best-chocolate-cake-recipe-ever/";
  }


  //Updating ingredients with user input
  const [userInput, setUserInput] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [recipesList, setRecipesList] = useState([]);

  const handleUserText = (event) => {
    setUserInput(event.target.value);
  }

  const handleUserIn = (event) => {
    setUserInput(event.target.value);
    //If the user entered new ingredient, else update current input
    if (event.key === "Enter" && userInput != "") {
      //update ingredient list
      setIngredientsList([...ingredientsList, userInput]);

      //reset user input box
      setUserInput('');


    }

  }

  const removeIngredient = (index) => {
    setIngredientsList(ingredientsList.filter((_, i) => i !== index))

  }

  const APIKey = '23e8c2d18ee31e8f26ba24ef963d1ec1';
  const myID = 'b12e85f1';
  const APIurl = 'https://api.edamam.com/search';

  const loadRecipes = async () => {
    const query = ingredientsList.join(',');
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
        setRecipesList(data.hits)
      })
      .catch(error => {
        console.error('Error');
      });

  }








  return (
    <div className="App">

      <div id="heading-section">
        <h1>It's Sweet Treat O'Clock!</h1>
      </div>

      <div id="start-section">
        <button onClick={addIngredientsClick}>Add Ingredients!</button>
        <button onClick={ROTDClicked}>R.O.T.D.</button>
      </div>

      <div id="find-recipes-section">

        <div id="inputs">
          <div id="text-and-go">
            <input type="text" value={userInput} onChange={handleUserText} onKeyDown={handleUserIn}></input>
            <button id="get-recipes-btn" onClick={loadRecipes}>Go!</button>
          </div>
          <div>{ingredientsList.map((ingredient, index) =>
            <div key={index} className="ingredient-bubble">
              {ingredient}
              <button className='remove-ingredient-btn' onClick={() => removeIngredient(index)}>x</button>
            </div>
          )}
          </div>
        </div>

        <div id="display-recipes">{recipesList.map((recipe, index) =>
          <div key={index} className="recipe-bubble">
            <h1 style={{ fontSize: '20px' }}>{recipe.recipe.label} </h1>
            <img src={recipe.recipe.image} width="60" height="75" />
            <a href={recipe.recipe.url} />
          </div>
        )}
        </div>

      </div>
    </div>
  )


}

export default App;
