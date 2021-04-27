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

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentialsUser = { username: 'john@foo.com', password: 'changeme' };
const credentialVendor = { username: 'vendor@foo.com', password: 'changeme' };

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

test('Test that profile page and edit profile page appears', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentialsUser.username, credentialsUser.password);
  await navBar.isLoggedIn(testController, credentialsUser.username);
  await navBar.gotoProfile(testController);
  await viewProfilePage.isDisplayed(testController);
  await navBar.gotoEditProfile(testController);
  await editProfilePage.isDisplayed(testController);
});

test('Test that list recipe, individual recipe details and edit recipe appears', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentialsUser.username, credentialsUser.password);
  await navBar.isLoggedIn(testController, credentialsUser.username);
  await navBar.gotoListRecipe(testController);
  await viewListUserRecipesPage.isDisplayed(testController);
  await viewListUserRecipesPage.gotoIndividualRecipe(testController);
  await viewIndividualRecipePage.isDisplayed(testController);
  await navBar.gotoListRecipe(testController);
  await viewListUserRecipesPage.gotoEditRecipe(testController);
  await editRecipePage.isDisplayed(testController);
  await navBar.gotoAddRecipe(testController);
  await addRecipePage.isDisplayed(testController);

});
