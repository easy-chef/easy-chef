import { Selector } from 'testcafe';

class AddIngredientPage {
  constructor() {
    this.pageId = '#add-ingredient';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addIngredient(testController, ingredient, price, size, quantity) {
    await this.isDisplayed(testController);
    await testController.typeText('#add-ingredient-ingredient', ingredient);
    await testController.typeText('#add-ingredient-price', price);
    await testController.typeText('#add-ingredient-size', size);
    await testController.typeText('#add-ingredient-quantity', quantity);
    await testController.click('#submit');
    await testController.click('#submit');

  }
}

export const addIngredientPage = new AddIngredientPage();
