import { Selector } from 'testcafe';

class ListUserRecipesPage {
  constructor() {
    this.pageId = '#list-recipes';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoIndividualRecipe(testController) {
    await testController.click('#view-individual-recipe');
  }

  async gotoEditRecipe(testController) {
    await testController.click('#view-edit-recipe');
  }
}

export const viewListUserRecipesPage = new ListUserRecipesPage();
