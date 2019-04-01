import uuidv4 from "uuid/v4";
import { renderIngredients } from "./views";

let recipes = [];

// read recipes from local storage
const downloadRecipes = () => {
  const recipesJSON = localStorage.getItem("recipes");
  try {
    return recipesJSON ? JSON.parse(recipesJSON) : [];
  } catch (e) {
    return [];
  }
};

// how recipes get defined
recipes = downloadRecipes();

// save recipes to local storage
const saveRecipes = () => {
  localStorage.setItem("recipes", JSON.stringify(recipes));
};

// add and save ingredients to local storage
const saveIngredients = (recipeId, ingredient) => {
  recipes.find(recipe => recipe.id === recipeId).ingredients.push(ingredient);
  localStorage.setItem("recipes", JSON.stringify(recipes));
};

// expose recipes from module
const getRecipes = () => recipes;

// add new recipe logic
const addRecipe = () => {
  const id = uuidv4();
  recipes.push({
    id,
    title: "",
    body: "",
    ingredients: []
  });

  saveRecipes();
  return id;
};

// add new ingredient logic
const addIngredient = recipeId => {
  const title = document.querySelector("#add-ingredient").value;
  const id = uuidv4();
  const ingredient = {
    id,
    title,
    completed: false
  };

  saveIngredients(recipeId, ingredient);
  renderIngredients(recipeId);
  document.querySelector("#add-ingredient").value = "";
  return id;
};

const changeCheckbox = ingredient => {
  ingredient.completed = !ingredient.completed;
  saveRecipes();
};

// remove recipe from list
const removeRecipe = id => {
  const recipeIndex = recipes.findIndex(recipe => recipe.id === id);
  if (recipeIndex > -1) {
    recipes.splice(recipeIndex, 1);
    saveRecipes();
  }
};

const removeIngredient = (recipeId, ingredient) => {
  const recipe = recipes.find(recipe => recipe.id === recipeId);
  const ingredients = recipe.ingredients;
  const ingredientId = ingredient.id;

  const ingredientIndex = ingredients.findIndex(ingredient => ingredient.id === ingredientId);

  if (ingredientIndex > -1) {
    ingredients.splice(ingredientIndex, 1);
    saveRecipes();
  }
  renderIngredients(recipeId);
};

// change recipe title or body
const updateRecipe = (id, updates) => {
  const recipe = recipes.find(recipe => recipe.id === id);
  if (!recipe) {
    return;
  }
  if (typeof updates.title === "string") {
    recipe.title = updates.title;
  }
  if (typeof updates.body === "string") {
    recipe.body = updates.body;
  }

  saveRecipes();
  return recipe;
};

export {
  getRecipes,
  addRecipe,
  addIngredient,
  removeRecipe,
  removeIngredient,
  updateRecipe,
  changeCheckbox
};
