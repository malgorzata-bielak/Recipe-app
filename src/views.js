import { getFilters } from "./filters";
import { getRecipes, removeIngredient, changeCheckbox } from "./recipes";

// DOM STRUCTURE FOR RECIPES LIST
const generateRecipeDOM = recipe => {
  const recipeEl = document.createElement("a");
  const titleEl = document.createElement("span");
  const ingredientStatusEl = document.createElement("span");

  // give recipe a title
  if (recipe.title.length > 0) {
    titleEl.textContent = recipe.title;
  } else {
    titleEl.textContent = "My recipe";
  }

  recipeEl.appendChild(titleEl);

  // make recipe clickable
  recipeEl.setAttribute("href", `/edit.html#${recipe.id}`);
  recipeEl.classList.add("recipe");

  // set ingredient status
  const completed = recipe.ingredients.filter(ingredient => ingredient.completed === true);

  if (recipe.ingredients.length === 0) {
    ingredientStatusEl.textContent = `You have no ingredients`;
  } else if (completed.length === 0) {
    ingredientStatusEl.textContent = `You have none of the ingredients`;
  } else if (completed.length === recipe.ingredients.length) {
    ingredientStatusEl.textContent = `You have all of the ingredients`;
  } else {
    ingredientStatusEl.textContent = `You have some of the ingredients`;
  }
  recipeEl.appendChild(ingredientStatusEl);

  return recipeEl;
};

// SHOW RECIPES AND SEARCH AMONG THEM
const renderRecipes = () => {
  const recipesEl = document.querySelector("#recipes");
  const filters = getFilters();
  const recipes = getRecipes();

  // search sth, if nothing is searched then everything is a match
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  // reset div content
  recipesEl.innerHTML = "";

  // what to do if a match
  if (filteredRecipes.length > 0) {
    filteredRecipes.forEach(recipe => {
      const recipeElement = generateRecipeDOM(recipe);
      recipesEl.appendChild(recipeElement);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No recipes to show";
    emptyMessage.classList.add("empty-message");
    recipesEl.appendChild(emptyMessage);
  }
};

// DOM STRUCTURE FOR INGREDIENTS LIST
const generateIngredientDOM = (recipeId, ingredient) => {
  const divEl = document.createElement("div");
  const labelEl = document.createElement("label");
  const checkboxEl = document.createElement("input");
  const titleEl = document.createElement("span");
  const removeEl = document.createElement("button");

  divEl.classList.add("div-parent");

  // checkbox
  checkboxEl.setAttribute("type", "checkbox");
  checkboxEl.checked = ingredient.completed;
  labelEl.appendChild(checkboxEl);

  // ingredient title
  titleEl.textContent = ingredient.title;
  labelEl.appendChild(titleEl);

  divEl.appendChild(labelEl);

  // button
  removeEl.textContent = "remove";
  removeEl.classList.add("remove-button");
  divEl.appendChild(removeEl);

  checkboxEl.addEventListener("change", e => {
    changeCheckbox(ingredient);
  });

  removeEl.addEventListener("click", e => {
    removeIngredient(recipeId, ingredient);
  });

  return divEl;
};

// SHOW RECIPES AND SEARCH AMONG THEM
const renderIngredients = recipeId => {
  const ingredientsEl = document.querySelector("#ingredients");
  const recipes = getRecipes();
  const recipe = recipes.find(recipe => recipe.id === recipeId);

  ingredientsEl.innerHTML = "";

  // what to do if a match
  if (recipe.ingredients.length > 0) {
    recipe.ingredients.forEach(ingredient => {
      const ingredientEl = generateIngredientDOM(recipeId, ingredient);
      ingredientsEl.appendChild(ingredientEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No ingredients to show";
    emptyMessage.classList.add("empty-message");
    ingredientsEl.appendChild(emptyMessage);
  }
};

// FIND APPROPRIATE RECIPE AND PREPARE ITS EDIT PAGE WITH DATA
const initializeEditPage = recipeId => {
  const titleEl = document.querySelector("#recipe-title");
  const bodyEl = document.querySelector("#recipe-body");
  const recipes = getRecipes();
  const recipe = recipes.find(recipe => recipe.id === recipeId);

  if (!recipe) {
    location.assign("/index.html");
  }

  titleEl.value = recipe.title;
  bodyEl.value = recipe.body;
  renderIngredients(recipeId);
};

export { generateRecipeDOM, renderRecipes, renderIngredients, initializeEditPage };
