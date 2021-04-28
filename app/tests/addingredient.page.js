import { Selector } from 'testcafe';

class AddIngredientPage {
  constructor() {
    this.pageId = '#add-ingredient';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 80 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(80000).expect(this.pageSelector.exists).ok();
  }
}

export const addIngredientPage = new AddIngredientPage();
