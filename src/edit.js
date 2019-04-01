import { updateRecipe, removeRecipe, addIngredient } from "./recipes";
import { initializeEditPage } from "./views";

const recipeId = location.hash.substring(1);

initializeEditPage(recipeId);

// change title based on data we get
document.querySelector("#recipe-title").addEventListener("input", e => {
  updateRecipe(recipeId, {
    title: e.target.value
  });
});

// change body based on data we get
document.querySelector("#recipe-body").addEventListener("input", e => {
  updateRecipe(recipeId, {
    body: e.target.value
  });
});

// add ingredients based on data we get
document.querySelector("#add-ingredient-button").addEventListener("click", e => {
  addIngredient(recipeId);
});

// delete recipe when button clicked
document.querySelector("#delete-recipe-button").addEventListener("click", e => {
  removeRecipe(recipeId);
  location.assign("/index.html");
});

// update info in all tabs
window.addEventListener("storage", e => {
  if (e.key === "recipes") {
    initializeEditPage(recipeId);
  }
});
