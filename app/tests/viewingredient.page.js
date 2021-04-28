import { Selector } from 'testcafe';

class ViewIngredientPage {
  constructor() {
    this.pageId = '#view-ingredient';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoEditIngredient(testController) {
    await testController.click('#view-edit-ingredient');
  }

  async deleteIngredient(testController) {
    await testController.click('#delete-ingredient');
  }
}

export const viewIngredientPage = new ViewIngredientPage();
