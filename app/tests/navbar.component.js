import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSigninPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignupPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  async gotoProfile(testController) {
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-view-profile');
  }

  async gotoEditProfile(testController) {
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-edit-profile');
  }

  async gotoListRecipe(testController) {
    await testController.click('#navbar-your-recipes');
    await testController.click('#navbar-recipe-list');
  }

  async gotoAddRecipe(testController) {
    await testController.click('#navbar-your-recipes');
    await testController.click('#navbar-recipe-add');
  }

  async gotoViewEditIngredients(testController) {
    await testController.click('#navbar-ingredients');
    await testController.click('#navbar-list-ingredients');
  }

  async gotoAddIngredients(testController) {
    await testController.click('#navbar-ingredients');
    await testController.click('#navbar-add-ingredients');
  }

  async gotoViewVendors(testController) {
    await testController.click('#navbar-view-vendors');
  }

}

export const navBar = new NavBar();
