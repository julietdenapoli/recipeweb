import logo from './logo.svg';
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

      //ingredient list display is updated in html below.

    }

  }

  const removeIngredient = (index) => {
    setIngredientsList(ingredientsList.filter((_, i) => i !== index))
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
            <button id="get-recipes-btn">Go!</button>
          </div>
          <div>{ingredientsList.map((ingredient, index) =>
            <div key={index} className="ingredient-bubble">
              {ingredient}
              <button class='remove-ingredient-btn' onClick={() => removeIngredient(index)}>x</button>
            </div>
          )}
          </div>
        </div>

        <div id="display-recipes">
        </div>

      </div>
    </div>
  )


}

export default App;
