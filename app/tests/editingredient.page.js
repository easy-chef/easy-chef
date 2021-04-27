import { Selector } from 'testcafe';

class EditIngredientPage {
  constructor() {
    this.pageId = '#edit-ingredient';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 60 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(60000).expect(this.pageSelector.exists).ok();
  }
}

export const editIngredientPage = new EditIngredientPage();
