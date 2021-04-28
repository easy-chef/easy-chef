import { Selector } from 'testcafe';

class EditIngredientPage {
  constructor() {
    this.pageId = '#edit-ingredient';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editIngredient(testController, ingredient, price, size, quantity) {
    await this.isDisplayed(testController);
    await testController.typeText('#edit-ingredient-ingredient', ingredient);
    await testController.typeText('#edit-ingredient-price', price);
    await testController.typeText('#edit-ingredient-size', quantity);
    await testController.click('#submit');
    await testController.click('#submit');
  }
}

export const editIngredientPage = new EditIngredientPage();
