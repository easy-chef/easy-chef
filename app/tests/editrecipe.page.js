import { Selector } from 'testcafe';

class EditRecipePage {
  constructor() {
    this.pageId = '#edit-recipe';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editRecipe(testController, recipeName, description, image, servings, ingredients, tools, steps) {
    await this.isDisplayed(testController);
    await testController.typeText('#edit-recipe-name', recipeName);
    await testController.typeText('#edit-recipe-description', description);
    await testController.typeText('#edit-recipe-image', image);
    await testController.typeText('#edit-recipe-servings', servings);
    await testController.click('#edit-recipe-restrictions');
    await testController.click('#vegetarian');
    await testController.click('#edit-recipe-restrictions');
    await testController.click('#uniforms-0000-0009');
    await testController.click('#uniforms-0000-0006');
    await testController.typeText('#uniforms-0000-0022', ingredients);
    await testController.click('#uniforms-0000-0014');
    await testController.click('#uniforms-0000-0011');
    await testController.typeText('#uniforms-0000-0026', tools);
    await testController.click('#uniforms-0000-001j');
    await testController.click('#uniforms-0000-001g');
    await testController.typeText('#uniforms-0000-002a', steps);
    await testController.click('#submit');
    await testController.click('#submit');
  }
}

export const editRecipePage = new EditRecipePage();
