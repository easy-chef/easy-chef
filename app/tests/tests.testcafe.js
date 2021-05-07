import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { viewProfilePage } from './viewprofile.page';
import { editProfilePage } from './editprofile.page';
import { viewListUserRecipesPage } from './listuserrecipes.page';
import { viewIndividualRecipePage } from './individualrecipe.page';
import { editRecipePage } from './editrecipe.page';
import { addRecipePage } from './addrecipe.page';
import { viewIngredientPage } from './viewingredient.page';
import { editIngredientPage } from './editingredient.page';
import { addIngredientPage } from './addingredient.page';
import { viewVendorsPage } from './viewvendors.page';
import { signupPage } from './signup.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentialsUser = { username: 'john@foo.com', password: 'changeme' };
const credentialsVendor = { username: 'vendor@foo.com', password: 'changeme' };

/** Inputs for forms. */
const credentialCafe = { username: 'cafe@foo.com', password: 'cafe' };
const profileCafe = { name: 'cafe', bio: 'I am the test cafe!', image: 'https://images.pexels.com/photos/2659387/pexels-photo-2659387.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' };
const recipe = {
  recipeName: 'Chili Pasta',
  recipeAuthor: 'Elliot',
  recipeEmail: 'john@foo.com',
  description: 'A healthy meal that is full of flavor, protein and fiber!',
  image: 'https://www.budgetbytes.com/wp-content/uploads/2014/09/One-Pot-Chili-Pasta-fork-400x300-1-200x200.jpg',
  rating: '3',
  servings: '1',
  total: '10',
  ingredients: '1 Tbsp. olive oil',
  tools: 'stove',
  steps: 'Clean the dishes!',
};

const ingredient = {
  ingredient: 'Butter',
  price: '7.39',
  size: '16 oz',
  quantity: '200',
};

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page appears', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentialsUser.username, credentialsUser.password);
  await navBar.isLoggedIn(testController, credentialsUser.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test user signup form', async (testController) => {
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, credentialCafe.username, credentialCafe.password);
  await navBar.isLoggedIn(testController, credentialCafe.username);
});

test('Test that user profile page and edit profile page appears', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentialsUser.username, credentialsUser.password);
  await navBar.isLoggedIn(testController, credentialsUser.username);
  await navBar.gotoProfile(testController);
  await viewProfilePage.isDisplayed(testController);
  await navBar.gotoEditProfile(testController);
  await editProfilePage.isDisplayed(testController);
});

test('Test that list recipe, individual recipe details and edit recipe pages appears and appropriate forms work', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentialsUser.username, credentialsUser.password);
  await navBar.isLoggedIn(testController, credentialsUser.username);
  await navBar.gotoListRecipe(testController);
  await viewListUserRecipesPage.isDisplayed(testController);
  await viewListUserRecipesPage.gotoIndividualRecipe(testController);
  await viewIndividualRecipePage.isDisplayed(testController);
  await navBar.gotoListRecipe(testController);
  await viewListUserRecipesPage.gotoEditRecipe(testController);
  await editRecipePage.editRecipe(testController, recipe.recipeName, recipe.description, recipe.image, recipe.servings, recipe.ingredients, recipe.tools, recipe.steps);
  await navBar.gotoAddRecipe(testController);
  await addRecipePage.addRecipe(testController, recipe.recipeName, recipe.recipeAuthor, recipe.description, recipe.image, recipe.rating, recipe.servings, recipe.ingredients, recipe.tools, recipe.steps);
});

test('Test that vendor profile page and edit profile page appears and that forms work', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentialsVendor.username, credentialsVendor.password);
  await navBar.isLoggedIn(testController, credentialsVendor.username);
  await navBar.gotoProfile(testController);
  await viewProfilePage.isDisplayed(testController);
  await navBar.gotoEditProfile(testController);
  await editProfilePage.editProfile(testController, profileCafe.name, profileCafe.bio, profileCafe.image);
});

test('Test that View/Edit and Add Ingredients appears and that their forms work', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentialsVendor.username, credentialsVendor.password);
  await navBar.isLoggedIn(testController, credentialsVendor.username);
  await navBar.gotoViewEditIngredients(testController);
  await viewIngredientPage.isDisplayed(testController);
  await viewIngredientPage.gotoEditIngredient(testController);
  await editIngredientPage.editIngredient(testController, ingredient.ingredient, ingredient.price, ingredient.size, ingredient.quantity);
  await navBar.gotoAddIngredients(testController);
  await addIngredientPage.addIngredient(testController, ingredient.ingredient, ingredient.price, ingredient.size, ingredient.quantity);
  await navBar.gotoViewVendors(testController);
  await viewVendorsPage.isDisplayed(testController);

});
